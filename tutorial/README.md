# チュートリアルで作成したプログラムの動かし方メモ

### npm モジュールのインストール

```bash
yarn
```

### Circom ライブラリのインストール

```bash
yarn add circomlib
```

### snark.js のライブラリのインストール

```bash
yarn add snarkjs
```

### circom ファイルのコンパイル

```bash
circom circuit/sample.circom --wasm --r1cs -o ./build
```

実行結果

```Bash
template instances: 71
non-linear constraints: 213
linear constraints: 0
public inputs: 0
public outputs: 1
private inputs: 1
private outputs: 0
wires: 215
labels: 583
Written successfully: ./build/sample.r1cs
Written successfully: ./build/sample_js/sample.wasm
Everything went okay, circom safe
```

### 事前に生成されている Proof key をインストールするコマンド

```bash
wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau
```

### proving key (zkey file)を生成するコマンド

```bash
npx snarkjs groth16 setup build/sample.r1cs powersOfTau28_hez_final_12.ptau zkey/circuit_0000.zkey
```

実行結果

```Bash
[INFO]  snarkJS: Reading r1cs
[INFO]  snarkJS: Reading tauG1
[INFO]  snarkJS: Reading tauG2
[INFO]  snarkJS: Reading alphatauG1
[INFO]  snarkJS: Reading betatauG1
[INFO]  snarkJS: Circuit hash:
                447c71f4 6a1f8964 e230c70f 8afc8875
                f72453a6 3201a3c3 f1d649f5 197b2400
                9d01f706 d0092ad7 98a8a339 79483ee9
                43bd0461 1bd32a72 a999f2e9 ecb4b9e6
```

### proof を生成するコマンド

```bash
yarn generate:proof
```

実行結果

```bash
publicSignals: [
  '17853941289740592551682164141790101668489478619664963356488634739728685875777'
]
proof: {
  pi_a: [
    '2415351152852379919615342997114069376042677714037526607767869431263852578066',
    '17733325517053168898859860228363988498149318531435728714070934499605404523862',
    '1'
  ],
  pi_b: [
    [
      '1314477169175922509102444135102384293476010129730915826566134110882030472363',
      '17761067531607951568621203437277480338808811193047749502821725898664702720107'
    ],
    [
      '14389080135932802854489161826256763832823709072151794495302109123479412116887',
      '12409580169538210421907974433675902006084984978579447826940070000706333248181'
    ],
    [ '1', '0' ]
  ],
  pi_c: [
    '13710667931995203578201314437592979732032047808901485097607288354964398146565',
    '20928307050138957557576119456294352568094936001946212909957984388504339823276',
    '1'
  ],
  protocol: 'groth16',
  curve: 'bn128'
}
```

### verificationkey を生成するためのコマンド

`verificationkey`フォルダ配下に`verification_key.json`ファイルが生成される。

```bash
npx snarkjs zkey export verificationkey zkey/circuit_0000.zkey verificationkey/verification_key.json
```

実行結果

```bash
[INFO]  snarkJS: EXPORT VERIFICATION KEY STARTED
[INFO]  snarkJS: > Detected protocol: groth16
[INFO]  snarkJS: EXPORT VERIFICATION KEY FINISHED
```

### proof を検証するためのコマンド

```bash
yarn verify:proof
```

実行結果

```bash
Verification OK
✨  Done in 0.58s.
```
