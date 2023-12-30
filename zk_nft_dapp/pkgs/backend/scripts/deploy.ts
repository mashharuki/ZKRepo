import { ethers } from 'hardhat';

/**
 * NFT & Verify コントラクトをデプロイするスクリプト
 */
async function main() {
  console.log(` ============================================== [start] ================================================ `)

  // verifier deploy
  const verifier = await ethers.deployContract('PasswordHashVerifier');
  await verifier.deployed();
  console.log(` PasswordHashVerifier deployed to ${verifier.address}`);

  // NFT deploy
  const nft = await ethers.deployContract('ZKNFT', ["0x63091AaAfcB761d40e364B2010b237571CDb6370"])
  await nft.deployed();
  console.log(` ZKNFT deployed to ${nft.address}`)
  console.log(` =============================================== [end]  =============================================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})