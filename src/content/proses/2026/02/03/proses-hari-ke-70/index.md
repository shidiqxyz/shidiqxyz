---
title: "Proses Hari ke 70"
date: "2026-02-20 19:16"
category: "proses"
tags: []
description: "ABI & Inheritance"
draft: false
---

![glooomiz-vtuber](./glooomiz-vtuber.gif?width=500&align=center)

## ABI Contract

ABI adalah singkatan dari Application Binary Interface.

## Inheritance

Di solidity, ada juga konsep Inheritance atau pewarisan. Dimana contract bisa mewarisi contract lain. Ini mempermudah saat proses penggabungan contract dibandingkan untuk menginisiasi semua contract didalam sebuah file.

## Mengerjakan Soal


## Interacting With Contracts ABI

🧑‍💻 Test yourself

1. 📕 What do you need to interact with an external contract?

2. 🧑‍💻 Deploy 3 instances of the SimpleStorage contract through the StorageFactory. Then store some numbers via sfStore and retrieve all of them via sfGet.


### 1. What do you need to interact with an external contract?

ABI dan contract Address.

### 2. Deploy 3 instances of the SimpleStorage contract through the StorageFactory. Then store some numbers via sfStore and retrieve all of them via sfGet.

[Deployed Contract](https://sepolia.etherscan.io/address/0xbfe33dab54a41c05f624ea70182a19790e43fd06)

## Inheritance in Solidity

🧑‍💻 Test yourself

1. 📕 Why do we need inheritance to extend a contract's functionality?

2. 📕 How are the keywords override and virtual used together?

3. 🧑‍💻 Create a contract Squared that overrides the store function and returns the favorite number squared.

### 1. Why do we need inheritance to extend a contract's functionality?

Agar bisa menggunakan kembali kode (reuse), menghindari duplikasi, membuat kontrak modular dan lain sebagainya.

### 2. How are the keywords override and virtual used together?

Keyword virtual digunakan untuk menandai sebuah function agar bisa di-override oleh contract lain. Keyword override digunakan untuk menandai sebuah function agar bisa di-override oleh contract lain.

Virtual ditempatkan pada parent function sedangkan override ditempatkan pada child function.

### 3. Create a contract Squared that overrides the store function and returns the favorite number squared.

SimpleStorage.sol

```solidity
function store(uint256 favNumber) public virtual {
    favoriteNumber = favNumber;
}
```

Squared.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {SimpleStorage} from "./SimpleStorage.sol";

contract Squared is SimpleStorage {

    function store(uint256 _newFavNumber) public override {
        favoriteNumber = _newFavNumber * _newFavNumber;
    }
}
```