# ZK コアプロセッサ AXIOM の概要

Axiom を使用することで、開発者はイーサリアムから過去のデータにシームレスにアクセスし、ゼロ知識証明（ZK）によって信頼性と検証性の高いオンチェーン結果を得ることができます。この画期的な技術は、最先端のデータリッチ・アプリケーションの開発に新たな可能性を開きます。Axiom の計り知れない可能性は、トラストレス・アカウンティング、ダイナミック DeFi、オフチェーン・ガバナンス、オンチェーン・オラクルなどの分野で特に顕著です。重要なことは、Axiom は信頼という重要な要素を損なうことなく、これらすべてを実現するということです。

読み取る： Axiom は ZK プルーフを使用して、過去のイーサリアムブロックのブロックヘッダー、ステート、トランザクション、レシートから信頼できる読み取りを行います。 すべてのイーサリアムのオンチェーンデータはこれらの形式のいずれかでエンコードされており、Axiom はアーカイブノードがアクセスできるものすべてにアクセスできることを意味します。

計算： データが取り込まれると、Axiom は検証済みの計算を適用します。開発者は Javascript で独自の計算を指定でき、各計算の妥当性は ZK 証明で検証される。 クイックスタートで利用可能な計算プリミティブを試してみてください。

検証する Axiom は各クエリ結果に、(1)入力データがチェーンから正しくフェッチされたこと、(2)計算が正しく適用されたことを証明する ZK 証明を添付します。この ZK 証明は Axiom スマートコントラクトのオンチェーンで検証され、最終結果はスマートコントラクトで信頼なく使用できるようになります。

ZK 証明によって検証されるため、Axiom の結果はイーサリアムと暗号学的に同等の安全性を持ち、暗号経済学、インセンティブ、ゲーム理論に関する仮定はありません。私たちは、これがスマート・コントラクト・アプリケーションに可能な限り高い保証を提供すると信じています。

# クイックスタート動かし方

インストール

```bash
yarn
forge install
```

# サンプルアプリ動かし方