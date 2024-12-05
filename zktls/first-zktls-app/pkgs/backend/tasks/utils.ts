import CONTRACTS_CONFIG from "../resources/contract-network-config.json";

export function getContractAddress(networkName: string, contractName: string) {
  try {
    return CONTRACTS_CONFIG["networks"][networkName][contractName]["address"];
  } catch {
    throw new Error(`No contract address found for network "${networkName}"`);
  }
}
