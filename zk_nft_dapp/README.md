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

    - NFT をミントする

      ```bash
      pnpm backend run mint:fuji
      ```

  - `frontend`側

    - ビルド

      ```bash
      pnpm frontend run build
      ```

    - フロントエンド起動

      ```bash
      pnpm frontend run dev
      ```

## デプロイ済みのコントラクト情報

- Fuji

  - NFT: [0xC9E2718b4916D957E0d3cc1253cce8ce91066bFC](https://testnet.snowtrace.io/address/0xC9E2718b4916D957E0d3cc1253cce8ce91066bFC)
  - Verifier: [0x63091AaAfcB761d40e364B2010b237571CDb6370](https://testnet.snowtrace.io/address/0x63091AaAfcB761d40e364B2010b237571CDb6370)

- Celo Testnet

  - NFT: [0x2B5914De5D5166eBaa423C92BAb8518c85EAA0cb](https://alfajores.celoscan.io/address/0x2B5914De5D5166eBaa423C92BAb8518c85EAA0cb)
  - Verifier: [0xAa363921A48Eac63F802C57658CdEde768B3DAe1](https://alfajores.celoscan.io/address/0xAa363921A48Eac63F802C57658CdEde768B3DAe1)

- Mantle Testnet
  - NFT: [0x8DF7e6234f76e8fAC829feF83E7520635359094C](https://explorer.testnet.mantle.xyz/address/0x8DF7e6234f76e8fAC829feF83E7520635359094C)
  - Verifier: [0xa05Db9C31B6ffB6aB817D346E99095e1c1c8317D](https://explorer.testnet.mantle.xyz/address/0xa05Db9C31B6ffB6aB817D346E99095e1c1c8317D)

### 参考文献

1. [Circom の基本](https://scrapbox.io/bitpickers/Circom%E3%81%AE%E5%9F%BA%E6%9C%AC)
2. [text-to-ascii-art](https://www.asciiart.eu/text-to-ascii-art)
