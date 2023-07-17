const snarkjs = require("snarkjs");
const fs = require('fs');

/**
 * main script
 */
const main = async() => {
  // get input data
  const inputJson = JSON.parse(fs.readFileSync("1_simple_arithmetic/input.json"));

  // generate proof data
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    inputJson,
    "1_simple_arithmetic/build/sample_circuit.wasm", 
    "1_simple_arithmetic/zkey/sample_circuit_0000.zkey");

  console.log("publicSignals:", publicSignals);
  console.log("proof:", proof);

  const publicSignalsJson = JSON.stringify(publicSignals);
  const proofJson = JSON.stringify(proof);
  
  // jsonファイルでアウトプット
  fs.writeFileSync('1_simple_arithmetic/proof/publicSignals.json', publicSignalsJson);
  fs.writeFileSync('1_simple_arithmetic/proof/proof.json', proofJson);

  process.exit(0);
};

main();