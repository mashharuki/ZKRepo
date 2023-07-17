## 動かし方

- サーキットのコンパイル

  ```bash
  circom sample_circuit.circom -o build --r1cs --wasm --json
  ```

  ```bash
  circom sample_challenge_circuit.circom -o build --r1cs --wasm --json
  ```

- インプットデータの生成

  一つフォルダ階層を上げる

  ```bash
  node generate_circuit_input.js
  ```

  ```bash
  node generate_challenge_input.js
  ```

- witnessを算出するコマンド

  ```bash
  snarkjs wc ./build/sample_circuit.wasm input.json 
  ```

- Performing trusted setup

  ```bash
  npx snarkjs groth16 setup build/sample_circuit.r1cs ./../powersOfTau28_hez_final_12.ptau zkey/sample_circuit_0000.zkey
  ```

- generate proof

  一つフォルダ階層を上げる

  ```bash
  node scripts/1_simple_arithmetic/generate_proof.js
  ```

- generate verify key

  ```bash
  npx snarkjs zkey export verificationkey zkey/sample_circuit_0000.zkey verificationkey/verification_key.json
  ```

- verify proof

  - コマンドで検証する場合

    ```bash
    snarkjs groth16 verify verificationkey/verification_key.json proof/publicSignals.json proof/proof.json
    ```

  - スクリプトで検証する場合

    一つフォルダ階層を上げる

    ```bash
    node scripts/1_simple_arithmetic/verify_proof.js
    ```

- Generate the solidity verifier

  検証用のSolidityファイルを生成する

  ```bash
  snarkjs zkey export solidityverifier zkey/sample_circuit_0000.zkey contract/verifier.sol
  ```

- デプロイしたverify用のスマートコントラクト(Mumbai network)

  [0xB90f39c6903B64d9B536515eDF940B01E20FCeC1](https://mumbai.polygonscan.com/address/0xB90f39c6903B64d9B536515eDF940B01E20FCeC1)  

  verify済み  

  [0xB90f39c6903B64d9B536515eDF940B01E20FCeC1#code](https://mumbai.polygonscan.com/address/0xB90f39c6903B64d9B536515eDF940B01E20FCeC1#code)

- 検証に必要な引数情報を生成するためのコマンド

  ```bash
  snarkjs zkey export soliditycalldata proof/publicSignals.json proof/proof.json
  ```

  実行結果

  ```bash
  ["0x1fa3c348db2e50e4f4ca72a9d259df49b1b86bf492a5a550b7f2c1fe6a544c25", "0x1f7a8d2fbe72ec145447ed9464b579f3e0eb9369b9002197f8558ad5f86b25b9"],[["0x102ab2ce5420ae7dd7d00bfa09ef427770b31a9ea317d07c2f5a902cfa1fa3d0", "0x1c9185ecd114a666219ae5a534ae009ed969f954dbce68f035a4a8453e6a155a"],["0x11a3d46a87c5ebbaf65d53b88d0e143458144653ef070a4e1e503c13134684f1", "0x18c34c9acaef52bb34625c52c1ff872d837687476351da9b87465b4fff526a03"]],["0x0790416c24149668373b69fa7a3d09973f2f9346a6620709d84b47e9f91da5af", "0x1bd058f9443d0d5f168ec50f411d80461fc56373417ab6cd275ecfed4b9d6964"],["0x000000000000000000000000000000000000000000000000000000000000001e","0x0000000000000000000000000000000000000000000000000000000000000006"]
  ```