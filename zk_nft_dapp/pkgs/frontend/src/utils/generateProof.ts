/**
 * ZK用のproofを生成するためのメソッド
 */
export const generateProof = async(
  secret: any,
  secretHash: any
): Promise<any> => {
  const res = await fetch('/api/generateProof', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input0: secret,
      input1: secretHash
    }),
  });
  const proofs = await res.json()
  return proofs
}