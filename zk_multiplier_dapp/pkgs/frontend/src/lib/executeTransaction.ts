import { Addresses } from '@/shared/addresses';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract } from '@wagmi/core';

/**
 * executeTransaction method
 * @param proof 
 * @param publicSignals 
 * @returns 
 */
export const executeTransaction = async (
  proof: any, 
  publicSignals: Array<string>
): Promise<TransactionReceipt | null> => {
  
  const abiPath = require('./abi/SimpleMultiplier.json');

  console.log("address:", Addresses.SIMPLE_MULTIPLIER_ADDR);
  console.log("abiPath.abi:", abiPath.abi);

  try {
    // Prepare the transaction data
    const config = await prepareWriteContract({
      address: Addresses.SIMPLE_MULTIPLIER_ADDR,
      abi: abiPath.abi,
      functionName: 'submitProof',
      args: [proof, publicSignals],
      overrides: {
        gasLimit: 360000
      }
    });

    console.log("config:", config);

    // Execute the transaction
    const writeResult = await writeContract(config);

    // Wait for the transaction block to be mined
    const txResult = await writeResult.wait();
    return txResult;

  } catch(err:any) {
    console.error("err:", err);
    return null;
  }
}