import { ethers } from "hardhat";

/**
 * デプロイ用のスクリプト
 */
async function main() {
  // deploy verifier contract
  console.log(`==================== sudokuVerifier Contract deploy start ====================`);
  const sudokuVerifier = await ethers.deployContract("sudokuVerifier");
  await sudokuVerifier.deployed();
  console.log(`sudokuVerifier deployed to ${sudokuVerifier.address}`);
  console.log(`==================== sudokuVerifier Contract deploy end ====================`);

  console.log(`==================== Sudoku Contract deploy start ====================`);
  const Sudoku = await ethers.deployContract("Sudoku", [sudokuVerifier.address]);
  await Sudoku.deployed();
  console.log(`Sudoku Contract deployed to ${Sudoku.address}`);
  console.log(`==================== Sudoku Contract deploy end ====================`);

  /*
  console.log(`==================== Sudoku Contract test start ====================`);
  let board = await Sudoku.generateSudokuBoard(new Date().toString());
  console.log(board);

  // Call the function.
  let result = await sudokuVerifier.verifyProof(
    calldata[0],
    calldata[1],
    calldata[2],
    calldata[3]
  );
  console.log("verify Result", result);

  console.log(`==================== Sudoku Contract test end ====================`);
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
