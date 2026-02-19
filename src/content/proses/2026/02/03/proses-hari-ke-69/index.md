---
title: "Proses Hari ke 69"
date: "2026-02-19 16:00"
category: "proses"
tags: []
description: "Storage Factory & Import."
draft: false
---

![wanwan-onlinepetclub](./wanwan-onlinepetclub.gif?width=500&align=center)

## StorageFactory

StorageFactory adalah suatu cara untuk mendeploy contract lain dengan sebuah contract. Sebagaimana sebuah Factory / Pabrik yang bisa memproduksi barang lain.

## Import

Import merupakan metode untuk mengambil contract yang lain dengan cara import. Ini mempermudah saat proses penggabungan contract dibandingkan untuk menginisiasi semua contract didalam sebuah file. 

## Mengerjakan Soal

## Storage Factory Introduction

🧑‍💻 Test yourself

1. 📕 What is the primary role of the StorageFactory contract?

2. 📕 Why is it important to specify the index when calling the sfStore function?

### 1. What is the primary role of the StorageFactory contract?

Fungsi utama dari StorageFactory sebagai sebuah pabrik adalah untuk memproduksi contract lain. Dalam hal ini, StorageFactory digunakan untuk memproduksi contract SimpleStorage.

### 2. Why is it important to specify the index when calling the sfStore function?

Karena StorageFactory mengatur beberapa dari SimpleStorage kontrak yang disimpan dalam array. Karena itu sfStore berfungsi mengambil contract bedasarkan index. Index berfungsi menindentifikasi secara spesikfik untuk contract mana yang akan diakses.

## Setting Up The Project

🧑‍💻 Test yourself

1. 📕 What does _composability_ mean?

2. 📕 How many contracts is possible to deploy inside one .sol file?

### 1. What does _composability_ mean?

Composability adalah kemampuan contract untuk berinterakasi satu sama lain, tanpa perlu izin. Ini seperti lego, dimana kita bisa menggabungkan beberapa contract menjadi satu contract yang lebih besar.

### 2. How many contracts is possible to deploy inside one .sol file?

Tidak ada batasan khusus, berapa jumlah contact yang ingin dibuat dalam satu .sol. Namun, sebaiknya untuk membuat satu contract dengan satu file agar tidak membingungkan.

## Deploying a Contract From a Contract

🧑‍💻 Test yourself

1. 📕 What does the new keyword tell to the compiler?

2. 🧑‍💻 Create a contract AnimalFactory that includes a function createAnimals. This function must be capable of deploying the other 2 contracts Cows and Birds, which are simple contracts with just a constructor method.

### 1. What does the new keyword tell to the compiler?

Keyword new digunakan untuk melakukan deploy contract baru. 

Contohnya:

```solidity
simpleStorage = new SimpleStorage();
```
Deploy contract SimpleStorage baru dan simpan address-nya ke variable simpleStorage.

### 2. Create a contract AnimalFactory that includes a function createAnimals. This function must be capable of deploying the other 2 contracts Cows and Birds, which are simple contracts with just a constructor method.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Cows {
    string public sound;

    constructor() {
        sound = "Moo";
    }
}

contract Birds {
    string public sound;

    constructor() {
        sound = "Chirp";
    }
}

contract AnimalFactory {

    Cows public cows;
    Birds public birds;

    function createAnimals() public {
        cows = new Cows();
        birds = new Birds();
    }
}
```

## Solidity Imports

🧑‍💻 Test yourself

1. 📕 What's a named import and what are the advantages of using it?

2. 📕 In which way the pragma keyword can cause issues while using the import statement? Make 2 examples.

### 1. What's a named import and what are the advantages of using it?

Named import adalah cara untuk mengimpor contract dari file lain dengan menggunakan keyword import. Ini mempermudah saat proses penggabungan contract dibandingkan untuk menginisiasi semua contract didalam sebuah file.

Contohnya:

```solidity
import { SimpleStorage } from "./SimpleStorage.sol";
```

### 2. In which way the pragma keyword can cause issues while using the import statement? Make 2 examples.

Pragma dapat menyebabkan masalah saat menggunakan import statement karena pragma menentukan versi compiler yang akan digunakan. Jika versi compiler yang digunakan tidak sesuai dengan versi compiler yang digunakan pada file yang diimpor, maka akan terjadi error.

Contoh: 

Versi Tidak Cocok

SimpleStorage.sol

```solidity
pragma solidity ^0.7.0;
```

StorageFactory.sol

```solidity
pragma solidity ^0.8.18;
import "./SimpleStorage.sol";
```

Masalah:

Compiler 0.8.x tidak bisa meng-compile file yang spesifik untuk 0.7.x dan akan muncul compilation error.


Range Version Tidak Overlap.

SimpleStorage.sol

```solidity
pragma solidity >=0.6.0 <0.7.0;
```

StorageFactory.sol

```solidity
pragma solidity ^0.8.0;
```

File pertama hanya bisa dikompilasi dengan versi &lt;0.7.0. Sedangkan File kedua membutuhkan &gt;=0.8.0. Sehingga tidak ada versi compiler yang bisa memenuhi keduanya dan menyebabkan compilation gagal.

## Use AI to Help pt.1

🧑‍💻 Test yourself 

1. 📕 Review the first section of this Solidity course again. Identify three concepts that seem unclear and ask the AI to explain them to you.

### 1. Review the first section of this Solidity course again. Identify three concepts that seem unclear and ask the AI to explain them to you.

1️. Concept: uint256 dan Default Value

Kenapa ini sering membingungkan?

Kenapa selalu pakai uint256?

Kenapa bukan uint8?

Apa default value kalau tidak di-set?

Contoh Prompt:

Hi, I’m confused about uint256 in Solidity.

```solidity
uint256 public favoriteNumber;
```

1. Why do we usually use uint256 instead of smaller uint types?
2. What is the default value of this variable if we never assign it?
3. Does using smaller uint types save gas?

```
Here is my full contract:

```solidity
// paste full contract here
```


2️. Concept: memory vs storage

Kenapa ini membingungkan?

Kenapa string butuh memory?

Kenapa struct kadang pakai storage?

Apa perbedaan nyata di EVM?

Contoh Prompt:


Hi, I don't understand the difference between memory and storage in this function:

```solidity
function addPerson(string memory _name, uint256 _favoriteNumber) public {
    people.push(Person(_name, _favoriteNumber));
}
```

Why does string require the memory keyword?
What would happen if we used storage instead?
How does this relate to blockchain storage and gas costs?

Here is my full contract:
```solidity
// paste full contract here
```


3️. Concept: mapping

Kenapa ini membingungkan?

Kenapa tidak bisa di-loop?

Kenapa tidak punya length?

Bagaimana sebenarnya data disimpan?

Contoh Prompt:

Hi, I’m confused about how mapping works in Solidity.

```solidity
mapping(string => uint256) public nameToFavoriteNumber;
```

1. Why can't we loop through a mapping?
2. Does mapping store data differently than arrays?
3. Where is the data actually stored in the EVM?

Here is my full contract:

```solidity
// paste full contract here
```