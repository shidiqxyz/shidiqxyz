---
title: "Proses Hari ke 75"
date: "2026-02-25 18:46"
category: "proses"
tags: []
description: "Make own libraries."
draft: false
---

![gintoki-no-sleep](./gintoki-no-sleep.gif?width=500&align=center)

## Creating Your Own Libraries

🧑‍💻 Test yourself

1. 📕 What are the differences between Solidity _libraries_ and _contracts_?
2. 📕 What are the consequences if a library function is not marked as `internal`?
3. 🧑‍💻 Create a simple library called `MathLibrary` that contains a function `sum` to add two `uint256` numbers. Then create a function `calculateSum` inside the `fundMe` contract that uses the `MathLibrary` function.

### 1. What are the differences between Solidity _libraries_ and _contracts_?

| Library                                               | Contract                                        |
| ----------------------------------------------------- | ----------------------------------------------- |
| Tidak bisa menyimpan **state variable**             | Bisa menyimpan state variable                 |
| Tidak bisa menerima ETH                             | Bisa menerima ETH                             |
| Biasanya digunakan untuk **utility / reusable logic** | Digunakan untuk menyimpan logika utama aplikasi |
| Function biasanya `internal`                          | Function bisa `public`, `external`, dll         |
| Bisa ditempel ke tipe data dengan `using for`         | Tidak bisa memperluas tipe data                 |


### 2. What are the consequences if a library function is not marked as `internal`?

Jika library function tidak ditandai sebagai internal, maka library tidak akan di-embed langsung ke dalam contract saat proses kompilasi. Library tersebut harus di-deploy secara terpisah dan contract utama harus melakukan linking ke alamat library. Hal ini membuat proses deployment lebih kompleks dan eksekusi function dilakukan melalui external call (delegatecall), bukan embedded code.

### 3. Create a simple library called `MathLibrary` that contains a function `sum` to add two `uint256` numbers. Then create a function `calculateSum` inside the `fundMe` contract that uses the `MathLibrary` function.

`MathLibrary.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

library MathLibrary {
    function sum(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }
}
```

`FundMe.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {MathLibrary} from "./MathLibrary.sol";

contract FundMe {
    using MathLibrary for uint256;

    function calculateSum(uint256 a, uint256 b) public pure returns (uint256) {
        return MathLibrary.sum(a, b);
    }
}
```