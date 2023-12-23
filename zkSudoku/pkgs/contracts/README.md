# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

- テスト

  ```bash
  yarn test
  ```

  ```bash
  yarn run v1.22.19
  $ hardhat test


    Sudoku
      ✔ Should generate a board
      ✔ Should return true for valid proof on-chain (1092ms)
      ✔ Should return false for invalid proof on-chain (238ms)
      ✔ Should verify Sudoku successfully (790ms)
      ✔ Should be reverted on Sudoku verification because the board is not in the board list (448ms)


    5 passing (4s)

  ✨  Done in 4.38s.
  ```
