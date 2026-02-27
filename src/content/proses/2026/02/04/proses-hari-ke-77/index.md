---
title: "Proses Hari ke 77"
date: "2026-02-27 06:04"
category: "proses"
tags: []
description: "Resetting an Array, Sending ETH From a Contract"
draft: false
---

![woahm-anime-girl](./woahm-anime-girl.gif?width=600&align=center)

## Resetting an Array

🧑💻 Test yourself

1. 📕 Why is it important to reset the funders array when implementing the withdraw function? 

2. 🧑💻 Create a method expensiveReset that resets an array using the iteration method.

### 1. Why is it important to reset the funders array when implementing the withdraw function?

Karena jika tidak direset, array akan terus bertambah sehingga withdraw berikutnya semakin mahal (gas tinggi). Selain itu, data funding lama tetap tersimpan sehingga state contract menjadi tidak bersih setelah withdraw.

### 2. Create a method expensiveReset that resets an array using the iteration method.

```solidity
function expensiveReset() public {
    for (uint256 i = 0; i < funders.length; i++) {
        address funder = funders[i];
        addressToAmountFunded[funder] = 0;
    }

    funders = new address;
}
```

## Sending ETH From a Contract

🧑‍💻 Test yourself 

1. 📕 What are the primary differences between _transfer_, _send_, and _call_ when transferring Ether? 

2. 📕 Why is it necessary to convert an address to a payable type before sending Ether to it? 

3. 🧑‍💻 Implement a function callAmountTo using call to send Ether from the contract to an address provided as an argument. Ensure the function handles failures appropriately.

### 1. What are the primary differences between _transfer_, _send_, and _call_ when transferring Ether?

Perbedaan utama antara transfer, send, dan call terletak pada batas gas yang dikirim, cara menangani kegagalan, dan nilai yang dikembalikan. transfer dan send sama-sama hanya dapat mengirim maksimal 2300 gas. Perbedaannya, transfer akan otomatis melakukan revert jika transaksi gagal, sedangkan send tidak akan revert secara otomatis, melainkan mengembalikan nilai boolean (true atau false) sehingga developer harus memeriksa keberhasilannya secara manual.

Sementara itu, call tidak memiliki batasan gas 2300 dan dapat mengirim jumlah gas yang lebih fleksibel. Selain itu, call juga mengembalikan dua nilai, yaitu boolean untuk menunjukkan keberhasilan transaksi dan data bertipe bytes jika ada data yang dikembalikan. Berbeda dengan transfer, call tidak otomatis melakukan revert ketika gagal, sehingga perlu ditangani menggunakan require atau mekanisme pengecekan lainnya.

Karena fleksibilitas dan kompatibilitasnya terhadap perubahan biaya gas di jaringan Ethereum, call saat ini menjadi metode yang direkomendasikan untuk mengirim Ether.

### 2. Why is it necessary to convert an address to a payable type before sending Ether to it?

Solidity memisahkan address dan address payable untuk keamanan tipe (type safety). Hanya address payable yang diizinkan menerima Ether.

### 3. Implement a function callAmountTo using call to send Ether from the contract to an address provided as an argument. Ensure the function handles failures appropriately.

```solidity
function callAmountTo(address payable _to, uint256 _amount) public {
    require(address(this).balance >= _amount, "Insufficient balance");

    (bool success, ) = _to.call{value: _amount}("");
    require(success, "Call failed");
}
```
