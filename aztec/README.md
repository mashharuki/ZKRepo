# Aztec

## 環境構築における注意事項

[aztec-packages-v0.17.0](https://github.com/AztecProtocol/aztec-packages/releases/tag/aztec-packages-v0.17.0)が必要になるが非常に重いファイルになっているので直接ローカルにコピーしてくる必要あり。

## セットアップ

1. dockerをインストール
2. cliをインストール

```bash
This will install the following scripts and update your PATH if necessary:
  aztec         - launches various infrastructure subsystems (sequencer, prover, pxe, etc).
  aztec-cli     - a command line tool for interfacing and experimenting with infrastructure.
  aztec-nargo   - aztec's build of nargo, the noir compiler toolchain.
  aztec-sandbox - a wrapper around docker-compose that launches services needed for sandbox testing.
  aztec-up      - a tool to upgrade the aztec toolchain to the latest, or specific versions.
```

## ローカルでサンドボックス環境を立ち上げる方法

```bash
aztec-sandbox
```

```bash
[+] Running 9/9
 ✔ ethereum 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                   6.3s 
   ✔ ca7dd9ec2225 Pull complete                                                                                                                                          0.6s 
   ✔ 2de6490c5039 Pull complete                                                                                                                                          0.7s 
   ✔ ff2283537892 Pull complete                                                                                                                                          1.5s 
   ✔ 02db1fc41f11 Pull complete                                                                                                                                          1.6s 
   ✔ c3beb8184f6a Pull complete                                                                                                                                          1.5s 
   ✔ 9754b619dbec Pull complete                                                                                                                                          2.3s 
   ✔ 71a5001610f9 Pull complete                                                                                                                                          3.0s 
   ✔ 78f355e25ed2 Pull complete                                                                                                                                          2.0s 
[+] Running 3/3
 ✔ Network sandbox_default       Created                                                                                                                                 0.7s 
 ✔ Container sandbox-ethereum-1  Created                                                                                                                                30.1s 
 ✔ Container sandbox-aztec-1     Created                                                                                                                                30.1s 
Attaching to aztec-1, ethereum-1
ethereum-1  | anvil -p 8545 --host 0.0.0.0 --chain-id 31337 --silent
aztec-1     | sandbox Debug logs will be written to /Users/harukikondo/.aztec/log/aztec-sandbox.debug.log
aztec-1     | sandbox Setting up Aztec Sandbox v0.17.0 (noir 6ca33a223ccce6a295414a3ce078180e8a22b68c v0.18.0-aztec.5), please stand by...
```

## クイックスタート

[up_quick_start.sh](https://github.com/AztecProtocol/aztec-packages/blob/aztec-packages-v0.17.0//yarn-project/end-to-end/src/guides/up_quick_start.sh)の内容を実行をする

コントラクトのデプロイ

```shell
CONTRACT=$(aztec-cli deploy TokenContractArtifact --salt 0 --args $ALICE --json | jq -r '.address')
echo "Deployed contract at $CONTRACT"
aztec-cli check-deploy --contract-address $CONTRACT
```

## サンプルコントラクト実装

Noirプロジェクト作成方法

```bash
aztec-nargo new --contract private_voting
```

コンパイル

```bash
pnpm aztec-private-counter run compile
```

ABIを生成する

```bash
pnpm aztec-private-counter run generate
```

アカウント情報を取得する

```bash
aztec-cli get-accounts
```

コントラクトのデプロイ

```bash
pnpm aztec-private-counter run deploy
```

うまくいけばサンドボックスにデプロイされる。

```bash
Contract deployed at 0x1a78e7cb9562cf48e03d00851afdb324b6ba6fed27ae624b96cb6faa72757f12
Contract partial address 0x051cd61ad1d592ae4f63bd709a388d5b9cda307b30e47275e01419a8acd16476
```
