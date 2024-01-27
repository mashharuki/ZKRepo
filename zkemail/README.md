# ZK Email 

## クイックスタートガイド

To get started with Prove.email, follow these steps:
1. Choose the Project Component: Select the project component you're interested in from our list of SDKs, templates, and examples.
2. Read the README Guide: Each section comes with a "README" guide. Make sure to read it to understand how the technology works and to get started with the basic setup.
3. Dive into Specific Documentation: For detailed information and advanced configurations, delve into the specific documentation of the component you've chosen.
4. Regularly Check for Updates: Since we frequently make changes to enhance functionality and security, it's crucial to keep your circuits package up-to-date.

## 構成技術

- Circom zk-email  
  zk-emailの新しいcircomインスタンスを素早くデプロイできるように、フロントエンド関数、回路、スマートコントラクト用のNPM SDKを用意しています。

  Goerliのhttps://zkemail.xyz、Proof-of-Twitter NFTのライブデモを伴うエンドツーエンドのCircom実装があります。Circomは簡潔さとサーバーサイドのスピードで輝き、zk-emailの回路を30秒以内に証明します。クライアント側では、ブラウザーで実行するのに約6分かかり、1GBのダウンロードが必要である。

- ZK Regex  
  新しい証明を構築するために、設定ファイルやCLIを介して任意の正規表現文字列に対してcircom/halo2 codegenを行う正規表現ライブラリや、正規表現をcircomジェネレータと同じ状態に変換するのに役立つDFA可視化サイトも用意している。正規表現をcircom回路に迅速に変換するためのUIを作成中のJavierに感謝する。

- Halo2 zk-email  
  クライアント側のプライバシーを必要とするzk-emailアプリケーションの証明速度を10倍改善できると期待している。そのために、私たちのzk-regexライブラリと、halo2で任意の正規表現回路を作成するhalo2-regex回路を組み合わせています。また、カスタムbase64エンコーディング＋デコーディング回路と、Axiomのflexgatesと最適化Brechtpd + PSEのSHA256で構築された、史上初のhalo2 RSA + SHA256もあります。これらの公共財は、野生の証明データに関するいくつかのアプリケーションに使用されているが、halo2の仕事はまだ監査されていない。私たちは証明時間を大幅に最適化しており、すべての回路がチェーン上で繰り返し安価に検証されることを期待している。

  我々は現在、L2デプロイメントを可能にするために、分割されたデプロイメント・コントラクトを用いた高速なクライアント側の証明（～20秒）を行っている。これはL2で48Mガス[～Arbitrumで約8ドル]で証明できる。時間をかけて最適化していきたい。代わりに、クラウド上の自動スケーリング再帰的halo2アグリゲータにGPUプローバを投入することもできます（GPUなしの巨大なマシンで～300秒、GPUありで～60秒）。このプローバはゼロ知識を維持し、証明を約500Kガスに圧縮し、～500MBのzkeyを使用します。私たちは、時間をかけてパフォーマンスとメモリの両方を向上させることに取り組み、これに投資し続ければパフォーマンスを大幅に向上させることができると考えています。

- Email Wallet  
  circomのzk-emailを使い、従来のシードフレーズの代わりに電子メールのみを使ったウォレット署名フローのデモがあります。emailwallet.orgでERC20をEメールで送信するデモを現在テストネットV0でデプロイしており、docs.sendeth.orgでドキュメントを閲覧し、slides.prove.emailでスライドを見ることができます。私たちは、開発者が電子メールの件名から任意のイーサリアムの機能をトリガーできるように拡張レイヤーとプライバシーレイヤーを追加し、リレイヤーとDKIMキー更新コードを分散化してセルフホストできるようにし、V1リリースのために監査しています。私たちはこれを強力なWeb3オンボーディング・プロトコルにするつもりです。

- Relayer  
  私たちのオープンソース・リレイヤーは、誰でもセルフホストまたはクラウドホストすることができます：

  我々のDockerimageを使えば、どんなZKプルーフでもすぐに、高速で自動スケールされた64コアの証明インスタンスにデプロイして、クラウド上でプルーフを行うことができます。この場合、プライバシーがAWSに漏れることに注意してください。
  
  あらゆるgmailアカウントで認証可能な組み込みのSMTPおよびIMAPサーバーを経由して、電子メールを送信することでZK証明プロトコルとインターフェースできる。

## 用語解説

- DKIM：  
  DomainKeys Identified Mailの略。電子メールのなりすましを検知するために考案された電子メール認証方法。  
- ゼロ知識証明：   
  ある当事者が値 x を知っているという事実以外の情報を伝えることなく、その当事者が値 x を知っていることを他の当事者に証明できる暗号手法。  
- RSA：   
  Rivest-Shamir-Adleman。安全なデータ伝送に広く使用されている公開鍵暗号方式。  
- Circom：   
  ゼロ知識証明に焦点を当てた算術回路を定義するための言語。  
- SnarkJS:   
  zkSNARKs用のJavaScriptライブラリ。  
- zkSNARKs：   
  ゼロ知識簡潔非対話的知識論証。ゼロ知識証明の一種で、特に短くて検証しやすい。  
- ポセイドン・ハッシュ：   
  zk-SNARKに最適化された暗号ハッシュ関数。  
- vkey：   
  検証者が証明をチェックするために使用する検証鍵。通常、アプリのサーバー側に含まれる。  
- zkey：   
  通常はアプリケーションのクライアント側にある証明キー。  
- 証人：   
  zkSNARK の文脈では、証人は zkSNARK へのプライベート入力の集合である。  
- 制約：   
  制約とは、zkSNARKが満たさなければならない条件である。証明時間は制約を追加するほど長くなる！  
- Regex:   
  正規表現の略で、検索パターンを形成する文字のシーケンスを表し、一般的にテキスト内の文字列マッチングに使用されます。zkEmail では、電子メールのヘッダーを解析し、関連する情報を抽出するために使用されます。  

## プロジェクトアイディア

1.  内部告発プロジェクト  
    特定のソース（例：@___から）と特定のテキスト（例：フレーズ"___"を含む）を持つリークに人々が入札できるリークのための賞金プラットフォーム。匿名化されたリークが正規表現を満たしていることをzk-emailで証明し、公開したい部分のみを公開することで、他の人がそのリークをアップロードできるエスクローシステムをチェーン上に構築します。
2. Arxiv寄付プロジェクト  
   arxivのリンクを入れると、ボットがPDF/arxiv自体からすべての電子メールをスクレイピングする。そして、すべての依存関係からすべてのEメールをスクレイピングし、寄付者が本文のどこに出てきたかに基づいてEメールのウェイトを変更できるようにする（つまり、デフォルトでは、以前の研究や手法で引用された場合は寄付金の40％を分配し、introで引用された著者は資金の10％を分配する、など）。そして、彼ら全員にzk-emailウォレットを配備し、彼らにお金を送る。  
3. AttestationStation ツイッターなどの認証  
   Twitterのデモを公式のAttestationStation/PolygonID認証に変換する。
4. AIボイスロイヤリティのための自動Spotify分割   
   Spotify確認メールのzk-emailとML経由のEZKL証明ボイスeを介して、あなたがアーティストの声を使用し、彼らと利益を分割したことを証明します。詳細はhttps://hackmd.io/Nf8mSSKwRIu3GYyhGq5f9A。
5. 居住証明  
   あなたがその国で税金を納めたこと、あるいは不動産の購入代金を支払ったことを、政府やサービスから送られてくる電子メールによる確認で証明し、その国だけを公開する。
6. クレジット・スコアの証明  
   クレジットスコアプロバイダーからの確認メールを介して、誰かがオンチェーンでクレジットスコアを証明できるようにすることで、担保不足の暗号貸付を可能にする。
7. オラクル  
   NASDAQのデイリーティッカーメールで株価を確認したり、Robinhoodのスポット価格を確認するなど、メールに記載されたオラクルデータを証明する。Tradingview Alertsはこれをサポートできるはずです。
8. 投資家の関心  
   ある投資家があなたにタームシートを電子メールで送ったことを証明し、その投資家とのやりとりがどのようなものであったかを匿名で開示できるクレデンシャルを作成する。
9. 2FA On-Chain  
   一定額以上のチェーン上のアカウント取引は、メールアドレスからの電子メールでも確認する必要がある。リレイヤーを利用し、チェーン上の取引を見たユーザーに自動的にプロンプトを表示し、後のタイムスタンプで確認応答を証明することで、取引を認証する。おそらく、EメールウォレットV1リレーヤーとパージングをフォークしてこれを作成するのが最も簡単であろう。
10. 電子メールによるマルチシグ制御  
    SAFEまたは他のマルチシグウォレットとのネイティブ統合により、zk-emailsが直接マルチシグ署名者となり、電子メールを介した取引のやり取りや承認が可能になります。
11. 法的ディスカバリー  
    When subpoena'd, people can turn over only a relevant subset of their emails, not all of them. I don't know if this is robust though, since unless Gmail commits to a Merkle root of all your emails or something, people can always hide whatevver emails they want from the proving process.
12. DNSSEC Lobbying  
    GoogleやOutlookなどのプロバイダーに働きかけて、鍵のDNSSECを有効にしてもらう。これは、ZKの経験が浅い人や、人と話すのが得意な人に向いている。
13. 画像をメールで送信するとNFTのミントが行われる  
    添付ファイルの上部にbase64デコードのステップを追加し、画像をオンチェーンするように再フォーマットする。これにより、誰かが画像をメールで送ると、自動的にオンチェインになります（つまり、希望すれば直接NFTを作成することができます）。
14. EZKL + ZK Email  
    機械学習を使って電子メールの内容を解析し、MLモデルの出力だけを明らかにする。これは、メールのNLP要約やドキュメントの解析（最初にbase64デコードを追加した場合）に関係します。

## 動かし方

- zk-regexの動かし方

  1. GitHubをクローンしてきてコンパイル。
  2. `regex -V`を実行してバージョン情報が出てくればOK。

     ```bash
     zk-regex-compiler 1.0.8
     ```

  3. `simple_regex.circom`ファイルを生成する。  

      ```bash
      zk-regex decomposed -d ./packages/circom/tests/circuits/simple_regex_decomposed.json -c ./simple_regex.circom -t SimpleRegex -g true
      ```

      `simple_regex.circom`ファイルが生成される。


### 参考文献
1. [ZK Email Docs](https://zkemail.gitbook.io/zk-email/)
2. [ZK Email Slide](https://docs.google.com/presentation/d/19rNr2lwOMIYcn2noLai4gy0KhoBXP3SbQjRX9BSG9eg/edit#slide=id.g284ac8f47d5_2_153)
3. [ZK Email App Demo](https://sendeth.org/app)
4. [ZK Email Introduction](https://zkemail.gitbook.io/zk-email/zk-email-verifier/zk-email-introduction)
5. [ZK Regex Generator Tool](https://tool.zkregex.com/)
6. [GitHub - zk-regex](https://github.com/mashharuki/zk-regex)
7. [ZK Regex Tools Webstie](https://zkregex.com/)