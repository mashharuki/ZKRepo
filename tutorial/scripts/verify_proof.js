const snarkjs = require("snarkjs");
const fs = require('fs');

/**
 * main script
 */
const main = async() => {

  // get proof & publicSignals data
  const publicSignals = JSON.parse(fs.readFileSync("proof/public.json"));
  const proof = JSON.parse(fs.readFileSync("proof/proof.json"));
  // get verification key data
  const vKey = JSON.parse(fs.readFileSync("verificationkey/verification_key.json"));
  // veriry
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  if (res === true) {
    console.log("Verification OK");
  } else {
    console.log("Invalid proof");
  }

  process.exit(0);
};

main();