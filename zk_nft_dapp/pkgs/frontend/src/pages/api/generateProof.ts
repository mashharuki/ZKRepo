import type { NextApiRequest, NextApiResponse } from 'next';
import path from "path";
// @ts-ignore
import * as snarkjs from 'snarkjs';


/**
 * generateProof method
 * @param secret
 * @param secretHash
 * @returns 
 */
const generateProof = async (
  secret: string, 
  secretHash: string
): Promise<any> => {
  console.log(`Generating proof with inputs`);
  
  // We need to have the naming scheme and shape of the inputs match the .circom file
  const inputs = {
    secret, 
    secretHash
  }

  // Paths to the .wasm file and proving key
  const wasmPath = path.join(process.cwd(), './src/zk/PasswordHash.wasm');
  const provingKeyPath = path.join(process.cwd(), './src/zk/PasswordHash_final.zkey')

  try {
    // Generate a proof of the circuit and create a structure for the output signals
    const { 
      proof, 
      publicSignals 
    } = await snarkjs.groth16.fullProve(inputs, wasmPath, provingKeyPath);

    // get call data
    const calldataBlob = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);

    const regex = /\[([^[]*)\]/g;
    const matches = calldataBlob.match(regex);

    if (matches) {
      matches.forEach((match: any, index: number) => {
        console.log(`Data ${index + 1}: ${match}`);
      });
    } else {
      console.log("No matches found.");
    }

    return {
      proof_a: JSON.parse(matches[0]), 
      proof_b: JSON.parse("[" + matches[1] + "," + matches[2]), 
      proof_c: JSON.parse(matches[3]), 
      publicSignals: JSON.parse(matches[4]),
    }
  } catch (err) {
    console.log(`Error:`, err)
    return {
      proof_a: "", 
      proof_b: "", 
      proof_c: "", 
      publicSignals: [],
    }
  }
}

/**
 * zk用のproofを生成するためのAPI
 * @param req 
 * @param res 
 * @returns 
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req?.body;
  if (body === undefined) {
    return res.status(403).json({error: "Request has no body"});
  }
  console.log(body);

  const input0 = body.input0;
  const input1 = body.input1;

  if (input0 === undefined || input1 === undefined) {
    return res.status(403).json({error: "Invalid inputs"});
  }
  // call generateProof method
  const proof = await generateProof(input0, input1);

  if (proof.proof === "") {
    return res.status(403).json({error: "Proving failed"});
  }

  res.setHeader("Content-Type", "text/json");
  res.status(200).json(proof);
}