---
title: "Proses Hari ke 73"
date: "2026-02-23 19:05"
category: "proses"
tags: []
description: "Importing Libaries, Price Data From Chainlink."
draft: false
---

![log-shock](./log-shock.gif?width=500&align=center)

## Importing Libaries From NPM and Github

🧑‍💻 Test yourself

1. 📕 What is this statement @chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol translated into when interpreted by the solidity compiler?

### 1. What is this statement @chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol translated into when interpreted by the solidity compiler?

```
@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol
```

akan diterjemahkan oleh Solidity (melalui Remix / Hardhat / Foundry) menjadi:

Path file di dalam package NPM yang sudah terinstall di folder `node_modules`.

Secara teknis, itu berarti:

```
node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol
```

## Getting Real World Price Data From Chainlink

🧑‍💻 Test yourself

1. 📕 Why we need to multiply the latest ETH price by 1e10?

2. 📕 What's the result of the typecasting uint256(-2)?

3. 🧑‍💻 Create a contract with a getLatestBTCPriceInETH() function that retrieves the latest BTC price in ETH.

### 1. Why we need to multiply the latest ETH price by 1e10?

Karena terdapat perbedaan antara msg.value dan data dari chainlink.

msg.value menggunakan tipe data uint256 dengan 18 decimals

Chainlink price feed (answer) menggunakan tipe data int256 dengan 8 decimals (untuk pasangan harga seperti ETH/USD)

### 2. What's the result of the typecasting uint256(-2)?

Solidity menggunakan representasi two’s complement untuk bilangan bertanda (int).

Jika melakukan typecasting uint256(-2), maka kita sebenarnya mengubah interpretasi biner dari -2 menjadi unsigned integer.

Dalam sistem int256, nilai -2 secara biner sama dengan:

2^256 - 2

Sehingga hasil akhirnya menjadi:

115792089237316195423570985008687907853269984665640564039457584007913129639934

Inilah alasan mengapa typecasting dari int ke uint bisa berbahaya jika tidak hati-hati.

### 3. Create a contract with a getLatestBTCPriceInETH() function that retrieves the latest BTC price in ETH.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

```solidity
import {AggregatorV3Interface} 
from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerBTC {

    AggregatorV3Interface internal btcEthPriceFeed =
        AggregatorV3Interface(
            0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22
        );

    function getLatestBTCPriceInETH() public view returns (uint256) {
        (, int answer,,,) = btcEthPriceFeed.latestRoundData();

        require(answer > 0, "Harga tidak valid");

        return uint256(answer);
    }
}
```