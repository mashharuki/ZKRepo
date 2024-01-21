contract EasyPrivateVoting {
    use dep::aztec::{
        protocol_types::{
            abis::function_selector::FunctionSelector,
            address::AztecAddress,
        },
        context::{PrivateContext, Context},
        oracle::get_secret_key::get_secret_key, // used to compute nullifier
        state_vars::{ 
            map::Map, 
            public_state::PublicState,
        }, 
        types::type_serialization::{ // serialization methods for using booleans and aztec addresses
            bool_serialization::{BoolSerializationMethods, BOOL_SERIALIZED_LEN},
            address_serialization::{AddressSerializationMethods, AZTEC_ADDRESS_SERIALIZED_LEN},
            field_serialization::{ FieldSerializationMethods, FIELD_SERIALIZED_LEN},
        }, 
    };

    // ストレージ
    struct Storage {
        admin: PublicState<AztecAddress, AZTEC_ADDRESS_SERIALIZED_LEN>, // admin can end vote
        tally: Map<Field, PublicState<Field, FIELD_SERIALIZED_LEN>>, // we will store candidate as key and number of votes as value
        voteEnded: PublicState<bool, BOOL_SERIALIZED_LEN>, // voteEnded is boolean
    }

    impl Storage {
        // 初期化メソッド
        fn init(context: Context) -> Self {
            Storage {
                admin: PublicState::new(
                    context, 
                    1, // storage slot. this can be anything except 0. it is hashed, and hash on 0 = 0
                    AddressSerializationMethods,
                ), 
                tally: Map::new(
                    context, 
                    2, 
                    |context, slot| {
                        PublicState::new(
                            context,
                            slot, 
                            FieldSerializationMethods,
                        )
                    },
                ),
                voteEnded: PublicState::new(
                    context, 
                    3, 
                    BoolSerializationMethods,
                )
            } 
        }
	}

    #[aztec(private)] 
    fn constructor(admin: AztecAddress) { 
        context.call_public_function(
            context.this_address(),
            FunctionSelector::from_signature("_initialize((Field))"), 
            [admin.to_field()] 
        );
    }

    // 初期化メソッド
    #[aztec(public)] 
    internal fn _initialize(admin: AztecAddress) {
        storage.admin.write(admin);
        storage.voteEnded.write(false);
    }
    
    #[aztec(private)] 
    fn cast_vote(candidate: Field) {
        let secret = get_secret_key(context.msg_sender()); 
        let nullifier = dep::std::hash::pedersen_hash([context.msg_sender().to_field(), secret.low, secret.high]); 
        context.push_new_nullifier(nullifier, 0); 
        // call method
        context.call_public_function(
            context.this_address(),
            FunctionSelector::from_signature("add_to_tally_public(Field)"),
            [candidate]
        );
    }

    #[aztec(public)]
    internal fn add_to_tally_public(candidate: Field) {
        assert(storage.voteEnded.read() == false, "Vote has ended"); 
        let new_tally = storage.tally.at(candidate).read() + 1;
        storage.tally.at(candidate).write(new_tally);
    }

    // 投票を終わらせる
    #[aztec(public)] 
    fn end_vote() {
        assert(storage.admin.read().eq(context.msg_sender()), "Only admin can end votes"); 
        // 状態を更新
        storage.voteEnded.write(true);
    }
    
    // 投票状況を取得する
    unconstrained fn get_vote(candidate: Field) -> pub Field {
        storage.tally.at(candidate).read()
    }
    
    // compute_note_hash_and_nullifier
    unconstrained fn compute_note_hash_and_nullifier(
        contract_address: AztecAddress,
        nonce: Field,
        storage_slot: Field,
        serialized_note: [Field; 0]
    ) -> pub [Field; 4] {
        [0, 0, 0, 0]
    }
}