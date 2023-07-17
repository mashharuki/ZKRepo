const snarkjs = require("snarkjs");
const fs = require('fs');

/**
 * main script
 */
const main = async() => {

  // get proof & publicSignals data
  const publicSignals = JSON.parse(fs.readFileSync("1_simple_arithmetic/proof/publicSignals.json"));
  const proof = JSON.parse(fs.readFileSync("1_simple_arithmetic/proof/proof.json"));
  
  // geneate call data
  const res = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
 
  console.log("res:", res);

  process.exit(0);
};

main();