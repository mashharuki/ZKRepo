import { generateProof } from '@/lib/generateProof';
import type { NextApiRequest, NextApiResponse } from 'next';

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

  const unsolved = parseInt(body.unsolved);
  const solved = parseInt(body.solved);

  if (unsolved === undefined || solved === undefined) {
    return res.status(403).json({error: "Invalid inputs"});
  }
  // call generateProof method
  const proof = await generateProof(unsolved, solved);

  if (proof.proof === "") {
    return res.status(403).json({error: "Proving failed"});
  }

  res.setHeader("Content-Type", "text/json");
  res.status(200).json(proof);
}