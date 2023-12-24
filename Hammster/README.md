# Hammster

## アプリの概要

Halo2を使ったゼロ知識証明アプリです。

Hammsterというハミング距離のウェブ・アプリを作ることにしよう。つの同じ長さの文字列のハミング距離は、記号が異なる場所の数である。私たちのアプリは2つの8長のバイナリ入力を受け取り、それらのハミング距離を計算し、ウェブアプリの別の部分で検証できるZK証明を出力する。

## Chipsの中身

次に、チップ・コンフィギュレーションを構築する必要がある。ここでは、同様に定義したセレクタでオンになる様々なタイプのゲートを作成する。作成した各ゲートについて、output vec! にはそのゲートを制約する多項式が含まれる。

Rotation::cur()は現在のセルであり、Rotation::prev()とRotation::next()はそれぞれ前の行と次の行の現在の列にあるセルを指す。

この例の各ゲートに対して、必要な制約は1つだけです。vec!の内部では、セレクタがゼロでない場合、それが乗算するものはゼロに等しくなければならない。例えば、vec![s_accumulator * (inputs_sum - sum)]の場合、s_accumulatorが有効（1に設定）であれば、inputs_sum - sum = 0という制約があります。

## テスト実行結果

```bash
Compiling circuits v0.1.0 (/Users/harukikondo/git/ZKRepo/Hammster/pkgs/circuits)
Finished dev [unoptimized + debuginfo] target(s) in 6.94s
  Running `target/debug/circuits`
MockProver OK
Generating proof...
Verifying proof...
Verify result: Ok(())
```