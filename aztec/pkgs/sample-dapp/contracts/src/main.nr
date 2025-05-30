mod types;

contract Token {
  use dep::std::option::Option;
  use dep::safe_math::SafeU120;
  use dep::compressed_string::{FieldCompressedString, FieldCompressedStringSerializationMethods};
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
      u8_serialization::{U8SerializationMethods, U8_SERIALIZED_LEN},
    },
  };
  use dep::aztec::protocol_types::{
    abis::function_selector::FunctionSelector,
    address::AztecAddress,
  };

  use dep::authwit::{
    auth::{
      assert_current_call_valid_authwit,
      assert_current_call_valid_authwit_public,
    },
  };

  use crate::types::{
    transparent_note::{TransparentNote, TransparentNoteMethods, TRANSPARENT_NOTE_LEN},
    token_note::{TokenNote, TokenNoteMethods, TOKEN_NOTE_LEN},
    balances_map::{BalancesMap},
    safe_u120_serialization::{SafeU120SerializationMethods, SAFE_U120_SERIALIZED_LEN}
  };

  // コントラクトで使用する変数
  struct Storage {
    admin: PublicState<AztecAddress, AZTEC_ADDRESS_SERIALIZED_LEN>,
    minters: Map<AztecAddress, PublicState<bool, BOOL_SERIALIZED_LEN>>,
    balances: BalancesMap,
    total_supply: PublicState<SafeU120, SAFE_U120_SERIALIZED_LEN>,
    pending_shields: Set<TransparentNote, TRANSPARENT_NOTE_LEN>,
    public_balances: Map<AztecAddress, PublicState<SafeU120, SAFE_U120_SERIALIZED_LEN>>,
    symbol: PublicState<FieldCompressedString, 1>,
    name: PublicState<FieldCompressedString, 1>,
    decimals: PublicState<u8, U8_SERIALIZED_LEN>,
  }

  // 変数
  impl Storage {
    // 初期化メソッド
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
        symbol: PublicState::new(
          context,
          7,
          FieldCompressedStringSerializationMethods,
        ),
        name: PublicState::new(
          context,
          8,
          FieldCompressedStringSerializationMethods,
        ),
        decimals: PublicState::new(
          context,
          9,
          U8SerializationMethods,
        ),
      }
    }
  }

  #[aztec(private)]
  fn constructor(
    admin: AztecAddress, 
    name: str<31>, 
    symbol: str<31>, 
    decimals: u8
  ) {
    let selector = FunctionSelector::from_signature("_initialize((Field),(Field),(Field),u8)");
    let name_s = FieldCompressedString::from_string(name);
    let symbol_s = FieldCompressedString::from_string(symbol);
    // initializeメソッドを呼び出す
    context.call_public_function(
      context.this_address(),
      selector,
      [
        admin.to_field(), 
        name_s.serialize()[0], 
        symbol_s.serialize()[0], 
        decimals as Field
      ]
    );
  }

  #[aztec(public)]
  fn set_admin(new_admin: AztecAddress) {
    assert(storage.admin.read().eq(context.msg_sender()), "caller is not admin");
    storage.admin.write(new_admin);
  }

  #[aztec(public)]
  fn public_get_name() -> pub FieldCompressedString {
    storage.name.read()
  }

  unconstrained fn un_get_name() -> pub [u8; 31] {
    storage.name.read().to_bytes()
  }

  #[aztec(public)]
  fn public_get_symbol() -> pub FieldCompressedString {
    storage.symbol.read()
  }

  unconstrained fn un_get_symbol() -> pub [u8; 31] {
    storage.symbol.read().to_bytes()
  }

  #[aztec(public)]
  fn public_get_decimals() -> pub u8 {
    storage.decimals.read()
  }

  unconstrained fn un_get_decimals() -> pub u8 {
    storage.decimals.read()
  }

  #[aztec(public)]
  fn set_minter(
    minter: AztecAddress, 
    approve: bool
  ) {
    assert(storage.admin.read().eq(context.msg_sender()), "caller is not admin");
    storage.minters.at(minter).write(approve);
  }

  #[aztec(public)]
  fn mint_public(
    to: AztecAddress, 
    amount: Field
  ) {
    assert(storage.minters.at(context.msg_sender()).read(), "caller is not minter");
    let amount = SafeU120::new(amount);
    let new_balance = storage.public_balances.at(to).read().add(amount);
    let supply = storage.total_supply.read().add(amount);

    storage.public_balances.at(to).write(new_balance);
    storage.total_supply.write(supply);
  }

  #[aztec(public)]
  fn mint_private(
    amount: Field, 
    secret_hash: Field
  ) {
    assert(storage.minters.at(context.msg_sender()).read(), "caller is not minter");
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
  ) {
    if (!from.eq(context.msg_sender())) {
      // The redeem is only spendable once, so we need to ensure that you cannot insert multiple shields from the same message.
      assert_current_call_valid_authwit_public(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    let amount = SafeU120::new(amount);
    let from_balance = storage.public_balances.at(from).read().sub(amount);

    let pending_shields = storage.pending_shields;
    let mut note = TransparentNote::new(amount.value as Field, secret_hash);

    storage.public_balances.at(from).write(from_balance);
    pending_shields.insert_from_public(&mut note);
  }

  #[aztec(public)]
  fn transfer_public(
    from: AztecAddress, 
    to: AztecAddress, 
    amount: Field, 
    nonce: Field
  ) {
    if (!from.eq(context.msg_sender())) {
      assert_current_call_valid_authwit_public(&mut context, from);
    } else {
      assert(nonce == 0, "invalid nonce");
    }

    let amount = SafeU120::new(amount);
    let from_balance = storage.public_balances.at(from).read().sub(amount);
    storage.public_balances.at(from).write(from_balance);

    let to_balance = storage.public_balances.at(to).read().add(amount);
    storage.public_balances.at(to).write(to_balance);
  }

  #[aztec(public)]
  fn burn_public(from: AztecAddress, amount: Field, nonce: Field) {
      if (!from.eq(context.msg_sender())) {
          assert_current_call_valid_authwit_public(&mut context, from);
      } else {
          assert(nonce == 0, "invalid nonce");
      }

      let amount = SafeU120::new(amount);
      let from_balance = storage.public_balances.at(from).read().sub(amount);
      storage.public_balances.at(from).write(from_balance);

      let new_supply = storage.total_supply.read().sub(amount);
      storage.total_supply.write(new_supply);
  }

  #[aztec(private)]
  fn redeem_shield(to: AztecAddress, amount: Field, secret: Field) {
      let pending_shields = storage.pending_shields;
      let secret_hash = compute_secret_hash(secret);
      // Get 1 note (set_limit(1)) which has amount stored in field with index 0 (select(0, amount)) and secret_hash
      // stored in field with index 1 (select(1, secret_hash)).
      let options = NoteGetterOptions::new().select(0, amount).select(1, secret_hash).set_limit(1);
      let notes = pending_shields.get_notes(options);
      let note = notes[0].unwrap_unchecked();
      // Remove the note from the pending shields set 
      pending_shields.remove(note);

      // Add the token note to user's balances set
      storage.balances.at(to).add(SafeU120::new(amount));
  }

  #[aztec(private)]
  fn unshield(from: AztecAddress, to: AztecAddress, amount: Field, nonce: Field) {
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
  fn transfer(from: AztecAddress, to: AztecAddress, amount: Field, nonce: Field) {
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
  fn burn(from: AztecAddress, amount: Field, nonce: Field) {
      if (!from.eq(context.msg_sender())) {
          assert_current_call_valid_authwit(&mut context, from);
      } else {
          assert(nonce == 0, "invalid nonce");
      }

      storage.balances.at(from).sub(SafeU120::new(amount));

      let selector = FunctionSelector::from_signature("_reduce_total_supply(Field)");
      let _void = context.call_public_function(context.this_address(), selector, [amount]);
  }

  #[aztec(public)]
  internal fn _initialize(
      new_admin: AztecAddress,
      name: FieldCompressedString,
      symbol: FieldCompressedString,
      decimals: u8
  ) {
      assert(!new_admin.is_zero(), "invalid admin");
      storage.admin.write(new_admin);
      storage.minters.at(new_admin).write(true);
      storage.name.write(name);
      storage.symbol.write(symbol);
      storage.decimals.write(decimals);
  }

  /// Internal ///

  #[aztec(public)]
  internal fn _increase_public_balance(to: AztecAddress, amount: Field) {
      let new_balance = storage.public_balances.at(to).read().add(SafeU120::new(amount));
      storage.public_balances.at(to).write(new_balance);
  }

  #[aztec(public)]
  internal fn _reduce_total_supply(amount: Field) {
      // Only to be called from burn.
      let new_supply = storage.total_supply.read().sub(SafeU120::new(amount));
      storage.total_supply.write(new_supply);
  }

  /// Unconstrained ///

  unconstrained fn admin() -> pub Field {
      storage.admin.read().to_field()
  }

  unconstrained fn is_minter(minter: AztecAddress) -> pub bool {
      storage.minters.at(minter).read()
  }

  unconstrained fn total_supply() -> pub u120 {
      storage.total_supply.read().value
  }

  unconstrained fn balance_of_private(owner: AztecAddress) -> pub u120 {
      storage.balances.at(owner).balance_of().value
  }

  unconstrained fn balance_of_public(owner: AztecAddress) -> pub u120 {
      storage.public_balances.at(owner).read().value
  }

  // Below this point is the stuff of nightmares.
  // This should ideally not be required. What do we do if vastly different types of serialized_notes?

  // Computes note hash and nullifier.
  // Note 1: Needs to be defined by every contract producing logs.
  // Note 2: Having it in all the contracts gives us the ability to compute the note hash and nullifier differently for different kind of notes.
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