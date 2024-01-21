import { createPXEClient } from '@aztec/aztec.js';

const { 
  PXE_URL = 'http://localhost:8080' 
} = process.env;

/**
 * メインスクリプト
 */
async function main() {
  const pxe = createPXEClient(PXE_URL);
  const { chainId } = await pxe.getNodeInfo();
  console.log(`Connected to chain ${chainId}`);

  // load account info
  const accounts = await pxe.getRegisteredAccounts();
  console.log(`User accounts:\n${accounts.map(a => a.address).join('\n')}`);
}

main().catch(err => {
  console.error(`Error in app: ${err}`);
  process.exit(1);
});