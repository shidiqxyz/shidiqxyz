---
title: "Proses Hari ke 92"
date: "2026-03-14 15:15"
category: "proses"
tags: []
description: ""
draft: false
---

![anime](./anime.gif?width=600&a=center)

Masih melanjutkan FundMe di Foundry.

Sekarang membahas mengenai `--fork-url`. Yaitu untuk melakukan fork blockchain. Sehingga kita bisa mendapatkan data dari blockchain tersebut.

Dengan contoh kasusu seperti ini, di fundMe kita ingin melakukan test versi dari `AggregatorV3Interface`. Namun `AggregatorV3Interface` ini berada di sepolia. Sehingga kita perlu melakukan fork dari sepolia.

Maka kita bisa menggunakan command berikut:

```bash
forge test --mt <nama_contract> --fork-url <rpc_url>
```

Dilanjutkan membahas mengenai `forge coverage`. Yaitu untuk melihat coverage dari test yang sudah dibuat.

```bash
forge coverage --fork-url <rpc_url>
```

Dan melakukan refactor dari test yang sudah dibuat. Dalam kasus ini, address dari `AggregatorV3Interface` ditulis secara hardcode. Sehingga perlu diubah menjadi modular.

Selain itu juga membuat mock dari `AggregatorV3Interface`.