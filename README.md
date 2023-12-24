# ZKRepo

ゼロ知識証明に関する資材をまとめるためのリポジトリです。  
当面は、zkDAO の課題突破を目標にまとめていきます！

## ゼロ知識証明とは

数学の技術を利用して、秘匿情報を外部に提示することなくその情報を保持していることを証明する技術のこと。

## 応用例

- 匿名認証
- スケーラビリティ
- セキュリティ

## Circom とは

Circom は、ゼロ知識証明の生成に利用できる算術回路を定義するための新しいドメイン特化型言語である。Circom コンパイラは、Rust で書かれた circom 言語コンパイラで、関連する制約のセットと、回路のすべてのワイヤへの有効な割り当てを効率的に計算するプログラム（C++または WebAssembly で書かれている）を含む R1CS ファイルを生成するために使用することができます。circom の主な特徴の 1 つは、プログラマがテンプレートと呼ばれるパラメータ化可能な回路を定義し、それをインスタンス化してより大きな回路を形成することができるモジュール性である。小さな個々のコンポーネントから回路を構築するという考え方は、大規模で複雑な circom 回路のテスト、レビュー、監査、または正式な検証を容易に行うことを可能にする。この点で、circom のユーザーは独自のカスタムテンプレートを作成したり、circomLib からテンプレートをインスタンス化することができる。circomLib は、コンパレータ、ハッシュ関数、デジタル署名、2 進および 10 進コンバータなど、数百の回路を数える一般公開のライブラリである。CircomLib は、実務家や開発者が一般に利用できるようになっている。

証明システムの実装は、Javascript と Pure Web Assembly で書かれた snarkjs、ネイティブの Web Assembly で書かれた wasmsnark、C++と Intel Assembly で書かれた rapidSnark などのライブラリでも提供されています。

Circom は、使いやすいインターフェースと、証明機構の複雑さを抽象化することで、開発者に演算回路を構築するための全体的なフレームワークを提供することを目的としています。

Circom の言語リファレンスは、circom language reference で見ることができる。

現時点では、circom Visual Studio Code highlight syntax と circom Vim highlight syntax の 2 つのシンタックスハイライターが利用可能です。

## halo2とは

Halo 2はElectric Coin Company（Zcashの開発者）によって、Zcashの非効率性やセキュリティ上の問題（トラステッド・セットアップなど）を解決するために開発された。Halo 2の証明システムは、信頼されたセットアップなしでzkSNARK証明の作成と検証を可能にする一連のRustクレートによって実装されているライブラリ。

回路、証明、証明/検証キーなどを生成するために作成する関数は、すべてWebAssemblyにコンパイルすることができる。

## Chipsとは

前節では、回路をかなり低レベルで記述した。回路を実装する場合、私たちは通常、監査性、効率性、モジュール性、表現力といった望ましい特性を目指した、より高レベルのAPIを使用する。

このAPIで使用される用語と概念の一部は、集積回路の設計とレイアウトとの類似から取られている。集積回路と同様に、上記の望ましい特性は、特定の機能の効率的な組み込み済み実装を提供するチップを構成することで得やすくなる。

例えば、ハッシュ関数や暗号のような特定の暗号プリミティブや、スカラー乗算やペアリングのようなアルゴリズムを実装するチップがあるかもしれない。

PLONKish回路では、フィールド乗算や加算を行う標準的なゲートだけで任意の論理を構築することが可能です。しかし、カスタムゲートを使うことで、非常に大きな効率向上が得られる。

私たちのAPIを使うことで、カスタムゲートの特定のセットの使い方を「知っている」チップを定義することができます。これにより、高レベル回路の実装を、カスタム・ゲートを直接使用する複雑さから切り離す抽象化レイヤーを作成します。

PLONKish 回路のゲートは相対参照でセルを参照する。つまり、ゲートのセ レクタが設定されている列から相対的に、与えられたオフセットにある列と行のセ ルを参照する。オフセットがゼロでない場合、これをオフセット参照と呼ぶ（つまりオフセット参照は相対参照のサブセットである）。

相対参照は、等号制約で使用される絶対参照とは対照的で、任意のセルを指すことができます。

オフセット参照の動機は、構成に必要な列の数を減らし、証明のサイズを小さくすることです。もしオフセット参照がなければ、カスタムゲートによって参照される各値を保持する列が必要になり、回路の他のセルからその列に値をコピーするために等号制約を使用する必要があります。オフセット参照を使用すると、必要な列数が減るだけでなく、それらの列すべてに対して等号制約をサポートする必要がなくなるため、効率が向上します。

R1CS（読者によっては馴染みがあるかもしれないが、そうでなくても気にしないでほしい）では、回路は意味的に重要な順序を持たない「ゲートの海」で構成される。一方、PLONK的回路では、オフセット参照のため、行の順序は重要である。

各領域はセルの不連続なサブセットを含み、相対参照は領域内のみを指す。チップ実装の責任の一部は、オフセット参照を行うゲートが領域内の正しい位置にレイアウトされていることを保証することです。

リージョンとその形状のセットが与えられたら、各リージョンをどこに（つまりどの行から）配置するかを決めるために、別のフロアプランナを使います。非常に一般的なアルゴリズムを実装したデフォルトのフロアプランナーがあるが、必要であれば、独自のフロアプランナーを書くことができる。

ある行のゲートが利用可能なすべての列を使用しなかったため、フロアプランニングは一般的に行列にギャップを残す。これらの隙間は、オフセット参照を必要としないゲートによって、可能な限り埋められます。

チップはルックアップテーブルを定義することもできます。同じルックアップ引数に対して複数のテーブルが定義されている場合、タグ・カラムを使用して、各行でどのテーブルが使用されるかを指定することができる。また、複数のテーブルの和でルックアップを実行することも可能である（多項式次数境界によって制限される）。

## PLONKとは

zkSNARKsを実現するための新しい計算手法

## Zero-Knowledge Proofs: STARKs vs SNARKs

ゼロ知識証明技術は、Ethereum にプライバシーをもたらします。現在、市場で最も魅力的なゼロ知識証明技術は、zk-STARK と zk-SNARK の 2 つです。

### 新技術間の対立

歴史上、同じ時期に同じような技術を市場に投入し、同じような結果を求めるが、問題へのアプローチの仕方が異なるということは、常にありました。このような市場現象が発生した場合、採用する側はそれぞれの技術を客観的に評価することを心がけなければならない。

STARK 陣営と SNARK 陣営は、それぞれの技術に対して非常に情熱的であるため、この 2 つの技術を客観的に比較することは興味深いことだと考えました。

### STARKs vs SNARKs

簡単に説明すると、ゼロ知識証明技術とは、証明者が自分の知識を証明するために情報そのものを伝達することなく、ある当事者が他の当事者に対して自分が何かを知っていることを証明することを可能にする技術です。この技術は、ユーザー間で提供する必要のある情報量を削減するため、プライバシーを強化する技術であると同時に、非プライベートシステムの場合、情報量を完全に含まないため、証明をより高速に検証することができるスケーリング技術でもあるのです。

現在、市場で最も有力なゼロ知識技術として、zk-STARK と zk-SNARK の 2 つがあります。zk-STARK は zero-knowledge scalable transparent argument of knowledge、zk-SNARK は zero-knowledge succinct non-interactive argument of knowledge を意味します。この記事では、文化と技術の両方の観点から、これら 2 つの異なるゼロ知識技術の主な違いを掘り下げて説明します。さらに、これらのゼロ知識技術はどちらも本質的に非対話的であり、コードが展開され自律的に動作することができることを意味します。

以下に、この 2 つの技術の大まかな違いを表で紹介します。また、段落形式の違いについても掘り下げていきます。

### SNARKs

2012 年 1 月、カリフォルニア大学バークレー校のアレッサンドロ・キエーザ教授が共著で発表した論文で、彼らが初めて構築したゼロ知識証明に「zk-SNARK」という造語を使いました。 Zk-SNARK は、その安全性を楕円曲線に依存しているのが基本です。暗号技術における楕円曲線は、公知の基点に対するランダムな楕円曲線要素の離散対数を求めることは不可能であるという基本的な前提の下に運用されている。

楕円曲線乱数生成器にバックドアが存在するかどうかについては大きな議論があったが、アルゴリズム全体としては一般に安全性が保たれている。サイドチャネル攻撃にはいくつかの有名な脆弱性があるが、いくつかの技術によって容易に緩和することができる。楕円曲線を用いた暗号には量子攻撃が待ち構えているが、その安全性モデルを破るために必要な量子コンピューティングはまだ広く利用されていない。

また、zk-SNARK は楕円曲線に基づくだけでなく、信頼できるセットアップも必要です。トラステッド・セットアップとは、私的な取引に必要な証明の作成とその検証に使用する鍵の最初の作成イベントのことで、鍵の作成時に、その証明の検証を行う。当初、これらの鍵が作成される際、検証用鍵と私的取引を送信する鍵の間に隠されたパラメータがリンクされています。Trusted Set up イベントでこれらの鍵の作成に使用された秘密が破棄されない場合、その秘密を利用して偽の検証により取引を偽造し、保有者に無から新しいトークンを作成し取引に使用するなどの行為を行うことができるようになる可能性がある。zk-SNARKs のプライバシー機能により、空中から作成されたトークンが実際に空中から作成されたものであることを検証する方法はないでしょう。とはいえ、信頼できる設定は最初だけ必要です。

その結果、SNARK ベースのネットワークのユーザーは、Trusted Set-up が正しく行われたこと、つまり Trusted Set-up キーに関連する秘密が破壊され、その儀式を監督した個人によって保持されていないことに依存しなければなりません。信頼されたセットアップへの依存は、SNARKs を批判する人たちが最も懸念する分野の 1 つです。とはいえ、開発者が信頼済みセットアップを利用する必要があるのは最初だけで、継続的に利用する必要はない。

SNARKs に対するもう 1 つの大きな批判は、SNARKs が量子的な耐性を備えていないことです。量子コンピューティングが大きく普及すれば、SNARKs を支えるプライバシー技術は崩壊してしまうだろう。もちろん、SNARKs の支持者は、量子コンピューターが利用されるようになれば、RSA やほとんどの財布のインフラが壊れるなど、はるかに多くの問題が発生することを正しく指摘している。

とはいえ、信頼できるセットアップに関連する問題があるにもかかわらず、SNARK が STARK よりもはるかに速いペースで実際に採用されたのには、多くの理由がある。SNARK は STARK よりも何年も前に発見されたため、採用の面でかなり先行したテクノロジーとなりました。古いデジタルアセットプロジェクトの 1 つである Zcash は、ブロックチェーン開発コミュニティ内で SNARKs の使用を普及させました。Zcash やその他の SNARKs の採用者のおかげで、SNARKs は最も多くの開発者ライブラリ、公開コード、プロジェクト、そしてこの技術に積極的に取り組んでいる開発者がいることになります。Zcash に加え、新興の DEX である Loopring も SNARKs を利用しています。開発者がゼロ知識技術の活用を始めようと思った場合、STARKs よりも SNARKs を活用する方がはるかに多くのサポートを受けられるでしょう。

さらに、SNARK は STARK の 24%のガスしか必要としないと推定されており、エンドユーザーにとって SNARK でのトランザクションははるかに安価であることを意味します。最後に、SNARKs のプルーフサイズは STARKs よりもはるかに小さく、つまりオンチェーンストレージが少なくて済むということです。

### STARKs

SNARKs はドキュメントや開発者サポートに関して STARKs より明確に優れていますが、STARKs はいくつかのユニークな利点を提供します。その前に、技術的な観点から STARKs がどのようなものか、少し掘り下げてみましょう。

Eli Ben-Sasson、Iddo Bentov、Yinon Horeshy、Michael Riabzev は 2018 年に STARKs を説明する最初の論文を書きました。SNARKs とは異なり、STARKs の基盤技術はハッシュ関数に依存しています。さっそくですが、ハッシュ関数に依存することで、量子的な耐性があるなどの利点があります。さらに、ネットワークで STARK の利用を開始する際に、信頼できる設定が必要ない。

しかし、STARK の証明サイズは SNARK よりもはるかに大きいため、STARK の検証には SNARK よりも時間がかかり、さらに STARK はより多くのガスを必要とすることになります。

さらに、開発者向けの文書やコミュニティが不足しているため、開発者が STARK を利用するのはかなり難しいでしょう。STARKWARE のように STARK ベースのスケーリングソリューションを作成するプロジェクトもありますが、SNARKs のコミュニティの方がまだはるかに規模が大きいのです。

どちらの開発者コミュニティも SNARKs と STARKs の両方をサポートしていますが、特に Ethereum Foundation は Stark を利用する STARKware を声高にサポートしていることがわかります。実際、Ethereum Foundation は STARKware に 1200 万ドルの助成金を与えており、この新興技術への傾倒を明確に示している。

さらに、STARK のドキュメントは SNARK に比べて見劣りしますが、技術コミュニティは最近、この最先端技術の実装を目指す人々のために、より充実したリソース群を開発しました。

## Trusted Setup とは

Trusted Setup（信頼されたセットアップ）は、zk-SNARK プロトコルをセットアップする際に行われる重要なステップです。このステップは、信頼できる参加者によって実行され、プライバシーとセキュリティを確保するために非常に注意深く行われます。Trusted Setup が適切に実施されないと、攻撃者が偽の証明を作成してシステムを脆弱にする可能性があります。

具体的には、zk-SNARK プロトコルを構築するには、次のステップが必要です：

1. パラメータの生成（Trusted Setup）:  
   最初に、信頼された複数の参加者（通常は暗号学的に安全な乱数生成装置を持つ個人または組織）がランダムなパラメータを生成します。
   これらのパラメータは、zk-SNARK プロトコルの動作に重要な役割を果たし、プライバシーとセキュリティを保護します。

2. トラストレス・セットアップの実施（公開）:  
   パラメータが生成されたら、トラストレス・セットアップと呼ばれるステップを経て、これらのパラメータが公開されます。
   トラストレス・セットアップは、パラメータが実際にランダムであり、他の攻撃者によって操作されていないことを保証するために、非常に厳格な検証手順を含みます。
   このステップでは、各参加者が生成したパラメータを確認し、正しく公開されていることを確認します。

3. セットアップの完了と利用:  
   トラストレス・セットアップが成功した場合、zk-SNARK プロトコルはセットアップされ、プライバシーを保護しながら証明を行うことができます。
   このプロトコルを使用して、任意の計算に対して証明を生成し、その証明を検証することが可能です。

Trusted Setup は、zk-SNARK の弱点とも言える部分でもあります。なぜなら、初期のパラメータ生成時に何らかの攻撃が行われると、その後のすべての証明が無効になる可能性があるためです。そのため、zk-SNARK を採用する前に、信頼された参加者の選定、適切な検証手順、公開されるパラメータの厳重な保護が行われる必要があります。

## ZK-Rollup はどのように動くのか？？

ロールアップ・チェーンには 2 つのアクターが関与する： コーディネーターとユーザーである。

- コーディネータはチェーン上のメルケル・ツリーを管理し、スナーク・プルーフを送信することで更新できる。
- ユーザーは RPC/API を経由して、署名付きのトランザクションをコーディネーターに送信する。
- コーディネーターはすべてのトランザクションを収集し、スナーク回路が処理するバッチを作成する。
- この有効性証明はチェーン上に提出され検証され、状態がオフチェーンで適切に更新されたことを示す。
- これによりオンチェーン・アカウントのメルケル・ツリーが更新される。

## circuit のコンパイルコマンド

```bash
npm run compile:circuit
```

result

```bash

warning[P1004]: File "circuit.circom" does not include pragma version. Assuming pragma version (2, 1, 2)

template instances: 1
non-linear constraints: 5
linear constraints: 0
public inputs: 0
public outputs: 1
private inputs: 2
private outputs: 0
wires: 8
labels: 9
Written successfully: ./circuit.r1cs
Written successfully: ./circuit.sym
Written successfully: ./circuit_js/circuit.wasm
Everything went okay, circom safe
```

## 制約情報を表示するコマンド

```bash
npm run print:circuit
```

result

```bash
[INFO]  snarkJS: [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.a ] * [ main.a ] - [ main.b +21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[0] ] = 0
[INFO]  snarkJS: [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[0] ] * [ main.int[0] ] - [ main.b +21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[1] ] = 0
[INFO]  snarkJS: [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[1] ] * [ main.int[1] ] - [ main.b +21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[2] ] = 0
[INFO]  snarkJS: [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[2] ] * [ main.int[2] ] - [ main.b +21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[3] ] = 0
[INFO]  snarkJS: [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.int[3] ] * [ main.int[3] ] - [ 21888242871839275222246405745257275088548364400416034343698204186575808495616main.c +main.b ] = 0
```

## サーキットの情報を表示するコマンド

```bash
npm run info:circuit
```

result

```bash
[INFO]  snarkJS: Curve: bn-128
[INFO]  snarkJS: # of Wires: 8
[INFO]  snarkJS: # of Constraints: 5
[INFO]  snarkJS: # of Private Inputs: 2
[INFO]  snarkJS: # of Public Inputs: 0
[INFO]  snarkJS: # of Labels: 9
[INFO]  snarkJS: # of Outputs: 1
```

## zk-snark のセットアップ

### MPC セレモニー

- 開始のためのコマンド

```bash
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
```

result

```bash
[INFO]  snarkJS: First Contribution Hash:
                9e63a5f6 2b96538d aaed2372 481920d1
                a40b9195 9ea38ef9 f5f6a303 3b886516
                0710d067 c09d0961 5f928ea5 17bcdf49
                ad75abd2 c8340b40 0e3b18e9 68b4ffef
```

- 1 回目のコントリビューションのコマンド

```bash
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
```

result

```bash
[INFO]  snarkJS: Contribution Response Hash imported:
                324e8a0d d1c5ba78 e1b4b2d5 bd7c0dc0
                68ec789e dd1e36f5 4bae2178 a03af197
                3c3fe247 58ac778a 04a18517 bae506ea
                5c9d8cc9 73d3f4fe a8454306 447e6e53
[INFO]  snarkJS: Next Challenge Hash:
                bda39a39 14869171 ce13fcb7 2c7cf7a3
                c10ddbce af15b093 de81c9f9 cada1db0
                82e4b769 1ac16172 1211f622 f5609d02
                f4b72dbe 45327f11 de6026bd 6a46fe82
```

- 2 回目のコントリビューションのコマンド

```bash
snarkjs powersoftau contribute pot12_0001.ptau pot12_0002.ptau --name="Second contribution" -e="gagaetstete" -v
```

result

```bash
[INFO]  snarkJS: Contribution Response Hash imported:
                644b9444 b160f773 60e6c48e 62f81015
                489cf6c9 203b1fa1 9a734ec9 1d833d5b
                e3987143 f90e766c e6296ff3 5d11225c
                307f2527 9d4845fa 35b21779 5a17e9eb
[INFO]  snarkJS: Next Challenge Hash:
                47b764cb b89326c3 80edd7f6 ef789cff
                dd936f0b 25b961eb 81358971 d84dd042
                c3969e70 192615ac 75eb6b2b eebb3c59
                42027298 4ce286cc 909c618a a9894b0c
```

- 3 回目のコントリビューションのコマンド

```bash
snarkjs powersoftau export challenge pot12_0002.ptau challenge_0003
snarkjs powersoftau challenge contribute bn128 challenge_0003 response_0003 -e="tayotuegjasdkgalgsa" -v
snarkjs powersoftau import response pot12_0002.ptau response_0003 pot12_0003.ptau -n="Third contribution" -v
```

- response

```bash
[INFO]  snarkJS: Last Response Hash:
                644b9444 b160f773 60e6c48e 62f81015
                489cf6c9 203b1fa1 9a734ec9 1d833d5b
                e3987143 f90e766c e6296ff3 5d11225c
                307f2527 9d4845fa 35b21779 5a17e9eb
[INFO]  snarkJS: New Challenge Hash:
                47b764cb b89326c3 80edd7f6 ef789cff
                dd936f0b 25b961eb 81358971 d84dd042
                c3969e70 192615ac 75eb6b2b eebb3c59
                42027298 4ce286cc 909c618a a9894b0c
```

```bash
[INFO]  snarkJS: Claimed Previous Response Hash:
                644b9444 b160f773 60e6c48e 62f81015
                489cf6c9 203b1fa1 9a734ec9 1d833d5b
                e3987143 f90e766c e6296ff3 5d11225c
                307f2527 9d4845fa 35b21779 5a17e9eb
[INFO]  snarkJS: Current Challenge Hash:
                47b764cb b89326c3 80edd7f6 ef789cff
                dd936f0b 25b961eb 81358971 d84dd042
                c3969e70 192615ac 75eb6b2b eebb3c59
                42027298 4ce286cc 909c618a a9894b0c
[INFO]  snarkJS: Contribution Response Hash:
                6c571608 6d1921cc a7717f91 9c99645b
                0197a672 f8479227 f304fc77 faa7182a
                f135ac62 abd0fccf 3946373b 23fe8a10
                a25ffe4c a58af53d f72bc490 03b55248
```

```bash
[INFO]  snarkJS: Contribution Response Hash imported:
                6c571608 6d1921cc a7717f91 9c99645b
                0197a672 f8479227 f304fc77 faa7182a
                f135ac62 abd0fccf 3946373b 23fe8a10
                a25ffe4c a58af53d f72bc490 03b55248
[INFO]  snarkJS: Next Challenge Hash:
                91d76824 ca0544de 291963dd 02ca424a
                9a11a619 f707be4b 43f7cd88 08ba379d
                ba7fb4cc e61c5e3c 09cbbe37 02b2a380
                15357bfa e2b59456 288672ee c50173e4
```

### 第 1 段階の MPC セレモニーで問題が発生していないかチェックするコマンド

```bash
snarkjs powersoftau verify pot12_0003.ptau -v
```

result

```bash
[INFO]  snarkJS: Powers Of tau file OK!
[INFO]  snarkJS: Next challenge hash:
                91d76824 ca0544de 291963dd 02ca424a
                9a11a619 f707be4b 43f7cd88 08ba379d
                ba7fb4cc e61c5e3c 09cbbe37 02b2a380
                15357bfa e2b59456 288672ee c50173e4
[INFO]  snarkJS: -----------------------------------------------------
[INFO]  snarkJS: Contribution #3: Third contribution
[INFO]  snarkJS: Next Challenge:
                91d76824 ca0544de 291963dd 02ca424a
                9a11a619 f707be4b 43f7cd88 08ba379d
                ba7fb4cc e61c5e3c 09cbbe37 02b2a380
                15357bfa e2b59456 288672ee c50173e4
[INFO]  snarkJS: Response Hash:
                6c571608 6d1921cc a7717f91 9c99645b
                0197a672 f8479227 f304fc77 faa7182a
                f135ac62 abd0fccf 3946373b 23fe8a10
                a25ffe4c a58af53d f72bc490 03b55248
[INFO]  snarkJS: Response Hash:
                47b764cb b89326c3 80edd7f6 ef789cff
                dd936f0b 25b961eb 81358971 d84dd042
                c3969e70 192615ac 75eb6b2b eebb3c59
                42027298 4ce286cc 909c618a a9894b0c
[INFO]  snarkJS: Powers Of tau file OK!
[INFO]  snarkJS: -----------------------------------------------------
[INFO]  snarkJS: Contribution #2: Second contribution
[INFO]  snarkJS: Next Challenge:
                47b764cb b89326c3 80edd7f6 ef789cff
                dd936f0b 25b961eb 81358971 d84dd042
                c3969e70 192615ac 75eb6b2b eebb3c59
                42027298 4ce286cc 909c618a a9894b0c
[INFO]  snarkJS: Response Hash:
                644b9444 b160f773 60e6c48e 62f81015
                489cf6c9 203b1fa1 9a734ec9 1d833d5b
                e3987143 f90e766c e6296ff3 5d11225c
                307f2527 9d4845fa 35b21779 5a17e9eb
[INFO]  snarkJS: Response Hash:
                bda39a39 14869171 ce13fcb7 2c7cf7a3
                c10ddbce af15b093 de81c9f9 cada1db0
                82e4b769 1ac16172 1211f622 f5609d02
                f4b72dbe 45327f11 de6026bd 6a46fe82
[INFO]  snarkJS: Powers Of tau file OK!
[INFO]  snarkJS: -----------------------------------------------------
[INFO]  snarkJS: Contribution #1: First contribution
[INFO]  snarkJS: Next Challenge:
                bda39a39 14869171 ce13fcb7 2c7cf7a3
                c10ddbce af15b093 de81c9f9 cada1db0
                82e4b769 1ac16172 1211f622 f5609d02
                f4b72dbe 45327f11 de6026bd 6a46fe82
[INFO]  snarkJS: Response Hash:
                324e8a0d d1c5ba78 e1b4b2d5 bd7c0dc0
                68ec789e dd1e36f5 4bae2178 a03af197
                3c3fe247 58ac778a 04a18517 bae506ea
                5c9d8cc9 73d3f4fe a8454306 447e6e53
[INFO]  snarkJS: Response Hash:
                9e63a5f6 2b96538d aaed2372 481920d1
                a40b9195 9ea38ef9 f5f6a303 3b886516
                0710d067 c09d0961 5f928ea5 17bcdf49
                ad75abd2 c8340b40 0e3b18e9 68b4ffef
[INFO]  snarkJS: -----------------------------------------------------
[WARN]  snarkJS: this file does not contain phase2 precalculated values. Please run:
   snarkjs "powersoftau preparephase2" to prepare this file to be used in the phase2 ceremony.
[INFO]  snarkJS: Powers of Tau Ok!
```

### beacon コマンドを生成する

```bash
snarkjs powersoftau beacon pot12_0003.ptau pot12_beacon.ptau 432bef0719c9a5203f5e3f91980a84d61e97c3edcf05ebffac1aa24ff954969d  10  -n="Final Beacon" -v
```

- result

```bash
[INFO]  snarkJS: Contribution Response Hash imported:
                2842a639 d5255997 d7a5dd3c fb8c378d
                841cd333 37eb278f 17f04c73 bd354b10
                5b1baea4 1db9d00f 99c044fc 2b5cf625
                f87e2795 781a8629 efe91f11 7aeb5aa4
[INFO]  snarkJS: Next Challenge Hash:
                c601841e 7da3dedd 27c90d60 6ceb1a36
                a7d5fc5e 2f12cac9 1c98c448 a10cb43d
                fd31bc33 2c47ff1d d4f567cf 4610942f
                fb996c64 cf9aabb7 f713972d 244663d8
```

### 第 1 段階最終成果物(beacon)生成コマンド

下記コマンドを実行して、サーキットの証明鍵と検証鍵を生成するために利用する最終定期な ptau ファイルを生成する。

```bash
snarkjs powersoftau prepare phase2 pot12_beacon.ptau pot12_final.ptau -v
```

### beacon ファイル検証コマンド

```bash
snarkjs powersoftau verify pot12_final.ptau
```

- result

```bash
[INFO]  snarkJS: Beacon generator: 432bef0719c9a5203f5e3f91980a84d61e97c3edcf05ebffac1aa24ff954969d
[INFO]  snarkJS: Beacon iterations Exp: 10
[INFO]  snarkJS: Powers Of tau file OK!
```

### MPC セレモニー第 2 段階 (証明用の鍵と検証用の鍵を生成する。)

```bash
snarkjs zkey new circuit.r1cs pot12_final.ptau circuit_0000.zkey
```

- result

```bash
[INFO]  snarkJS: Reading r1cs
[INFO]  snarkJS: Reading tauG1
[INFO]  snarkJS: Reading tauG2
[INFO]  snarkJS: Reading alphatauG1
[INFO]  snarkJS: Reading betatauG1
[INFO]  snarkJS: Circuit hash:
                501cc402 f79fc78a 4f9a22be 348784cf
                245594f2 fac4d336 ecd79d5b d2a5f1fc
                01de34b2 7b63e8ff 4b93708a 5535a480
                84bd06e2 86f17358 14c33eee ffdbc8ef
```

### 1 回目のコントリビューション

```bash
snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="First contribution"
```

### 2 回目のコントリビューション

```bash
snarkjs zkey contribute circuit_0001.zkey circuit_0002.zkey --name="Second contribution" -e="gagaetstete"
```

### 3 回目のコントリビューション

```bash
snarkjs zkey export bellman circuit_0002.zkey challenge_phase2_0003
snarkjs zkey bellman contribute bn128 challenge_phase2_0003 response_phase2_0003 -e="gdgdgdfgdfggfg"
snarkjs zkey import bellman circuit_0002.zkey response_phase2_0003 circuit_0003.zkey --name="Third contribution"
```

### 第 2 段階の MPC セレモニーが完了しているかチェックするコマンド

```bash
snarkjs zkey verify circuit.r1cs pot12_final.ptau circuit_0003.zkey
```

- result

```bash
[INFO]  snarkJS: ZKey Ok!
```

### ランダムビーコンを適用させるコマンド

```bash
snarkjs zkey beacon circuit_0003.zkey circuit_final.zkey 2e5d91d305f3b1d59de362baf0e5507af0899b444a33e79a641587ece38c952b 10 -n="Final Beacon phase2"
```

- 検証用コマンド

```bash
snarkjs zkey verify circuit.r1cs pot12_final.ptau circuit_final.zkey
```

- result

```bash
[INFO]  snarkJS: ZKey Ok!
```

### 検証用の鍵をエクスポートするコマンド

```bash
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
```

- result

```json
{
  "protocol": "groth16",
  "curve": "bn128",
  "nPublic": 1,
  "vk_alpha_1": [
    "341268026241253491423059576312441836301508756559992945334136854545640647764",
    "3070504926457695018910071855107723005045360489647182543278242798160768512785",
    "1"
  ],
  "vk_beta_2": [
    [
      "19039041921792295721727370445830439839265939227215573232381014216772566296644",
      "15960690852005394414413094328749064144602412770640258005069103430326886101235"
    ],
    [
      "436635684786798007291522257169722142521506033344775228097162808201627133973",
      "8902290777991391709407369614595325408027230900268683774012625898453290471027"
    ],
    ["1", "0"]
  ],
  "vk_gamma_2": [
    [
      "10857046999023057135944570762232829481370756359578518086990519993285655852781",
      "11559732032986387107991004021392285783925812861821192530917403151452391805634"
    ],
    [
      "8495653923123431417604973247489272438418190587263600148770280649306958101930",
      "4082367875863433681332203403145435568316851327593401208105741076214120093531"
    ],
    ["1", "0"]
  ],
  "vk_delta_2": [
    [
      "7328045320413339345564123844714213568950507613858004711417864264319635002927",
      "14454542983220095731440081544300536623647409297725840636501714435915564606812"
    ],
    [
      "8815337532016595408300346110699482053401891747184513860778582105824957076831",
      "17909047770032892609033249291349030774790968457659271078660501059213505655400"
    ],
    ["1", "0"]
  ],
  "vk_alphabeta_12": [
    [
      [
        "17426892983010552168687762504505013998085468884786210493686697990634796318087",
        "1441732438672517267735163926899469220003423373690008393178731354713434880328"
      ],
      [
        "19840539482562197622184089945754607516252493598697613335301661474291501827513",
        "13073570725826142910597386596473438752474500155456746699777202475599334171653"
      ],
      [
        "6538321897189627754148362703190638183265480220288997260207201154256612396783",
        "13144512573238297511284892724822600002729447731624685191346696333575188818159"
      ]
    ],
    [
      [
        "9005495642293719051520082104765038443656811196908447423330197374701408774247",
        "1874832062889076549061864220328986292515197352341437763183822142880408930441"
      ],
      [
        "14948775842995761044570401699214527027861412526396871356719923152790221191521",
        "13311143481990252556680597766323805243981707391724560690384967142691185241214"
      ],
      [
        "16357119165812067532099394520841110575809841909788529679445328175067505764543",
        "15602471757840195605514553364121245443568403943770043048611453971814589981024"
      ]
    ]
  ],
  "IC": [
    [
      "1589833558202348083935719178955077080157186237145089236555999184818819552763",
      "5020587342769346475652681172035129801096340993338409071334859219594654376934",
      "1"
    ],
    [
      "11885643502854898269790762398442045392662813009661213353235494421683745631112",
      "13417660207019502542031098450547958267336365574382744310566181322136294795234",
      "1"
    ]
  ]
}
```

### 特定の関係 R が存在していることを証拠とする witness を作成

```bash
snarkjs wtns calculate circuit_js/circuit.wasm input.json witness.wtns
```

### witness を算出するまでの過程を出力するためのコマンド

```bash
snarkjs wtns debug circuit_js/circuit.wasm input.json witness.wtns circuit.sym --trigger -set -get
```

### witness から証明を生成するコマンド

```bash
snarkjs groth16 prove circuit_final.zkey witness.wtns proof.json public.json
```

### Circom コマンドのヘルプ

```bash
circom --help
```

実行結果

```bash
circom compiler 2.1.2
IDEN3
Compiler for the circom programming language

USAGE:
    circom [FLAGS] [OPTIONS] [--] [input]

FLAGS:
        --r1cs                                 Outputs the constraints in r1cs format
        --sym                                  Outputs witness in sym format
        --wasm                                 Compiles the circuit to wasm
        --json                                 Outputs the constraints in json format
        --wat                                  Compiles the circuit to wat
    -c, --c                                    Compiles the circuit to c
        --O0                                   No simplification is applied
        --O1                                   Only applies var to var and var to constant simplification
        --O2                                   Full constraint simplification
        --verbose                              Shows logs during compilation
        --inspect                              Does an additional check over the constraints produced
        --use_old_simplification_heuristics    Applies the old version of the heuristics when performing linear
                                               simplification
    -h, --help                                 Prints help information
    -V, --version                              Prints version information

OPTIONS:
    -o, --output <output>                    Path to the directory where the output will be written [default: .]
    -p, --prime <prime>                      To choose the prime number to use to generate the circuit. Receives the
                                             name of the curve (bn128, bls12381, goldilocks) [default: bn128]
    -l <link_libraries>...                   Adds directory to library search path
        --O2round <simplification_rounds>    Maximum number of rounds of the simplification process

ARGS:
    <input>    Path to a circuit with a main component [default: ./circuit.circom]
```

### 参考文献

1. [Course Docs](https://zku.gnomio.com/course/view.php?id=8)
2. [zku-cohort-3](https://github.com/zku-cohort-3)
3. [【GitHub】zkGames](https://github.com/vplasencia/zkGames)
4. [Circom](https://github.com/iden3/circom)
5. [ZoKrates](https://github.com/Zokrates/ZoKrates)
6. [Circom Docs](https://docs.circom.io/getting-started/installation/)
7. [ZoKrates Docs](https://zokrates.github.io/)
8. [Circom installing](https://docs.circom.io/getting-started/installation/)
9. [ZKSnark-Tutorial](https://www.samsclass.info/141/proj/C523.htm)
10. [snarkjs+powers of tau ceremony で zk proof を作る](https://scrapbox.io/bitpickers/snarkjs+powers_of_tau_ceremony%E3%81%A7zk_proof%E3%82%92%E4%BD%9C%E3%82%8B)
11. [ゼロ知識証明入門](https://www.amazon.co.jp/%E3%82%BC%E3%83%AD%E7%9F%A5%E8%AD%98%E8%A8%BC%E6%98%8E%E5%85%A5%E9%96%80-Shoeisha-Digital-First-%E6%9C%89%E9%99%90%E8%B2%AC%E4%BB%BB%E7%9B%A3%E6%9F%BB%E6%B3%95%E4%BA%BA%E3%83%88%E3%83%BC%E3%83%9E%E3%83%84/dp/4798170992)
12. [【npm】 snarkjs](https://www.npmjs.com/package/snarkjs)
13. [ZK-SNARK - Qita](https://qiita.com/oggata/items/a2c8a4041eac3734f712)
14. [ZK Poker — A Simple ZK-SNARK Circuit - Medium](https://medium.com/coinmonks/zk-poker-a-simple-zk-snark-circuit-8ec8d0c5ee52)
15. [zksnark poker - Sample](https://github.com/glamperd/snark-example/tree/master/poker)
16. [zkRollup - Tutorial](https://keen-noyce-c29dfa.netlify.app/)
17. [JavaScript tutorial for Zero-Knowledge Proofs Using SnarkJS and Circom](https://hackernoon.com/javascript-tutorial-for-zero-knowledge-proofs-using-snarkjs-and-circom)
18. [The Magic of Zero-Knowledge Proofs through the Source Code of Tornado Cash](https://hackernoon.com/the-magic-of-zero-knowledge-proofs-through-the-source-code-of-tornado-cash?ref=hackernoon.com)
19. [zksnark-tutorial - GitHub](https://github.com/TheBojda/zksnark-tutorial?ref=hackernoon.com)
20. [【完全保存版】ゼロ知識証明とは何か？ - Zenn](https://zenn.dev/thirdweb_jp/articles/bde586f0f56f9f)
21. [Verifiable Credentials × ゼロ知識証明 - Zenn](https://zenn.dev/kyosuke/articles/a8a92e399e83f490e207)
22. [zk-SNARKs の理論 - Zenn](https://zenn.dev/kyosuke/articles/a1854b9be26c01df13eb)
23. [zk-SNARKs の原理 - Zenn](https://zenn.dev/qope/articles/f94b37ff2d9541)
24. [RollupNC_tutorial - GitHub](https://github.com/mashharuki/RollupNC_tutorial)
25. [snarkjs-react - Exmaple](https://github.com/LHerskind/snarkjs-react)
26. [zero Knowledge proof, Circom snarkJS, example](https://www.youtube.com/watch?v=2BHdTjpYmFg)
27. [[WIP] rollupNC demo](https://www.youtube.com/watch?v=sm9NZ2jQxwk)
28. [RollupNC (Rollup non-custodial) - GitHub](https://github.com/rollupnc/RollupNC)
29. [Writing a Zero Knowledge dApp](https://medium.com/@yujiangtham/writing-a-zero-knowledge-dapp-fd7f936e2d43)
30. [zk_example_dapp - GitHub](https://github.com/ytham/zk_example_dapp)
31. [wagmi configuring-chains](https://wagmi.sh/react/providers/configuring-chains)
32. [ゼロ知識証明のユースケースとは？](https://baasinfo.net/?p=3673)
33. [ブロックチェーンで使われるゼロ知識証明とは？](https://gaiax-blockchain.com/zero-knowledge-proofs)
34. [Tornado Cash - How it Works | DeFi + Zero Knowledge Proof](https://www.youtube.com/watch?v=z_cRicXX1jI)
35. [サーキット ライブ Editor ZKRepl](https://zkrepl.dev/)
36. [How to Use Zero Knowledge Dapp Boilerplate](https://hackernoon.com/how-to-use-a-zero-knowledge-dapp-boilerplate)
37. [【GitHub】 zk-block ZKApp のボイラーテンプレート](https://github.com/Elefria-Labs/zk-block)
38. [ZKBlock のサイト](https://zkblock.app/)
39. [Ethcon Korea 2023 "ZK Email: On-chain verification of emails using ZKP"](https://speakerdeck.com/sorasuegami/ethcon-korea-2023-zk-email-on-chain-verification-of-emails-using-zkp)
40. [【GitHub】zkemail](https://github.com/zkemail)
41. [【GitHub】awesome-zk](https://github.com/ventali/awesome-zk)
42. [【GitHub】zkWebAuthn](https://github.com/zkwebauthn)
43. [ZKAttest：WebAuthn の改良](https://tech.hashport.io/3356/)
44. [【GitHub】webauthn-halo2](https://github.com/zkwebauthn/webauthn-halo2/tree/main)
45. [ZK Face ID Wallet](https://hackmd.io/@knownothing/zk-face-id)
46. [zk-SNARK:革新的なゼロ知識証明とその応用](https://www.gate.io/ja/learn/articles/zk-snark-innovative-zero-knowledge-proof-and-its-applications/890)
47. [How to create a Zero Knowledge DApp: From zero to production](https://vivianblog.hashnode.dev/how-to-create-a-zero-knowledge-dapp-from-zero-to-production)
48. [【GitHub】zkSudoku sample Code](https://github.com/vplasencia/zkSudoku)
49. [ゼロ知識証明のユースケース](https://ethereum.org/ja/zero-knowledge-proofs/#use-cases-for-zero-knowledge-proofs)
50. [Sui Docs Zklogin](https://sui.io/zklogin)
51. [ZkLogin Docs](https://docs.sui.io/concepts/cryptography/zklogin/zklogin-example)
52. [ZkLogin Example demo](https://sui-zklogin.vercel.app/)
53. [【GitHub】ZkLogin Example demo](https://github.com/mashharuki/sui-zklogin-demo)
54. [Awesome Zero Knowledge - GitHub](https://github.com/ventali/awesome-zk)
55. [ZK Basics Cheatsheet - GitHub](https://github.com/baro77/ZKbasicsCS)
56. [zkp-app-boilerplate - GitHub](https://github.com/mashharuki/zkp-app-boilerplate)
57. [Halo2で使われている最新のzk-SNARKプロトコルPLONKの数学的解説](https://tech.hashport.io/3711/)
58. [Halo2 Learning Course](https://learn.0xparc.org/materials/halo2/learning-group-1/cost-model)
59. [Building a Zero Knowledge web app with Halo 2 and Wasm (part 1)](https://medium.com/@yujiangtham/building-a-zero-knowledge-web-app-with-halo-2-and-wasm-part-1-80858c8d16ee)
60. [https://hammster.vercel.app/](https://hammster.vercel.app/)
61. [【GitHub】 Hammster](https://github.com/ytham/hammster)
62. [Halo2 - Docs](https://zcash.github.io/halo2/user/simple-example.html)