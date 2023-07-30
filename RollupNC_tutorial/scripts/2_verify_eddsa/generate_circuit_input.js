const fs = require("fs");
const eddsa = require("circomlib/src/eddsa");
const mimc7 = require("circomlib/src/mimc7");

const preimage = [123,456,789];
// ハッシュ化
const M = mimc7.multiHash(preimage);
// create private key
const prvKey = Buffer.from('1'.toString().padStart(64,'0'), "hex");
// create public key
const pubKey = eddsa.prv2pub(prvKey);
// sign
const signature = eddsa.signMiMC(prvKey, M);

const inputs = {
    "from_x": pubKey[0].toString(),
    "from_y": pubKey[1].toString(),
    "R8x": signature['R8'][0].toString(),
    "R8y": signature['R8'][1].toString(),
    "S": signature['S'].toString(),
    "M": M.toString()
}

fs.writeFileSync(
    "./2_verify_eddsa/data/input.json",
    JSON.stringify(inputs),
    "utf-8"
);
