# ZK NFT Dapp

## 動かし方

- インストール

  ```bash
  pnpm i
  ```

  - `circuit`側

    - コンパイル

      ```bash
      pnpm circuit run compile
      ```

    - verify 用の solidity ファイルなどを生成する

      ```bash
      pnpm circuit run executeGroth16
      ```

    - witness ファイルを生成する

      ```bash
      pnpm circuit run generateWitness
      ```

    - verify 用の Solidity ファイルを backend フォルダ配下に移す

      ```bash
      pnpm circuit run cp:verifier
      ```

    - zk 用のファイルを backend と frontend フォルダ配下に移す

      ```bash
      pnpm circuit run cp:zk
      ```

  - `backend`側

    - コンパイル

      ```bash
      pnpm backend run compile
      ```

    - テスト

      ```bash
      pnpm backend run test
      ```

    - スマートコントラクトのデプロイ

      ```bash
      pnpm backend run deploy:fuji
      ```

    - スマートコントラクトを verify

      ```bash
      pnpm backend run verify:fuji
      ```

  - `frontend`側

## デプロイ済みのコントラクト情報

- Fuji

  - NFT: [0xc3Ed7311E7E5CDF80fa0f90eD3CED2d3Fc1A9779](https://testnet.snowtrace.io/address/0xc3Ed7311E7E5CDF80fa0f90eD3CED2d3Fc1A9779)
  - Verifier: [0x63091AaAfcB761d40e364B2010b237571CDb6370](https://testnet.snowtrace.io/address/0x63091AaAfcB761d40e364B2010b237571CDb6370)

### 参考文献

1. [Circom の基本](https://scrapbox.io/bitpickers/Circom%E3%81%AE%E5%9F%BA%E6%9C%AC)
2. [text-to-ascii-art](https://www.asciiart.eu/text-to-ascii-art)
