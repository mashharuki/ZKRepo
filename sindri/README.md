# Sindri

ゼロ知識証明用のプラットフォーム

## cli のインストール

```bash
npm install -g sindri@latest
```

```bash
sindri --version
```

```bash
0.0.1-alpha.18
```

## CLI による操作

ログイン

```bash
sindri login
```

```bash
[21:49:46.365] INFO: You have successfully authorized the client with your Sindri account.
```

以上のようになれば API Key が生成されているので完了！！

## テンプレプロジェクト生成

```bash
sindri init my-circuit
```

以下のようにオプションを選択してサーキット用のテンプレプロジェクトを生成する

```bash
? Circuit Name: my-circuit
? Proving Framework: Circom
? Proving Scheme: Groth16
? Curve Name: BN254
? Witness Compiler: Wasm
[21:51:10.038] INFO: Proceeding to generate scaffolded project in "/Users/harukikondo/git/ZKRepo/sindri/pkgs/my-circuit".
[21:51:10.061] INFO: Project scaffolding successful.
[21:51:10.263] INFO: Installing circomlib.
```

lint する方法

```bash
pnpm my-circuit run lint
```

```
[21:53:40.207] INFO: Sindri manifest file "/Users/harukikondo/git/ZKRepo/sindri/pkgs/my-circuit/sindri.json" is valid.
[21:53:40.209] INFO: No issues found, good job!
```

デプロイする方法

```bash
pnpm my-circuit run deploy
```

```bash
[21:55:41.754] INFO: Creating "my-circuit.tar.gz" package with 149 files.
[21:55:41.861] INFO: Circuit compilation initiated.
[21:56:05.386] INFO: Circuit compiled successfully after 20.8 seconds.
```

VerificationKey がダウンロードできるようになるはずなのでそれをダウンロードしてくる。

以下のサンプルスクリプトを実行する

```bash
pnpm my-circuit run sample
```

サーキットの proof が生成される。

```json
{
  "proof_id": "4b5b8ba6-cd3e-43ef-affc-19feb6b43597",
  "circuit_name": "my-circuit",
  "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
  "circuit_type": "circom",
  "date_created": "2024-01-30T13:23:26.015Z",
  "perform_verify": false,
  "status": "Queued",
  "team": "mashharuki",
  "compute_time": null,
  "compute_time_sec": null,
  "compute_times": null,
  "file_size": null,
  "proof_input": null,
  "proof": null,
  "public": null,
  "verification_key": null,
  "error": null
}
```

proof の履歴一覧を取得することも可能。

```json
[
  {
    "proof_id": "4b5b8ba6-cd3e-43ef-affc-19feb6b43597",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:23:26.015Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M01.092642S",
    "compute_time_sec": 1.092642,
    "compute_times": {
      "prove": 0.8700991179794073,
      "total": 1.163666986161843,
      "queued": 0.658535,
      "clean_up": 0.0002611300442367792,
      "file_setup": 0.23963442305102944,
      "save_results": 0.0027229071129113436,
      "generate_witness_wasm": 0.050592328887432814
    },
    "file_size": 713,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "2ceea8e2-5d5a-4893-b25a-df33628ec01e",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:21:49.318Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M05.805355S",
    "compute_time_sec": 5.805355,
    "compute_times": {
      "prove": 5.579713591840118,
      "total": 5.8724410210270435,
      "queued": 0.608041,
      "clean_up": 0.0002532999496906996,
      "file_setup": 0.22551946202293038,
      "save_results": 0.002145047066733241,
      "generate_witness_wasm": 0.06446498003788292
    },
    "file_size": 717,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "7bacaa35-ced9-4aa4-9ec7-bc81629c671c",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:21:11.546Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M02.747942S",
    "compute_time_sec": 2.747942,
    "compute_times": {
      "prove": 2.505466395057738,
      "total": 2.8258189240004867,
      "queued": 0.640492,
      "clean_up": 0.0002464300487190485,
      "file_setup": 0.25506849214434624,
      "save_results": 0.0026088960003107786,
      "generate_witness_wasm": 0.06206984189338982
    },
    "file_size": 716,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "f649ad3b-1101-4b9c-8461-1d91b32bcfe7",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:20:31.580Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M02.037980S",
    "compute_time_sec": 2.03798,
    "compute_times": {
      "prove": 1.8207441098056734,
      "total": 2.105610170168802,
      "queued": 0.621361,
      "clean_up": 0.00024378905072808266,
      "file_setup": 0.22451612702570856,
      "save_results": 0.002090538153424859,
      "generate_witness_wasm": 0.057717627147212625
    },
    "file_size": 715,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "771c1290-df08-4250-97ee-b3828ac3de6c",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:20:02.919Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M06.040379S",
    "compute_time_sec": 6.040379,
    "compute_times": {
      "prove": 5.582801091950387,
      "total": 6.109033162007108,
      "queued": 0.631647,
      "clean_up": 0.0005090490449219942,
      "file_setup": 0.4763227629009634,
      "save_results": 0.0022553580347448587,
      "generate_witness_wasm": 0.0467560701072216
    },
    "file_size": 718,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "7c2ab4c5-9606-4bb2-baa8-f439735c17b2",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:19:27.785Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M05.624892S",
    "compute_time_sec": 5.624892,
    "compute_times": {
      "prove": 5.400534400017932,
      "total": 5.692696723854169,
      "queued": 0.658117,
      "clean_up": 0.00033744005486369133,
      "file_setup": 0.2404612498357892,
      "save_results": 0.0022206769790500402,
      "generate_witness_wasm": 0.0488494869787246
    },
    "file_size": 716,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "b248f1bc-2e84-4d10-942c-9c967fe88c9f",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:18:51.645Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M02.301976S",
    "compute_time_sec": 2.301976,
    "compute_times": {
      "prove": 2.0849229858722538,
      "total": 2.3767878159414977,
      "queued": 0.589939,
      "clean_up": 0.00037211901508271694,
      "file_setup": 0.23902411898598075,
      "save_results": 0.00307233608327806,
      "generate_witness_wasm": 0.04903084598481655
    },
    "file_size": 715,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  },
  {
    "proof_id": "3572737c-3eea-4e77-8bf5-4539a0b18d09",
    "circuit_name": "my-circuit",
    "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
    "circuit_type": "circom",
    "date_created": "2024-01-30T13:14:48.947Z",
    "perform_verify": false,
    "status": "Ready",
    "team": "mashharuki",
    "compute_time": "P0DT00H00M02.126351S",
    "compute_time_sec": 2.126351,
    "compute_times": {
      "prove": 1.3853632181417197,
      "total": 2.1951819458045065,
      "queued": 17.686914,
      "clean_up": 0.0003277398645877838,
      "file_setup": 0.23528477107174695,
      "save_results": 0.008490110980346799,
      "generate_witness_wasm": 0.5651750368997455
    },
    "file_size": 713,
    "proof_input": null,
    "proof": null,
    "public": null,
    "verification_key": null,
    "error": null
  }
]
```

circuit detail を取得する API で VerficationKey も作成できる。

```json

```

proof detail を取得する API で proof も生成できる。

```json
{
  "proof_id": "3572737c-3eea-4e77-8bf5-4539a0b18d09",
  "circuit_name": "my-circuit",
  "circuit_id": "eaa4a662-5356-4012-a3c9-ed9b8e4e025d",
  "circuit_type": "circom",
  "date_created": "2024-01-30T13:14:48.947Z",
  "perform_verify": false,
  "status": "Ready",
  "team": "mashharuki",
  "compute_time": "P0DT00H00M02.126351S",
  "compute_time_sec": 2.126351,
  "compute_times": {
    "prove": 1.3853632181417197,
    "total": 2.1951819458045065,
    "queued": 17.686914,
    "clean_up": 0.0003277398645877838,
    "file_setup": 0.23528477107174695,
    "save_results": 0.008490110980346799,
    "generate_witness_wasm": 0.5651750368997455
  },
  "file_size": 713,
  "proof_input": {
    "X": 1,
    "Y": 1
  },
  "proof": {
    "pi_a": [
      "2244495502244209298302498534534862423971865010191943556512220496567203496424",
      "1283205753705318247626607489273426739287695064608502636893325427265586402765",
      "1"
    ],
    "pi_b": [
      [
        "6061864524880875793008220687423999461534575060380852073052777235896540938244",
        "16310958648034950700848971605760798366735344478613067133657238559828605069669"
      ],
      [
        "525109809125747520180481545735863648836335656849968939006317035353294770893",
        "5586327684781124487498476884443266136712132711321186533395092597209545626060"
      ],
      ["1", "0"]
    ],
    "pi_c": [
      "7011016949208963463868892181598782387618956092744293605224822440099801629654",
      "20841789930711426165410759940143617385713849884065860541292159209398697257587",
      "1"
    ],
    "protocol": "groth16"
  },
  "public": ["1", "1"],
  "verification_key": {
    "protocol": "groth16",
    "curve": "bn128",
    "nPublic": 2,
    "vk_alpha_1": [
      "20491192805390485299153009773594534940189261866228447918068658471970481763042",
      "9383485363053290200918347156157836566562967994039712273449902621266178545958",
      "1"
    ],
    "vk_beta_2": [
      [
        "6375614351688725206403948262868962793625744043794305715222011528459656738731",
        "4252822878758300859123897981450591353533073413197771768651442665752259397132"
      ],
      [
        "10505242626370262277552901082094356697409835680220590971873171140371331206856",
        "21847035105528745403288232691147584728191162732299865338377159692350059136679"
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
        "10857046999023057135944570762232829481370756359578518086990519993285655852781",
        "11559732032986387107991004021392285783925812861821192530917403151452391805634"
      ],
      [
        "8495653923123431417604973247489272438418190587263600148770280649306958101930",
        "4082367875863433681332203403145435568316851327593401208105741076214120093531"
      ],
      ["1", "0"]
    ],
    "vk_alphabeta_12": [
      [
        [
          "2029413683389138792403550203267699914886160938906632433982220835551125967885",
          "21072700047562757817161031222997517981543347628379360635925549008442030252106"
        ],
        [
          "5940354580057074848093997050200682056184807770593307860589430076672439820312",
          "12156638873931618554171829126792193045421052652279363021382169897324752428276"
        ],
        [
          "7898200236362823042373859371574133993780991612861777490112507062703164551277",
          "7074218545237549455313236346927434013100842096812539264420499035217050630853"
        ]
      ],
      [
        [
          "7077479683546002997211712695946002074877511277312570035766170199895071832130",
          "10093483419865920389913245021038182291233451549023025229112148274109565435465"
        ],
        [
          "4595479056700221319381530156280926371456704509942304414423590385166031118820",
          "19831328484489333784475432780421641293929726139240675179672856274388269393268"
        ],
        [
          "11934129596455521040620786944827826205713621633706285934057045369193958244500",
          "8037395052364110730298837004334506829870972346962140206007064471173334027475"
        ]
      ]
    ],
    "IC": [
      [
        "8730022663636478395875193122617326879937238221063249151534446790148472013425",
        "11334276671345291957926027542189078543582133290479552018335938047376153562309",
        "1"
      ],
      [
        "5805122324364949964217197833749490235941814633922129721750683970607503958245",
        "9872725283256828335323531825525214004638956944986769896909638442373636094929",
        "1"
      ],
      [
        "5965984761837059522598477963926636008539398000326611706501700041118398309075",
        "987034796951392775354586470684197458011430956168601634143158925917302107696",
        "1"
      ]
    ]
  },
  "error": null
}
```

Snarkjs と組み合わせて簡単に検証もできる！！

```bash
Proving circuit...
inputData: {"X":1,"Y":1}
proveResponse: null
Poll exited after 1 seconds with status: Ready
Circuit proofDetailResponse: [object Object]
Circuit proof output signal: 1
verifying my-circuit....
Verification OK
```
