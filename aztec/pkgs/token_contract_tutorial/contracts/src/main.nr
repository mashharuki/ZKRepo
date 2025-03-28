mod types;

contract Token {
  // Libs
  use dep::std::option::Option;
  use dep::safe_math::SafeU120;
  use dep::aztec::{
    note::{
      note_getter_options::NoteGetterOptions,
      note_header::NoteHeader,
      utils as note_utils,
    },
    context::{PrivateContext, PublicContext, Context},
    hash::{compute_secret_hash},
    state_vars::{map::Map, public_state::PublicState, set::Set},
    types::type_serialization::{
      field_serialization::{FieldSerializationMethods, FIELD_SERIALIZED_LEN},
      bool_serialization::{BoolSerializationMethods, BOOL_SERIALIZED_LEN},
      address_serialization::{AddressSerializationMethods, AZTEC_ADDRESS_SERIALIZED_LEN},
    },
  };
  use dep::protocol_types::{
    abis::function_selector::FunctionSelector,
    address::AztecAddress,
  };

  // docs:start:import_authwit
  use dep::authwit::{
    auth::{
      assert_current_call_valid_authwit,
      assert_current_call_valid_authwit_public,
    },
  };
  // docs:end:import_authwit

  use crate::types::{
    transparent_note::{TransparentNote, TransparentNoteMethods, TRANSPARENT_NOTE_LEN},
    token_note::{TokenNote, TokenNoteMethods, TOKEN_NOTE_LEN},
    balances_map::{BalancesMap},
    safe_u120_serialization::{SafeU120SerializationMethods, SAFE_U120_SERIALIZED_LEN}
  };

  // Contract Storage
  struct Storage {
    admin: PublicState<AztecAddress, AZTEC_ADDRESS_SERIALIZED_LEN>,
    minters: Map<PublicState<bool, BOOL_SERIALIZED_LEN>>,
    balances: BalancesMap,
    total_supply: PublicState<SafeU120, SAFE_U120_SERIALIZED_LEN>,
    pending_shields: Set<TransparentNote, TRANSPARENT_NOTE_LEN>,
    public_balances: Map<PublicState<SafeU120, SAFE_U120_SERIALIZED_LEN>>,
  }

  // Storage init
  impl Storage {
    fn init(context: Context) -> Self {
      Storage {
        admin: PublicState::new(
          context,
          1,
          AddressSerializationMethods,
        ),
        minters: Map::new(
          context,
          2,
          |context, slot| {
            PublicState::new(
              context,
              slot,
              BoolSerializationMethods,
            )
          },
        ),
        balances: BalancesMap::new(context, 3),
        total_supply: PublicState::new(
          context,
          4,
          SafeU120SerializationMethods,
        ),
        pending_shields: Set::new(context, 5, TransparentNoteMethods),
        public_balances: Map::new(
          context,
          6,
          |context, slot| {
            PublicState::new(
              context,
              slot,
              SafeU120SerializationMethods,
            )
          },
        ),
      }
    }
  }

  // Public functions
  #[aztec(private)]
  fn constructor(admin: AztecAddress) {
    let selector = FunctionSelector::from_signature("_initialize((Field))");
    context.call_public_function(context.this_address(), selector, [admin.to_field()]);
  }

  #[aztec(public)]
  fn set_admin(new_admin: AztecAddress) {
    assert(storage.admin.read().eq(context.msg_sender()), "caller is not admin");
    storage.admin.write(new_admin);
  }

  #[aztec(public)]
  fn set_minter(
    minter: AztecAddress, 
    approve: bool
  ) {
    assert(storage.admin.read().eq(context.msg_sender()), "caller is not admin");
    storage.minters.at(minter.to_field()).write(approve);
  }

  #[aztec(public)]
  fn mint_public(
    to: AztecAddress, 
    amount: Field
  ) -> Field {
    assert(storage.minters.at(context.msg_sender().to_field()).read(), "caller is not minter");
    let amount = SafeU120::new(amount);
    // ストレージ上の値を更新
    let new_balance = storage.public_balances.at(to.to_field()).read().add(amount);
    let supply = storage.total_supply.read().add(amount);
    // 更新
    storage.public_balances.at(to.to_field()).write(new_balance);
    storage.total_supply.write(supply);
  }

  #[aztec(public)]
  fn mint_private(
    amount: Field, 
    secret_hash: Field
  ) -> Field {
    assert(storage.minters.at(context.msg_sender().to_field()).read(), "caller is not minter");
    let pending_shields = storage.pending_shields;
    let mut note = TransparentNote::new(amount, secret_hash);
    let supply = storage.total_supply.read().add(SafeU120::new(amount));

    storage.total_supply.write(supply);
    pending_shields.insert_from_public(&mut note);
  }

  #[aztec(public)]
  fn shield(
    from: AztecAddress, 
    amount: Field, 
    secret_hash: Field, 
    nonce: Field
  ) -> Field {
    if (!from.eq(context.msg_sender())) {
      // The redeem is only spendable once, so we need to ensure that you cannot insert multiple shields from the same message.
      assert_current_call_valid_authwit_public(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    let amount = SafeU120::new(amount);
    let from_balance = storage.public_balances.at(from.to_field()).read().sub(amount);

    let pending_shields = storage.pending_shields;
    let mut note = TransparentNote::new(amount.value as Field, secret_hash);

    storage.public_balances.at(from.to_field()).write(from_balance);
    pending_shields.insert_from_public(&mut note);
  }

  #[aztec(public)]
  fn transfer_public(
    from: AztecAddress, 
    to: AztecAddress, 
    amount: Field, 
    nonce: Field
  ) -> Field {
    if (!from.eq(context.msg_sender())) {
      assert_current_call_valid_authwit_public(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    let amount = SafeU120::new(amount);
    // 送り手の残高を更新
    let from_balance = storage.public_balances.at(from.to_field()).read().sub(amount);
    storage.public_balances.at(from.to_field()).write(from_balance);
    // 受け取り手の残高を更新
    let to_balance = storage.public_balances.at(to.to_field()).read().add(amount);
    storage.public_balances.at(to.to_field()).write(to_balance);
  }

  #[aztec(public)]
  fn burn_public(
    from: AztecAddress, 
    amount: Field, 
    nonce: Field
  ) -> Field {
    if (!from.eq(context.msg_sender())) {
      assert_current_call_valid_authwit_public(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    let amount = SafeU120::new(amount);
    // 受け取り手の残高を減らす
    let from_balance = storage.public_balances.at(from.to_field()).read().sub(amount);
    storage.public_balances.at(from.to_field()).write(from_balance);
    // 全体の発行数を減らす
    let new_supply = storage.total_supply.read().sub(amount);
    storage.total_supply.write(new_supply);
  }

  // Private functions

  #[aztec(private)]
  fn redeem_shield(
    to: AztecAddress, 
    amount: Field, 
    secret: Field
  ) -> Field {
    // ペンディングしゅうのshields一覧を取得
    let pending_shields = storage.pending_shields;
    let secret_hash = compute_secret_hash(secret);
    // Get 1 note (set_limit(1)) which has amount stored in field with index 0 (select(0, amount)) and secret_hash
    // stored in field with index 1 (select(1, secret_hash)).
    let options = NoteGetterOptions::new().select(0, amount).select(1, secret_hash).set_limit(1);
    // 取得
    let notes = pending_shields.get_notes(options);
    let note = notes[0].unwrap_unchecked();
    // Remove the note from the pending shields set 
    pending_shields.remove(note);

    // Add the token note to user's balances set
    storage.balances.at(to).add(SafeU120::new(amount));
  }

  #[aztec(private)]
  fn unshield(
    from: AztecAddress, 
    to: AztecAddress, 
    amount: Field, 
    nonce: Field
  ) -> Field {
    if (!from.eq(context.msg_sender())) {
      assert_current_call_valid_authwit(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    storage.balances.at(from).sub(SafeU120::new(amount));

    let selector = FunctionSelector::from_signature("_increase_public_balance((Field),Field)");
    let _void = context.call_public_function(context.this_address(), selector, [to.to_field(), amount]);
  }

  #[aztec(private)]
  fn transfer(
    from: AztecAddress, 
    to: AztecAddress, 
    amount: Field, 
    nonce: Field
  ) -> Field {
    if (!from.eq(context.msg_sender())) {
      assert_current_call_valid_authwit(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    let amount = SafeU120::new(amount);
    storage.balances.at(from).sub(amount);
    storage.balances.at(to).add(amount);
  }

  #[aztec(private)]
  fn burn(
    from: AztecAddress, 
    amount: Field, 
    nonce: Field
  ) -> Field {
    if (!from.eq(context.msg_sender())) {
      assert_current_call_valid_authwit(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    storage.balances.at(from).sub(SafeU120::new(amount));

    let selector = FunctionSelector::from_signature("_reduce_total_supply(Field)");
    let _void = context.call_public_function(context.this_address(), selector, [amount]);
  }

  // Internal functions below

  #[aztec(public)]
  internal fn _initialize(
    new_admin: AztecAddress
  ) {
    assert(!new_admin.is_zero(), "invalid admin");
    storage.admin.write(new_admin);
    storage.minters.at(new_admin.to_field()).write(true);
  }

  #[aztec(public)]
  internal fn _increase_public_balance(
    to: AztecAddress, 
    amount: Field
  ) {
    let new_balance = storage.public_balances.at(to.to_field()).read().add(SafeU120::new(amount));
    storage.public_balances.at(to.to_field()).write(new_balance);
  }

  #[aztec(public)]
  internal fn _reduce_total_supply(
    amount: Field
  ) {
    let new_supply = storage.total_supply.read().sub(SafeU120::new(amount));
    storage.total_supply.write(new_supply);
  }

  // Unconstrained functions (read only)

  unconstrained fn admin() -> pub Field {
    storage.admin.read().to_field()
  }

  unconstrained fn is_minter(
    minter: AztecAddress
  ) -> pub bool {
    storage.minters.at(minter.to_field()).read()
  }

  unconstrained fn total_supply() -> pub u120  {
    storage.total_supply.read().value
  }

  unconstrained fn balance_of_private(
    owner: AztecAddress
  ) -> pub u120 {
    storage.balances.at(owner).balance_of().value
  }

  unconstrained fn balance_of_public(
    owner: AztecAddress
  ) -> pub u120 {
    storage.public_balances.at(owner.to_field()).read().value
  }

  unconstrained fn compute_note_hash_and_nullifier(
    contract_address: AztecAddress, 
    nonce: Field, 
    storage_slot: Field, 
    serialized_note: [Field; TOKEN_NOTE_LEN]
  ) -> pub [Field; 4] {
    let note_header = NoteHeader::new(contract_address, nonce, storage_slot);
    if (storage_slot == 5) {
      note_utils::compute_note_hash_and_nullifier(TransparentNoteMethods, note_header, serialized_note)
    } else {
      note_utils::compute_note_hash_and_nullifier(TokenNoteMethods, note_header, serialized_note)
    }
  }
}

