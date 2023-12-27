pragma circom 2.0.0;

include "./../node_modules/circomlib/circuits/bitify.circom";
include "./../node_modules/circomlib/circuits/pedersen.circom";

/**
 * ハッシュ値を生成するメソッド
 */
template SecretHasher() {
  signal input secret;
  signal output secretHash;

  component secretHasher = Pedersen(248);
  component secretBits = Num2Bits(248);

  secretBits.in <== secret;

  for (var i = 0; i < 248; i++) {
    secretHasher.in[i] <== secretBits.out[i];
  }
  // ハッシュ値を生成
  secretHash <== secretHasher.out[0];
}

/**
 * メインとなるサーキット
 */
template Main() {
  // パブリックインプット
  signal input secretHash;
  // プライベートインプット  
  signal input secret;      
  // ハッシュ値を生成
  component hasher = SecretHasher();  
  hasher.secret <== secret; 
  // 同値だったらtrueを返す。
  secretHash === hasher.secretHash;
}

component main {public [secretHash]} = Main(); 