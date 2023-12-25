const { ethers } = require("hardhat");

const generateProof = require("./generateProof");
const question = require("./question");

async function main() {
  const contractAddress = await question("Contract address : ");

  const proof = await generateProof();

  console.log("proof[0]", proof[0]);
  console.log("proof[1]", proof[1]);
  console.log("proof[2]", proof[2]);
  console.log("proof[3]", proof[3]);

  const contract = await ethers.getContractAt(
    "ZKDistributer",
    contractAddress
  );

  console.log("-> Start minting ...")
  const tx = await contract.safeMint(
    proof[0],
    proof[1],
    proof[2],
    proof[3],
  );
  console.log("-> Transaction hash :", tx.hash);
  console.log("-> Confirming the transaction...");

  await tx.wait(1);
  console.log("-> Transaction has been succeed")
}

main().then(() => {
  process.exit(0);
});
