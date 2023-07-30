## 動かし方

- コンパイル

  ```bash
  circom circuit/sample.circom -o build --r1cs --wasm --json
  ```

- generate input data

  ```bash
  node scripts/2_verify_eddsa/generate_circuit_input.js
  ```
