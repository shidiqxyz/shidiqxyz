---
title: "Proses Hari ke 78"
date: "2026-02-28 19:13"
category: "proses"
tags: []
description: ""
draft: false
---

![kanna-anime](./kanna-anime.gif?width=600&a=center)

## Smart Contract Constructor


🧑‍💻 Test yourself 

1. 📕 What is the purpose of a constructor function and how does it differ from regular functions? 

2. 📕 Why is it necessary to restrict access to the withdraw function? 

3. 🧑‍💻 Write a function called withdrawOnlyFirstAccountRemix that allows only the first Remix account to withdraw all funds from the contract.

### 1. What is the purpose of a constructor function and how does it differ from regular functions?

Constructor function adalah fungsi khusus dalam smart contract yang hanya dieksekusi sekali saat kontrak pertama kali di-deploy ke blockchain. Fungsi ini digunakan untuk menginisialisasi state variabel, mengatur kepemilikan kontrak, atau melakukan konfigurasi awal lainnya yang diperlukan sebelum kontrak dapat digunakan. Perbedaan utamanya dengan fungsi biasa adalah constructor tidak dapat dipanggil kembali setelah kontrak di-deploy, sedangkan fungsi biasa dapat dipanggil berkali-kali selama kontrak masih aktif. Selain itu, constructor juga memiliki hak akses khusus dan tidak dapat diakses oleh pengguna lain, sehingga memastikan bahwa hanya deployer yang dapat mengatur parameter awal kontrak.

### 2. Why is it necessary to restrict access to the withdraw function?

Membatasi akses ke fungsi withdraw sangat penting untuk keamanan. Dalam smart contract, fungsi withdraw biasanya digunakan untuk mentransfer dana dari kontrak ke akun eksternal. Jika fungsi ini tidak dibatasi dengan benar, siapa pun dapat memanggilnya dan menarik semua dana, yang berpotensi menyebabkan kerugian total aset. Dengan membatasi akses, kita dapat memastikan bahwa hanya akun yang berwenang, seperti pemilik kontrak atau pengguna tertentu, yang dapat menarik dana, sehingga melindungi aset kontrak dari akses tidak sah dan potensi pencurian.

### 3. Write a function called withdrawOnlyFirstAccountRemix that allows only the first Remix account to withdraw all funds from the contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WithdrawOnlyFirstAccountRemix {
    address payable public owner;
    
    constructor() {
        owner = payable(msg.sender);
    }
    
    function withdrawOnlyFirstAccountRemix() public {
        require(msg.sender == owner, "Only the first account can withdraw");
        owner.transfer(address(this).balance);
    }
}
```