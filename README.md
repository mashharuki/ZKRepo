# ZKRepo
ゼロ知識証明に関する資材をまとめるためのリポジトリです。  
当面は、zkDAOの課題突破を目標にまとめていきます！

## ゼロ知識証明とは

数学の技術を利用して、秘匿情報を外部に提示することなくその情報を保持していることを証明する技術のこと。

## Circomとは

Circomは、ゼロ知識証明の生成に利用できる算術回路を定義するための新しいドメイン特化型言語である。Circomコンパイラは、Rustで書かれたcircom言語コンパイラで、関連する制約のセットと、回路のすべてのワイヤへの有効な割り当てを効率的に計算するプログラム（C++またはWebAssemblyで書かれている）を含むR1CSファイルを生成するために使用することができます。circomの主な特徴の1つは、プログラマがテンプレートと呼ばれるパラメータ化可能な回路を定義し、それをインスタンス化してより大きな回路を形成することができるモジュール性である。小さな個々のコンポーネントから回路を構築するという考え方は、大規模で複雑なcircom回路のテスト、レビュー、監査、または正式な検証を容易に行うことを可能にする。この点で、circomのユーザーは独自のカスタムテンプレートを作成したり、circomLibからテンプレートをインスタンス化することができる。circomLibは、コンパレータ、ハッシュ関数、デジタル署名、2進および10進コンバータなど、数百の回路を数える一般公開のライブラリである。CircomLibは、実務家や開発者が一般に利用できるようになっている。

証明システムの実装は、JavascriptとPure Web Assemblyで書かれたsnarkjs、ネイティブのWeb Assemblyで書かれたwasmsnark、C++とIntel Assemblyで書かれたrapidSnarkなどのライブラリでも提供されています。

Circomは、使いやすいインターフェースと、証明機構の複雑さを抽象化することで、開発者に演算回路を構築するための全体的なフレームワークを提供することを目的としています。

Circomの言語リファレンスは、circom language referenceで見ることができる。

現時点では、circom Visual Studio Code highlight syntaxとcircom Vim highlight syntaxの2つのシンタックスハイライターが利用可能です。

## Trusted Setupとは
参加したpowers of tau ceremonyの皆さんの力を借りてplonkというプロトコル上で使えるproof keyとverify keyを作成する

### 参考文献
1. [Course Docs](https://zku.gnomio.com/course/view.php?id=8)
2. [zku-cohort-3](https://github.com/zku-cohort-3)
3. [【GitHub】zkGames](https://github.com/vplasencia/zkGames)
4. [Circom](https://github.com/iden3/circom)
5. [ZoKrates](https://github.com/Zokrates/ZoKrates)
6. [Circom Docs](https://docs.circom.io/getting-started/installation/)
7. [ZoKrates Docs](https://zokrates.github.io/)
8. [snarkjs+powers of tau ceremonyでzk proofを作る](https://scrapbox.io/bitpickers/snarkjs+powers_of_tau_ceremony%E3%81%A7zk_proof%E3%82%92%E4%BD%9C%E3%82%8B)
