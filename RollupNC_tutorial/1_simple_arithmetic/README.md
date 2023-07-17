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