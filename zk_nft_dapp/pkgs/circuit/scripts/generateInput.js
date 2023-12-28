const circomlib = require('circomlibjs');
const snarkjs = require('snarkjs');
const crypto = require('crypto');

/*
 * Compute pedersen hash 
 */
const pedersenHash = async(data) => {
  const badyjub = await circomlib.buildBabyjub();
  const pedersenHash = await circomlib.buildPedersenHash();
  return await badyjub.unpackPoint(await pedersenHash.hash(data))[0];
}

/**
 * String to byte
 */
const str2Hex = (data) => {
  var bytes = data.split('').map(char => char.charCodeAt(0))
  var hexs = bytes.map(byte => byte.toString(16));
  var hex = hexs.join('');
  return hex;
}

function generateRandomData(length, additionalString) {
  // バイト列を生成
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  // バイト列を16進数文字列に変換
  const hexString = randomBytes.toString('hex');
  // 与えられた追加の文字列を連結
  const combinedString = hexString + additionalString;
  // 16進数文字列をBigIntに変換
  const result = BigInt('0x' + combinedString);

  return result;
}


/**
 * サーキットInput用のデータを生成するスクリプト
 * @returns 
 */
async function generateInputData() {

  console.log("-> Creating random secret....")
  const secret = "web3";
  const hexSectet = generateRandomData(76, secret)
  console.log("hexSectet:", hexSectet.readUInt32LE(0));
  const hash = await pedersenHash(hexSectet);
  var hexs = hash.map(byte => byte.toString(16));
  var hex = hexs.join('');
  console.log("secretHash:", hex);
}

generateInputData();







/*
 以下、荒巻さんのサンプルスクリプト
 const snarkjs = require('snarkjs');
const crypto = require('crypto');
const circomlib = require('circomlib');

const rbigint = (nbytes) => snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes));

const pedersenHash = (data) => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];


const main = () => {
  const secret = rbigint(31);
  // const secret = snarkjs.bigInt.leBuff2int(Buffer.from("aaa", 'utf8'));;
  const hash = pedersenHash(secret.leInt2Buff(31));

  console.log({secret, hash})
}

main();
 */