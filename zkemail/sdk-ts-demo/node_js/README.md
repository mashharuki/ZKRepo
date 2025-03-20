# Nodejs SDK デモ

- インストール

  ```bash
  bun install
  ```

- サンプルコードの実行

  ```bash
  bun run shortest-example
  ```

  ```bash
  generating remote proof
  generating proof inputs
  getting blueprint by id
  proof:  {
    pi_a: [ "21446609548353444748425196133337469392285745092410269319266763523631485684878",
      "17227447588532838594288259831625799101973033850418800892591978510169958981597",
      "1"
    ],
    pi_b: [
      [ "10637787312134598808721274713572136854456820249069007118479278755418386948053",
        "6153614966425838676129423517214919278407357487970147654771106923161810670231"
      ], [ "18772177789457955071535427048743156957495032323681488811378632570048787191878",
        "9434770582180162494587832580602326878745415361254903357800996559402325782772"
      ], [ "1", "0" ]
    ],
    pi_c: [ "17465049791352256290751865375973997210484993265396128661527288767711853353681",
      "8819270806593688966049591760345037886746846681930877535638269394998351152988",
      "1"
    ],
    protocol: "groth16",
  }
  public:  {
    subject: [ "Welcome ", "to the Succinct ZK Residency!" ],
  }
  ```

- long-running-proof

  ```bash
  bun run long-running-proof
  ```

  ```bash

  ```

- validate-inputs

  ```bash
  bun run validate-inputs
  ```

  ```bash
  parsing email no pub key
  parsed email
  email header:  Map(22) {
    "ARC-Seal": [ "i=1; a=rsa-sha256; t=1725570290; cv=none; d=google.com; s=arc-20160816; b=LdXMuzrUNuNI+nDJ2bE4y4i/UNkay6ACfqFs51rtQOgUxDIYAuGZhqPw/monlbxkoN NGihGo/EItYDoFyz2YenzxBQjpdSic9/g7qp6xz2O00PkGS43a1yOpd+ZVPlGaK5WZx1 LhKdW5Fk7Jx/xJtl5rKnhBgH1SaWkv2pECv5SGasqct9PROtQeg+MMv1kwGqxFBHZ8d9 4ZrRPsKrp04FiG8hbMLUEV5xd1qwsdmDSqHLvmjhX82mN/ohEM4p/laq1OGzqMnM9SuC 5vSNPUEx1wO49BEEqdQGVZ0qu8RQbAg6njk4bKUZoWSbDW1l/WU3Im+WbuCynOi8JMVw pP6w=="
    ],
    "Bcc": [ "adityabisht64@gmail.com" ],
    "X-Google-DKIM-Signature": [ "v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20230601; t=1725570289; x=1726175089; h=cc:subject:message-id:date:from:mime-version:x-gm-message-state :from:to:cc:subject:date:message-id:reply-to; bh=ZPnp2Ot4Oq1yml0gwfVCa+vOkRh/AoPZcUFDo94M5cA=; b=kSvDsE08OCPix+MrHQsGps+9FNVPep2YruDdHlAU9kN7KHlWYFEunPmEqxghhqMMqW vR2nT+a+FgXLidImEorIK+DEdoIIAEPJwHnuY7C4jsTgqktXSQvYBrNqGgl0e7oEgs3X X4OQdV/U9zQkXRF1MTBxy+OJMX1e9MQmm2Pv1FyfqWJA2x3wFo1dtmCocvjjJU7mzgl9 2t4ijcPtdZxsW8U9CRvwN3KzFPtdbT6c6uzUVNGhBmBSFi7HfGKbW3V2+uzRZIBAfoR9 4sqmGVYf5ycQAN2e5r2QwUT6oEca47vEB5IDMRadOM3caymamT2+SLR3sq5JrKm/2/j1 C3kQ=="
    ],
    "DKIM-Signature": [ "v=1; a=rsa-sha256; c=relaxed/relaxed; d=succinct.xyz; s=google; t=1725570289; x=1726175089; dara=google.com; h=cc:subject:message-id:date:from:mime-version:from:to:cc:subject :date:message-id:reply-to; bh=ZPnp2Ot4Oq1yml0gwfVCa+vOkRh/AoPZcUFDo94M5cA=; b=PbaIBUZod+MtWJh6mm0xQWE6KEJbub66abuVn6S+JQySDWT1c/wbaWs+Fe39s1svy3 GTiD7JdDSgJ0XOQxdeO6vTbyFLI8lFp5UknjFxhIi9TecwN/oBgCVQpjXaQ8hdIh5fA2 rZLURZB6/XnRnc1/I2DTrdegCDztjVty94pNZjKP1iRVCBQTfURoM4/r7ke1ez7P+qKG uhKrt0XlPsEIbgeViKZpzlcjgfsbwEN0syimGnt+ccfmBx5r5lU9wG7HfW2i+EMOgOiu +D4cX6uTOfYmBhCtH+HeErPenwgcQ0mTHxzcnAgPipVqTXA9VcQbgaCWB4hQtriMhYNU B0ZA=="
    ],
    "ARC-Message-Signature": [ "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816; h=cc:subject:message-id:date:from:mime-version:dkim-signature; bh=ZPnp2Ot4Oq1yml0gwfVCa+vOkRh/AoPZcUFDo94M5cA=; fh=rt5+XsSKgJXCbjLkZz2YEwXmYMAytcEAXMTatOTpOfs=; b=qVd1nk6MrHSij4tsjZ6Lr+Ymptz0OlsUw3AMcXtBlrNhD0U+HLQPSTScNrBaX0i3uX or7VZjCPegexDy+ovr56hI6M0878rRWyBvW8LRJVn2IsLmImIsePhDPYjU+8YGyHnJ9T DPz0QtdM6Tzu/WeyWeYsA+B/ab+lIfZ910dtUmOjokCSa2JxGgLaTD/x75L91FpG4KSb T+FumRRMXfEFx5I6uwMcHQmR1LE22Krkk9D/fs7WyqmNfSBL2eruURXcjOku3zjqK3Hs mnOqjSUXqEeJLvI+DTPcZ6xqywiq5Pq8I1sCyBi4EVprdq06eDlB7yz+L4ECLB97offc 4byg==; dara=google.com"
    ],
    "X-Gm-Message-State": [ "AOJu0YxZgyTji/ChYSYLy8R8e+cfUgPmc5ZnDATk5epwZp5EqaRpnZzP wXv1FS+cySFJJTaopk69+6+98CWXZ2JzXBqWFpLnGwLKkW6aEp7DwMSz2oXlDBdYXt+xWXULZ96 pL4fvwj3nWBaCvEQc1dHauElTv9Bqq4rH8EwEYg=="
    ],
    "MIME-Version": [ "1.0" ],
    "ARC-Authentication-Results": [ "i=1; mx.google.com; dkim=pass header.i=@succinct.xyz header.s=google header.b=PbaIBUZo; spf=pass (google.com: domain of leland@succinct.xyz designates 209.85.220.41 as permitted sender) smtp.mailfrom=leland@succinct.xyz; dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=succinct.xyz; dara=pass header.i=@gmail.com"
    ],
    "Return-Path": [ "<leland@succinct.xyz>" ],
    "Authentication-Results": [ "mx.google.com; dkim=pass header.i=@succinct.xyz header.s=google header.b=PbaIBUZo; spf=pass (google.com: domain of leland@succinct.xyz designates 209.85.220.41 as permitted sender) smtp.mailfrom=leland@succinct.xyz; dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=succinct.xyz; dara=pass header.i=@gmail.com"
    ],
    "Received-SPF": [ "pass (google.com: domain of leland@succinct.xyz designates 209.85.220.41 as permitted sender) client-ip=209.85.220.41;"
    ],
    "Delivered-To": [ "adityabisht64@gmail.com" ],
    "Received": [ "by 2002:a05:6504:1313:b0:279:6670:9162 with SMTP id s19csp1104512lto; Thu, 5 Sep 2024 14:04:50 -0700 (PDT)",
      "from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41]) by mx.google.com with SMTPS id 586e51a60fabf-277c34333casor4311308fac.9.2024.09.05.14.04.49 for <adityabisht64@gmail.com> (Google Transport Security); Thu, 05 Sep 2024 14:04:50 -0700 (PDT)"
    ],
    "X-Google-Smtp-Source": [ "AGHT+IH76QMWC15Dg/+ThxNbcE5CDLb7cpojHoNsy/oAHrJx5dOAKtaNl1myXNjuD8Du2en5yyVL"
    ],
    "From": [ "Leland Lee <leland@succinct.xyz>" ],
    "Message-ID": [ "<CAPPv_w=DjyLg38_-aUvy7Lk-KP-YUaJROWForsmR6iaAgZCUVw@mail.gmail.com>"
    ],
    "X-Forwarded-Encrypted": [ "i=2; AJvYcCXmuTgC70UQT5Ts4OfBGnVnadr0JW74IPaiOJ5gDpOACNVP8eAJFJP4SA3ch7rvoG+htp/hPClBdbQKTZEu@gmail.com",
      "i=1; AJvYcCXxd8p4U8kra+dRtLXrArCb0RI+tf/okMTeOygvHmONJnKDrNbiVCZPinPL4j7RNT8h7+HhiwSoWhuKI1Mb@gmail.com"
    ],
    "Content-Type": [ "multipart/alternative; boundary=\"000000000000263095062165a40c\""
    ],
    "Subject": [ "Welcome to the Succinct ZK Residency!" ],
    "Cc": [ "Uma Roy <uma@succinct.xyz>, Eli Yang <eli@succinct.xyz>"
    ],
    "X-Received": [ "by 2002:a05:6870:63a9:b0:261:19a6:41ae with SMTP id 586e51a60fabf-27b82fab31bmr675802fac.30.1725570290222; Thu, 05 Sep 2024 14:04:50 -0700 (PDT)",
      "by 2002:a05:6870:af47:b0:278:8b:57b1 with SMTP id 586e51a60fabf-27b82fab4a7mt675702fac.35.1725570289543; Thu, 05 Sep 2024 14:04:49 -0700 (PDT)"
    ],
    "Date": [ "Thu, 5 Sep 2024 14:04:38 -0700" ],
  }
  outputs from 'Succinct ZK Residency Invite' blueprint: [
    [ "to the Succinct ZK Residency!" ]
  ]
  ```
