import path from "path";
// @ts-ignore
import * as snarkjs from 'snarkjs';

/**
 * generateProof method
 * @param unsolved
 * @param solved
 * @returns 
 */
export const generateProof = async (
  unsolved: any, 
  solved: any
): Promise<any> => {
  console.log(`Generating vote proof with inputs: ${unsolved}, ${solved}`);
  
  // We need to have the naming scheme and shape of the inputs match the .circom file
  const inputs = {
    unsolved: unsolved,
    solved: solved,
  }

  // Paths to the .wasm file and proving key
  const wasmPath = path.join(process.cwd(), './../frontend/src/zk/sudoku.wasm');
  const provingKeyPath = path.join(process.cwd(), './../frontend/src/zk/sudoku_final.zkey')

  try {
    // Generate a proof of the circuit and create a structure for the output signals
    const { 
      proof, 
      publicSignals 
    } = await snarkjs.groth16.fullProve(inputs, wasmPath, provingKeyPath);

    // get call data
    const calldataBlob = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
    const argv = calldataBlob
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x: any) => BigInt(x).toString());

    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const input = [];

    for (let i = 8; i < argv.length; i++) {
      input.push(argv[i]);
    }

    return { 
      a, 
      b, 
      c, 
      input 
    };
  } catch (err) {
    console.log(`generateProof Error:`, err)
    return {}
  }
}