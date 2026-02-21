---
title: "Proses Hari ke 71"
date: "2026-02-21 13:58"
category: "proses"
tags: []
description: "FundMe, Payable, Require, Reverts."
draft: false
---

![nyaruru-fishy-fight](./nyaruru-fishy-fight-nyaruru.gif?width=500&align=center)

## FundMe

Pada section ini saya belajar mengenai bagaimana cara membuat smart contract yang bisa menerima ETH.

## Payable dan Require

Payable adalah keyword yang digunakan untuk menandai sebuah function agar bisa menerima ETH.

Require adalah statement yang digunakan untuk mengecek kondisi tertentu. Jika kondisi tersebut tidak terpenuhi, maka function akan di-revert.

## Reverts

Reverts digunakan untuk melindungi kontrak seperti contoh sebelumnya, jika kondisi tidak terpenuhi, maka function akan di-revert.

## Mengerjakan Soal

## Project Setup (FundMe)

🧑‍💻 Test yourself

1. 📕 Why should a developer always outline his coding goals before starting to code?

### 1. Why should a developer always outline his coding goals before starting to code?

Karena dengan membuat outline, kita bisa memecah masalah menjadi bagian-bagian yang lebih kecil dan mudah dikelola. Selain itu, outline juga membantu kita untuk tetap fokus pada tujuan akhir dan memastikan bahwa kita tidak melewatkan langkah-langkah penting.

## Sending ETH Through a Function

🧑‍💻 Test yourself

1. 📕 Describe the role of the payable keyword. How does it affect the functionality of a function?

2. 📕 Explain how the require statement works in Solidity and what prevents.

3. 📕 What's the difference between Wei, Gwei and Ether?

4. 🧑‍💻 Create a tinyTip function that requires the user to send less than 1 Gwei.

### 1. Describe the role of the payable keyword. How does it affect the functionality of a function?

Payable keyword digunakan untuk menandai sebuah function agar bisa menerima ETH.

### 2. Explain how the require statement works in Solidity and what prevents.

Require statement digunakan untuk mengecek kondisi tertentu. Jika kondisi tersebut tidak terpenuhi, maka function akan di-revert.

### 3. What's the difference between Wei, Gwei and Ether?

Wei adalah satuan terkecil dari ETH. 1 Wei = 10^-18 ETH.

Gwei / GigaWei adalah satuan ETH yang lebih besar dari Wei. 1 Gwei = 10^9 Wei.

Ether adalah satuan ETH yang paling besar. 1 Ether = 10^18 Wei.

### 4. Create a tinyTip function that requires the user to send less than 1 Gwei.

```solidity
function tinyTip() public payable {
    require(msg.value < 1e9, "You sent too much ETH!");
}
```
## Solidity Reverts

🧑💻 Test yourself

1. 📕 Describe the two types of transactions listed in this lesson.

2. 📕 Why are reverts used?

3. 🧑💻 Bob sets his gas price to 20 Gwei and his gas limit to 50,000 units. The transaction consumes 30,000 units of gas before a revert occurs. How much ETH will be effectively charged?

### 1. Describe the two types of transactions listed in this lesson.

a. Value Transfer

Transfer nilai dari satu alamat ke alamat lain.

b. Contract Interaction

Interaksi dengan kontrak smart contract.

### 2. Why are reverts used?

Reverts digunakan untuk melindungi kontrak seperti contoh sebelumnya, jika kondisi tidak terpenuhi, maka function akan di-revert.

### 3. Bob sets his gas price to 20 Gwei and his gas limit to 50,000 units. The transaction consumes 30,000 units of gas before a revert occurs. How much ETH will be effectively charged?

Gas price = 20 Gwei

Gas limit = 50,000 units

Gas used sebelum revert = 30,000 units

Bob akan menghabiskan

30,000 units * 20 Gwei = 600,000 Gwei

1 Gwei = 10^-9 Wei = 1,000,000,000 Wei

600,000 Gwei = 600,000 * 10^-9 Wei = 0.0006 ETH

Bob akan menghabiskan 0.0006 ETH

Gas yang tidak digunakan 20,000 units
