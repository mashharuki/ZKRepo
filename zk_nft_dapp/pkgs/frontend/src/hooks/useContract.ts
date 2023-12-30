import { Contract, ContractInterface, ethers } from "ethers";

export type TxData = {
  to: string;
  data: any;
}

var contractAddress: string;
var contract: Contract;

/**
 * 初期化メソッド
 */
export const createContract = (
  address: string,
  abi: ContractInterface,
  rpcUrl: string
) => {
  // create provider
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // コントラクトのインスタンスを生成
  contract = new ethers.Contract(
    address,
    abi,
    provider,
  );
  contractAddress = address;
}

/**
 * createSafeMintTxData method
 */
export const createSafeMintTxData = async (
  playerAddress: string,
  proof_a: any, 
  proof_b: any, 
  proof_c: any, 
  publicSignals: any 
): Promise<TxData> => {
  // create NFT Cotntract's method call data
  const minTx = await contract.populateTransaction.safeMint (
    playerAddress,
    proof_a,
    proof_b,
    proof_c,
    publicSignals
  );
  console.log("txData :", minTx.data);

  const txData: TxData = {
    to: contractAddress,
    data: minTx.data,
  };

  console.log("txData :", txData);
  return txData;
}

