# サンプルモノレポプロジェクト

## 動かし方

- セットアップ

  `/pkgs/backend/.env`ファイルを作成する。

  ```txt
  ALCHEMY_API_KEY=""
  PRIVATE_KEY=""
  ARBISCAN_API_KEY=""
  NETWORK="arbitrum-sepolia"
  ```

- インストール

  ```bash
  yarn
  ```

- コントラクトのビルド

  ```bash
  yarn backend build
  ```

- コントラクトのテスト

  ```bash
  yarn backend test
  ```

- コントラクトのデプロイ

  ```bash
  yarn backend deploy
  ```

  以下は、 Arbitrum Sepolia にデプロイした時の記録

  ```bash
  Pairing library has been deployed to: 0x711F22929A25562567dabb482Ed013165d6E5B09
  SemaphoreVerifier contract has been deployed to: 0xB2775012891Ad9b63E389BDE502Faa950346aE9c
  Poseidon library has been deployed to: 0xFcD39aacb3e00D6fAD336DE11802E1e65253A58f
  IncrementalBinaryTree library has been deployed to: 0x55ee50fEA0df5822f76e84ae3E16dbDe7292CD5b
  Semaphore contract has been deployed to: 0xa9322C8424580E0b38F3E90FdDC73e009609fB4b
  Reclaim Implementation deployed to: 0x8fbcf4B62c1393C4472B26Ca496F0872b511145F
  Reclaim Proxy deployed to:  0xD41E1A91876c237521522DbD5ef2985e6afE1AD9
  ```

- フロントエンドのビルド

  ```bash
  yarn frontend build
  ```

- フロントエンドのデプロイ

  ```bash
  yarn frontend dev
  ```
