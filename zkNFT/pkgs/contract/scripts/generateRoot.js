const merkleTree = require('fixed-merkle-tree');
const crypto = require('crypto');
const circomlib = require('circomlib');
const { saveArrayAsCSV } = require('./csv');

const MERKLE_TREE_HEIGHT = 20;

function generateRoot() {

  console.log("-> Creating random secret....")
  const secrets = [];
  const leaves = [];
  const secretsForCSV = [];
  const leavesForCSV = [];

  for (let i = 0; i < 20; i++) {
    const secret = rbigint(31);
    const hash = pedersenHash(leInt2Buff(secret, 31));
    secrets.push(secret);
    leaves.push(hash);

    secretsForCSV.push([i, secret]);
    leavesForCSV.push([i, hash]);
  };

  saveArrayAsCSV("../configs/secrets.csv", secretsForCSV);
  saveArrayAsCSV("../configs/leaves.csv", leavesForCSV);

  console.log("-> successfully created random secret");

  console.log("-> Creating root....")
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, leaves);
  const root = tree.root();
  console.log("-> Root :", root);

  const hexRoot = "0x" + BigInt(root).toString(16);
  console.log("-> Root in hex :", hexRoot);

  return root
}

module.exports = generateRoot;

// ----------------------------------

/** Generate random number of specified byte length */
const rbigint = (nbytes) => leBuff2int(crypto.randomBytes(nbytes));

/** Compute pedersen hash */
const pedersenHash = (data) => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];

// const bigInt = require("big-integer");
// ----------------
// https://github.com/tornadocash/snarkjs/blob/master/src/bigint.js
let wBigInt;
const leBuff2int = (buff) => {
  wBigInt = BigInt;
  wBigInt.zero = wBigInt(0);

  let res = wBigInt.zero;
  for (let i=0; i<buff.length; i++) {
      const n = wBigInt(buff[i]);
      res = res.add(n.shl(i*8));
  }
  return res;
};

const leInt2Buff = (n, len) => {
  wBigInt = BigInt;
  wBigInt.zero = wBigInt(0);

  let r = n;
  let o =0;
  const buff = Buffer.alloc(len);
  while ((r.greater(wBigInt.zero))&&(o<buff.length)) {
      let c = Number(r.and(wBigInt("255")));
      buff[o] = c;
      o++;
      r = r.shr(8);
  }
  if (r.greater(wBigInt.zero)) throw new Error("Number does not feed in buffer");
  return buff;
};

