# ZK Email

## クイックスタートガイド

To get started with Prove.email, follow these steps:

1. Choose the Project Component: Select the project component you're interested in from our list of SDKs, templates, and examples.
2. Read the README Guide: Each section comes with a "README" guide. Make sure to read it to understand how the technology works and to get started with the basic setup.
3. Dive into Specific Documentation: For detailed information and advanced configurations, delve into the specific documentation of the component you've chosen.
4. Regularly Check for Updates: Since we frequently make changes to enhance functionality and security, it's crucial to keep your circuits package up-to-date.

## 構成技術

- Circom zk-email  
  zk-email の新しい circom インスタンスを素早くデプロイできるように、フロントエンド関数、回路、スマートコントラクト用の NPM SDK を用意しています。

  Goerli のhttps://zkemail.xyz、Proof-of-Twitter NFT のライブデモを伴うエンドツーエンドの Circom 実装があります。Circom は簡潔さとサーバーサイドのスピードで輝き、zk-email の回路を 30 秒以内に証明します。クライアント側では、ブラウザーで実行するのに約 6 分かかり、1GB のダウンロードが必要である。

- ZK Regex  
  新しい証明を構築するために、設定ファイルや CLI を介して任意の正規表現文字列に対して circom/halo2 codegen を行う正規表現ライブラリや、正規表現を circom ジェネレータと同じ状態に変換するのに役立つ DFA 可視化サイトも用意している。正規表現を circom 回路に迅速に変換するための UI を作成中の Javier に感謝する。

- Halo2 zk-email  
  クライアント側のプライバシーを必要とする zk-email アプリケーションの証明速度を 10 倍改善できると期待している。そのために、私たちの zk-regex ライブラリと、halo2 で任意の正規表現回路を作成する halo2-regex 回路を組み合わせています。また、カスタム base64 エンコーディング＋デコーディング回路と、Axiom の flexgates と最適化 Brechtpd + PSE の SHA256 で構築された、史上初の halo2 RSA + SHA256 もあります。これらの公共財は、野生の証明データに関するいくつかのアプリケーションに使用されているが、halo2 の仕事はまだ監査されていない。私たちは証明時間を大幅に最適化しており、すべての回路がチェーン上で繰り返し安価に検証されることを期待している。

  我々は現在、L2 デプロイメントを可能にするために、分割されたデプロイメント・コントラクトを用いた高速なクライアント側の証明（～ 20 秒）を行っている。これは L2 で 48M ガス[～ Arbitrum で約 8 ドル]で証明できる。時間をかけて最適化していきたい。代わりに、クラウド上の自動スケーリング再帰的 halo2 アグリゲータに GPU プローバを投入することもできます（GPU なしの巨大なマシンで～ 300 秒、GPU ありで～ 60 秒）。このプローバはゼロ知識を維持し、証明を約 500K ガスに圧縮し、～ 500MB の zkey を使用します。私たちは、時間をかけてパフォーマンスとメモリの両方を向上させることに取り組み、これに投資し続ければパフォーマンスを大幅に向上させることができると考えています。

- Email Wallet  
  circom の zk-email を使い、従来のシードフレーズの代わりに電子メールのみを使ったウォレット署名フローのデモがあります。emailwallet.org で ERC20 を E メールで送信するデモを現在テストネット V0 でデプロイしており、docs.sendeth.org でドキュメントを閲覧し、slides.prove.email でスライドを見ることができます。私たちは、開発者が電子メールの件名から任意のイーサリアムの機能をトリガーできるように拡張レイヤーとプライバシーレイヤーを追加し、リレイヤーと DKIM キー更新コードを分散化してセルフホストできるようにし、V1 リリースのために監査しています。私たちはこれを強力な Web3 オンボーディング・プロトコルにするつもりです。

- Relayer  
  私たちのオープンソース・リレイヤーは、誰でもセルフホストまたはクラウドホストすることができます：

  我々の Dockerimage を使えば、どんな ZK プルーフでもすぐに、高速で自動スケールされた 64 コアの証明インスタンスにデプロイして、クラウド上でプルーフを行うことができます。この場合、プライバシーが AWS に漏れることに注意してください。

  あらゆる gmail アカウントで認証可能な組み込みの SMTP および IMAP サーバーを経由して、電子メールを送信することで ZK 証明プロトコルとインターフェースできる。

## 用語解説

- DKIM：  
  DomainKeys Identified Mail の略。電子メールのなりすましを検知するために考案された電子メール認証方法。
- ゼロ知識証明：  
  ある当事者が値 x を知っているという事実以外の情報を伝えることなく、その当事者が値 x を知っていることを他の当事者に証明できる暗号手法。
- RSA：  
  Rivest-Shamir-Adleman。安全なデータ伝送に広く使用されている公開鍵暗号方式。
- Circom：  
  ゼロ知識証明に焦点を当てた算術回路を定義するための言語。
- SnarkJS:  
  zkSNARKs 用の JavaScript ライブラリ。
- zkSNARKs：  
  ゼロ知識簡潔非対話的知識論証。ゼロ知識証明の一種で、特に短くて検証しやすい。
- ポセイドン・ハッシュ：  
  zk-SNARK に最適化された暗号ハッシュ関数。
- vkey：  
  検証者が証明をチェックするために使用する検証鍵。通常、アプリのサーバー側に含まれる。
- zkey：  
  通常はアプリケーションのクライアント側にある証明キー。
- 証人：  
  zkSNARK の文脈では、証人は zkSNARK へのプライベート入力の集合である。
- 制約：  
  制約とは、zkSNARK が満たさなければならない条件である。証明時間は制約を追加するほど長くなる！
- Regex:  
  正規表現の略で、検索パターンを形成する文字のシーケンスを表し、一般的にテキスト内の文字列マッチングに使用されます。zkEmail では、電子メールのヘッダーを解析し、関連する情報を抽出するために使用されます。

## プロジェクトアイディア

1.  内部告発プロジェクト  
    特定のソース（例：@**_から）と特定のテキスト（例：フレーズ"_**"を含む）を持つリークに人々が入札できるリークのための賞金プラットフォーム。匿名化されたリークが正規表現を満たしていることを zk-email で証明し、公開したい部分のみを公開することで、他の人がそのリークをアップロードできるエスクローシステムをチェーン上に構築します。
2.  Arxiv 寄付プロジェクト  
    arxiv のリンクを入れると、ボットが PDF/arxiv 自体からすべての電子メールをスクレイピングする。そして、すべての依存関係からすべての E メールをスクレイピングし、寄付者が本文のどこに出てきたかに基づいて E メールのウェイトを変更できるようにする（つまり、デフォルトでは、以前の研究や手法で引用された場合は寄付金の 40％を分配し、intro で引用された著者は資金の 10％を分配する、など）。そして、彼ら全員に zk-email ウォレットを配備し、彼らにお金を送る。
3.  AttestationStation ツイッターなどの認証  
    Twitter のデモを公式の AttestationStation/PolygonID 認証に変換する。
4.  AI ボイスロイヤリティのための自動 Spotify 分割  
    Spotify 確認メールの zk-email と ML 経由の EZKL 証明ボイス e を介して、あなたがアーティストの声を使用し、彼らと利益を分割したことを証明します。詳細はhttps://hackmd.io/Nf8mSSKwRIu3GYyhGq5f9A。
5.  居住証明  
    あなたがその国で税金を納めたこと、あるいは不動産の購入代金を支払ったことを、政府やサービスから送られてくる電子メールによる確認で証明し、その国だけを公開する。
6.  クレジット・スコアの証明  
    クレジットスコアプロバイダーからの確認メールを介して、誰かがオンチェーンでクレジットスコアを証明できるようにすることで、担保不足の暗号貸付を可能にする。
7.  オラクル  
    NASDAQ のデイリーティッカーメールで株価を確認したり、Robinhood のスポット価格を確認するなど、メールに記載されたオラクルデータを証明する。Tradingview Alerts はこれをサポートできるはずです。
8.  投資家の関心  
    ある投資家があなたにタームシートを電子メールで送ったことを証明し、その投資家とのやりとりがどのようなものであったかを匿名で開示できるクレデンシャルを作成する。
9.  2FA On-Chain  
    一定額以上のチェーン上のアカウント取引は、メールアドレスからの電子メールでも確認する必要がある。リレイヤーを利用し、チェーン上の取引を見たユーザーに自動的にプロンプトを表示し、後のタイムスタンプで確認応答を証明することで、取引を認証する。おそらく、E メールウォレット V1 リレーヤーとパージングをフォークしてこれを作成するのが最も簡単であろう。
10. 電子メールによるマルチシグ制御  
    SAFE または他のマルチシグウォレットとのネイティブ統合により、zk-emails が直接マルチシグ署名者となり、電子メールを介した取引のやり取りや承認が可能になります。
11. 法的ディスカバリー  
    When subpoena'd, people can turn over only a relevant subset of their emails, not all of them. I don't know if this is robust though, since unless Gmail commits to a Merkle root of all your emails or something, people can always hide whatevver emails they want from the proving process.
12. DNSSEC Lobbying  
    Google や Outlook などのプロバイダーに働きかけて、鍵の DNSSEC を有効にしてもらう。これは、ZK の経験が浅い人や、人と話すのが得意な人に向いている。
13. 画像をメールで送信すると NFT のミントが行われる  
    添付ファイルの上部に base64 デコードのステップを追加し、画像をオンチェーンするように再フォーマットする。これにより、誰かが画像をメールで送ると、自動的にオンチェインになります（つまり、希望すれば直接 NFT を作成することができます）。
14. EZKL + ZK Email  
    機械学習を使って電子メールの内容を解析し、ML モデルの出力だけを明らかにする。これは、メールの NLP 要約やドキュメントの解析（最初に base64 デコードを追加した場合）に関係します。

## 動かし方

- zk-regex の動かし方

  1. GitHub をクローンしてきてコンパイル。
  2. `regex -V`を実行してバージョン情報が出てくれば OK。

     ```bash
     zk-regex-compiler 1.0.8
     ```

  3. `simple_regex.circom`ファイルを生成する。

     ```bash
     zk-regex decomposed -d ./packages/circom/tests/circuits/simple_regex_decomposed.json -c ./simple_regex.circom -t SimpleRegex -g true
     ```

     `simple_regex.circom`ファイルが生成される。

  4. 下記のようなスクリプトで InputData を生成する

     ```ts
     import { generateCircuitInputs } from "@zk-email/helpers/dist/input-helpers";
     import { verifyDKIMSignature } from "@zk-email/helpers/dist/dkim";
     import fs from "fs";
     import path from "path";

     const rawEmail = fs.readFileSync(
       path.join(__dirname, "./emls/rawEmail.eml"),
       "utf8"
     );

     const dkimResult = await verifyDKIMSignature(Buffer.from(rawEmail));

     const circuitInputs = generateCircuitInputs({
       rsaSignature: dkimResult.signature, // The RSA signature of the email
       rsaPublicKey: dkimResult.rsaPublicKey, // The RSA public key used for verification
       body: dkimResult.body, // body of the email
       bodyHash: dkimResult.bodyHash, // hash of the email body
       message: dkimResult.message, // the message that was signed (header + bodyHash)
       //Optional to verify regex in the body of email
       shaPrecomputeSelector: STRING_PRESELECTOR, // String to split the body for SHA pre computation
       maxMessageLength: MAX_HEADER_PADDED_BYTES, // Maximum allowed length of the message in circuit
       maxBodyLength: MAX_BODY_PADDED_BYTES, // Maximum allowed length of the body in circuit
       ignoreBodyHashCheck = false, // To be used when ignore_body_hash_check is true in circuit
     });

     fs.writeFileSync("./input.json", JSON.stringify(circuitInputs));
     ```

## Email Wallet Extensions SDK について

メールウォレット SDK は、メールウォレットの機能を強化するスマートコントラクトで構成されています。この SDK は、あらゆるスマートコントラクトと相互作用できるカスタム拡張機能の作成を可能にします。Uniswap を介したトークンのスワッピング、メールウォレットからの NFT 転送などの操作をサポートしています。サードパーティの開発者は、当社の拡張用 SDK を使用してメールウォレットの新機能を構築できます。

- 初期設定

  Email Wallet SDK を使用して拡張機能を作成するには、以下の手順に従ってください：

  - 新しいリポジトリを作成します：  
    リポジトリのテンプレートを使用して、新しいリポジトリを作成します。
  - リポジトリをクローンします：  
    リポジトリを作成したら、ローカルマシンにクローンします。
  - 依存関係をインストールします：  
    クローンしたフォルダに移動し、yarn を実行して必要な依存関係をインストールします。

- 拡張実装のためにやること

  MomoExtension.sol を修正する  
  リポジトリをセットアップしたら、次は `src/MemoExtension.sol` のコントラクトを独自の実装用に変更します。

  - コントラクトの名前を変更する:  
    `src/MemoExtension.sol` を、拡張機能に適した名前に変更します。
  - 独自の拡張機能の実装を作成します：  
    `MomoExtension.sol `は拡張機能の実装例です。各開発者は、インターフェイスを参考に実際の機能を実装する必要があります。

    - `execute`関数

      ```ts
      execute(
        uint8 templateIndex,
        bytes[] subjectParams,
        address wallet,
        bool hasEmailRecipient,
        address recipientETHAddr,
        bytes32 emailNullifier
      ) external virtual
      ```

      **※注意事項※**  
      erc20 トークンの転送を直接呼び出すのではなく、`EmailWalletCore.depositTokenToAccount`を呼び出して送信者のウォレットにトークンを送信することが推奨されます。現在の仕様では違いはありませんが、将来の仕様では異なる可能性があります。

      テンプレート内の`{tokenAmount}`パラメータは、`EmailWalletCore.depositTokenToAccount`を使用してデコードし、`tokenName`と`tokenAmount`を抽出する必要があります。

    - `registerUnclaimedState`関数

      ```ts
      registerUnclaimedState(
        UnclaimedState memory unclaimedState,
        bool isInternal
      ) public virtual
      ```

      受信者の E メールコミットメントに要求されていない状態を登録する。

      - パラメータ
        - unclaimedState：  
          登録される未請求の状態。
        - isInternal：  
          未請求状態が registerUnclaimedStateAsExtension から登録されているかどうかを示すフラグ。
        - デフォルトの実装：  
          復帰エラーを返す。

    - `claimUnclaimedState`関数

      ```ts
      claimUnclaimedState(
        UnclaimedState memory unclaimedState,
        address wallet
      ) external virtual
      ```

      受信ユーザの未所持状態を要求します。

      - パラメータ
        - unclaimedState：  
          請求する未請求の状態。
        - wallet：  
          ユーザーのウォレットのアドレス。
        - デフォルトの実装：  
          復帰エラーを返す。

    - `voidUnclaimedState`関数

      ```ts
      voidUnclaimedState(
        UnclaimedState memory unclaimedState
      ) external virtual
      ```

      期限切れのアンクレーム状態を戻します。

      - パラメータ
      - unclaimedState：  
        パラメータ: unclaimedState: 期限切れの未請求状態
      - デフォルトの実装:  
        復帰エラーを返す。
      - サブジェクト・テンプレートの定義：  
        件名テンプレートは、文字列配列の配列、つまり 2 次元の文字列配列です。これらは拡張機能によって定義され、拡張機能を呼び出すサブジェクトの形式を宣言します。各フォーマットは、固定文字列（スペースなし）と以下のテンプレートを使用できる。

        - "{tokenAmount}":  
          トークン量の 10 進文字列とトークン名の文字列の組み合わせ。subjectParams の対応するパラメータはバイトエンコーディング（uint256,string）である。金額の 10 進数サイズは、トークン名の ERC20 コントラクトの 10 進数値に依存する。例えば、"1.5 ETH" ⇒ abi.encode((1.5 _ (10\*\*18), "ETH"))、"3.4 USDC" ⇒ abi.encode((3.4 _ (10\*\*6), "USDC"))。
        - "{amount}":  
          10 進文字列。subjectParams の対応するパラメータは、バイト符号化 uint256 です。金額の 10 進サイズは 18 に固定される。例えば、"2.7" ⇒ abi.encode(2.7 \* (10\*\*18))となる。
        - "{string}":  
          文字列。subjectParams の対応するパラメータはバイト符号化文字列である。
        - "{uint}":  
          符号なし整数の 10 進文字列。subjectParams の対応するパラメータはバイト符号化 uint256 です。
        - "{int}":  
          符号付き整数の 10 進文字列。subjectParams の対応するパラメータは、バイトエンコーディング int256 です。
        - "{address}":  
          イーサリアムアドレスの 16 進文字列。subjectParams の対応するパラメータは、バイトエンコーディングされたアドレスである。
        - "{recipient}":  
          受信者のメールアドレス、または受信者のイーサリアムアドレスの 16 進文字列。subjectParams の対応するパラメータは、メールアドレスまたはイーサリアムアドレスのバイトサイズを uint256 にエンコードしたバイトです。

### 参考文献

1. [ZK Email Docs](https://zkemail.gitbook.io/zk-email/)
2. [ZK Email Slide](https://docs.google.com/presentation/d/19rNr2lwOMIYcn2noLai4gy0KhoBXP3SbQjRX9BSG9eg/edit#slide=id.g284ac8f47d5_2_153)
3. [ZK Email App Demo](https://sendeth.org/app)
4. [ZK Email Introduction](https://zkemail.gitbook.io/zk-email/zk-email-verifier/zk-email-introduction)
5. [ZK Regex Generator Tool](https://tool.zkregex.com/)
6. [GitHub - zk-regex](https://github.com/mashharuki/zk-regex)
7. [ZK Regex Tools Webstie](https://zkregex.com/)
8. [ZK Wallet SDK Uniswap 拡張コントラクト例](https://github.com/zkemail/email-wallet/blob/main/packages/contracts/src/extensions/UniswapExtension.sol)
9. [ZK Wallet SDK NFT 拡張コントラクト例](https://github.com/zkemail/email-wallet/blob/main/packages/contracts/src/extensions/NFTExtension.sol)
10. [デプロイ用のサンプルスクリプト](https://github.com/zkemail/email-wallet/blob/main/packages/contracts/script/07_SetDefaultExtensions.s.sol)
11. [Scroll デプロイメモ](https://github.com/scroll-tech/scroll-guides)
