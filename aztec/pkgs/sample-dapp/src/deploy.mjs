// src/deploy.mjs
import { writeFileSync } from 'fs';
import { Contract, ContractDeployer, createPXEClient } from '@aztec/aztec.js';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import TokenContractJson from "../../token_contract_tutorial/contracts/src/artifacts/Token.json" assert { type: "json" };


const { 
  PXE_URL = 'http://localhost:8080' 
} = process.env;

/**
 * デプロイ用のスクリプト
 */
async function main() {
  const pxe = createPXEClient(PXE_URL);
  const [ownerWallet] = await getInitialTestAccountsWallets(pxe);
  const ownerAddress = ownerWallet.getCompleteAddress();
  // デプロイ
  const token = await Contract.deploy(
    ownerWallet, 
    TokenContractJson, [ownerAddress, 'TokenName', 'TKN', 18]
  ).send().deployed();

  console.log(`Token deployed at ${token.address.toString()}`);

  const addresses = { token: token.address.toString() };
  writeFileSync('addresses.json', JSON.stringify(addresses, null, 2));
}

main().catch((err) => {
  console.error(`Error in deployment script: ${err}`);
  process.exit(1);
});