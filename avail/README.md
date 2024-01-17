# Avail

Avail は、モジュラーチェーンの DA プロジェクトでレイヤー 2 ブロックチェーンを開発するフレームワーク

1. Validium：Avail にトランザクションデータを投稿するロールアップ
2. ソブリンロールアップ：トランザクションを別のチェーンに公開し、決済を自分で行うロールアップ
3. アプリ固有ロールアップ：アプリケーションに特化したロールアップ

## クイックスタート

以下で CLI をインストールする

```bash
npm i -g @availproject/cli
```

以下で実行

```bash
avail lc up
```

TypeScript のスクリプト例は以下を参照のこと

[https://github.com/availproject/avail/tree/old_develop/examples/ts](https://github.com/availproject/avail/tree/old_develop/examples/ts)

ノードの建て方(テストネット)

```bash
git clone https://github.com/availproject/avail.git
```

```bash
mkdir -p output
```

```bash
cargo run --locked --release -- --chain goldberg -d ./output
```

スクリプトでテストネットに接続する方法

```bash
yarn connect
```

### 参考文献

1. [エクスプローラー](https://goldberg.avail.tools/#/explorer)
2. [Faucet Page](https://passport-verifier.avail.tools/)
3. [ネットワーク情報](https://docs.availproject.org/networks/)
