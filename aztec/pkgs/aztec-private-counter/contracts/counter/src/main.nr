contract Counter {
  // ライブラリをインポート
  use dep::protocol_types::address::AztecAddress;
  use dep::aztec::{
    context::{PrivateContext, Context},
    note::{
      note_header::NoteHeader,
      utils as note_utils,
    },
    state_vars::map::Map,
  };
  use dep::value_note::{
    balance_utils,
    value_note::{
      ValueNoteMethods,
      VALUE_NOTE_LEN,
    },
  };
  use dep::easy_private_state::easy_private_state::EasyPrivateUint;

  // 構造体を定義
  struct Storage {
    counters: Map<EasyPrivateUint>,
  }

// メソッドを定義
  impl Storage {
    // 初期化メソッド
    fn init(context: Context) -> Self {
      Storage {
        counters: Map::new(
          context,
          1,
          |context, slot| {
            EasyPrivateUint::new(context, slot)
          },
        ),
      }
    }
  }

  // コンストラクター
  #[aztec(private)]
  fn constructor(
    headstart: u120, 
    owner: AztecAddress
  ) {
    let counters = storage.counters;
    counters.at(owner.to_field()).add(headstart, owner);
  }

  #[aztec(private)]
  fn increment(owner: AztecAddress) {
    let counters = storage.counters;
    counters.at(owner.to_field()).add(1, owner);
  }

  // 二重登録を防ぐための関数
  unconstrained fn compute_note_hash_and_nullifier(
    contract_address: AztecAddress,
    nonce: Field,
    storage_slot: Field,
    serialized_note: [Field; VALUE_NOTE_LEN]
  ) -> pub [Field; 4] {
    let note_header = NoteHeader::new(contract_address, nonce, storage_slot);
    note_utils::compute_note_hash_and_nullifier(ValueNoteMethods, note_header, serialized_note)
  }

  // カウント値を取得するメソッド
  unconstrained fn get_counter(
    owner: AztecAddress
  ) -> pub Field {
    let counters = storage.counters;
    balance_utils::get_balance(counters.at(owner.to_field()).set)
  }
}