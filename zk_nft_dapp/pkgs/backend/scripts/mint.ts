import { ethers } from 'hardhat';

/**
 * NFTを発行するコントラクトをデプロイするスクリプト
 */
async function main() {
  console.log(` ============================================== [mint:start] ================================================ `)
  // get signer
  const signer = (await ethers.getSigners())[0];
  // NFT Address
  const NFT_ADDRESS = "0xC9E2718b4916D957E0d3cc1253cce8ce91066bFC";
  // Get NFT Contract
  const nft = await ethers.getContractAt('ZKNFT', NFT_ADDRESS);
 
  const tx = await nft.safeMint(
    signer.address,
    [
      "0x2cfb66d732c42332174297788fb69fba6c4bef842d95205ebfde1a126997b953", 
      "0x02a44dc02e68a9f8941db0cc45862ade3ee1621f1213f55e8578e82a82ca8613"
    ],
    [
      [
        "0x08fe99c75a74c6a61ab2705e4baa4cac9ee2216dd7c62586e7f7e3a689651dab", 
        "0x07b9111cb20bc57aee2555c02b728e62c61b5c046574ed283d04e4eaba4a77f1"
      ],
      [
        "0x1d32d30f0a1ce070243bb758f1bf552942c74e78c90ea9a52c20928e50e27a99", 
        "0x1807dcb5b708312a1da298da551759ee09ee593ffbab7224981d2ad2d2778036"
      ]
    ],
    [
      "0x29f2abcc1293ba2275e8e34f33a44b30c13c05ea57fd458ed2199b6e8099137c", 
      "0x1781b34204954fedb73db37e9541c2f960fc9593d9c2ec81a87d2faf4788681e"
    ],
    [
      "0x0eb54e7c08e89be9de1972d9ac680276756917a946f74cd64f07d8bc0a85d870"
    ]
  );
  await tx.wait();
  console.log("tx logs", tx.hash)
  console.log(` =============================================== [mint:end]  =============================================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})