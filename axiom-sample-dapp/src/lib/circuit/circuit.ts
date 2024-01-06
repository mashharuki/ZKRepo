import {
  addToCallback,
  CircuitValue,
  getSolidityMapping,
} from "@axiom-crypto/client";

export const inputs = {
  blockNumber: 10330506,
  tokenAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
  userAddress: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072"
};

export type CircuitInputType = typeof inputs;
export interface CircuitInputs extends CircuitInputType { }
export interface CircuitValueInputs {
  blockNumber: CircuitValue;
  tokenAddress: CircuitValue;
  userAddress: CircuitValue;
}

/**
 * Prove a wallet holds an ERC-20 token Circuit
 * @param param0 
 */
export const circuit = async ({
  blockNumber,
  tokenAddress,
  userAddress,
}: CircuitValueInputs) => {
  // Since the blockNumber is a variable input, let's add it to the results that will be sent to my callback function:
  addToCallback(blockNumber);
  addToCallback(tokenAddress);
  addToCallback(userAddress);

  const tokenMapping = getSolidityMapping(blockNumber, tokenAddress, 1)
  // userAddress is the name of the key of the mapping
  const val = await tokenMapping.key(userAddress)
  // We add the result to the callback
  addToCallback(val);
  console.log("val:", val)
};