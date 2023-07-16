const snarkjs = require("snarkjs");
const fs = require('fs');

/**
 * main script
 */
const main = async() => {
  // generate proof data
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { in: 10 }, 
    "build/sample_js/sample.wasm", 
    "zkey/circuit_0000.zkey");

  console.log("publicSignals:", publicSignals);
  console.log("proof:", proof);

  const publicSignalsJson = JSON.stringify(publicSignals);
  const proofJson = JSON.stringify(proof);
  
  // jsonファイルでアウトプット
  fs.writeFileSync('proof/publicSignals.json', publicSignalsJson);
  fs.writeFileSync('proof/proof.json', proofJson);

  process.exit(0);
};

main();