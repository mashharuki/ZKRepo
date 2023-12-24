import { Addresses } from '@/utils/addresses';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { prepareWriteContract, writeContract } from '@wagmi/core';

/**
 * executeTransaction method
 * @param a
 * @param b 
 * @param c 
 * @param input
 * @returns 
 */
export const executeTransaction = async (
  a: any,
  b: any,
  c: any,
  input: any
): Promise<TransactionReceipt | null> => {
  
  const abiPath = require('./abi/Sudoku.json');

  console.log("address:", Addresses.SUDOKU_ADDR);
  console.log("abiPath.abi:", abiPath.abi);

  try {
    // Prepare the transaction data
    const config = await prepareWriteContract({
      address: Addresses.SUDOKU_ADDR,
      abi: abiPath.abi,
      functionName: 'verifySudoku',
      args: [a, b, c, input],
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