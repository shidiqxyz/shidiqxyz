---
title: "Proses Hari ke 74"
date: "2026-02-24 13:47"
category: "proses"
tags: []
description: ""
draft: false
---

![reze-reze-chainsaw-man](./reze-reze-chainsaw-man.gif?width=500&align=center)

## Solidity Math

🧑‍💻 Test yourself

1. 📕 Why is it important to multiply before dividing in Solidity calculations, and how does this practice help maintain precision?

2. 📕 What is the purpose of the getConversionRate function, and how does it utilize the getPrice function to convert ETH to USD?

3. 🧑‍💻 Create a function convertUsdToEth(uint256 usdAmount, uint256 ethPrice) public returns(uint256), that converts a given amount of USD to its equivalent value in ETH.

### 1. Why is it important to multiply before dividing in Solidity calculations, and how does this practice help maintain precision?

Karena di solidity tidak ada bilangan desimal, hanya ada bilangan bulat. Sehingga untuk mendapatkan hasil yang presisi, kita perlu mengalikan terlebih dahulu sebelum membagi.

### 2. What is the purpose of the getConversionRate function, and how does it utilize the getPrice function to convert ETH to USD?

Tujuan dari `getConversionRate` adalah untuk mengkonversi nilai ETH ke USD. Karena harga ETH yang didapatkan dari chainlink adalah dalam bentuk USD, maka kita perlu mengkonversinya ke USD untuk mendapatkan nilai ETH dalam bentuk USD.

Alurnya:

1. getPrice() → Mengambil harga ETH saat ini (misalnya 2000 USD dengan 1e18 precision).

2. Mengalikan harga ETH dengan jumlah ETH yang dikirim.

3. Membagi hasilnya dengan 1e18 untuk menormalkan kembali presisi.

$$ \frac{ETH \times Price}{1e18} = USD $$

$$ \frac{0.1 \times 2000}{1e18} = 200 $$

### 3. Create a function convertUsdToEth(uint256 usdAmount, uint256 ethPrice) public returns(uint256), that converts a given amount of USD to its equivalent value in ETH.

```solidity
function convertUsdToEth(uint256 usdAmount, uint256 ethPrice) public pure returns (uint256) {
    uint256 ethAmount = (usdAmount * 1e18) / ethPrice;
    return ethAmount;
}
```

## msg.sender Explained

🧑‍💻 Test yourself

1. 📕 Explain why we need to use the mapping addressToAmountFunded inside the fundMe contract

2. 🧑‍💻 Implement a function contributionCount to monitor how many times a user calls the fund function to send money to the contract.

### 1. Explain why we need to use the mapping addressToAmountFunded inside the fundMe contract

Mapping digunakan untuk menyimpan data yang terasosiasi dengan alamat tertentu. Dalam konteks FundMe, mapping digunakan untuk menyimpan jumlah ETH yang dikirim oleh setiap alamat. Ini memungkinkan kita untuk melacak berapa banyak ETH yang dikirim oleh setiap alamat, sehingga kita dapat melakukan withdraw dengan benar.

### 2. Implement a function contributionCount to monitor how many times a user calls the fund function to send money to the contract.

Berapa kali user memanggil fungsi fund()

Berarti kita butuh mapping baru untuk menghitung frekuensi pemanggilan.

Tambahkan Mapping Baru

```solidity
mapping(address => uint256) public addressToContributionCount;
```

Update di Fungsi fund()

```solidity
function fund() public payable {
    funders.push(msg.sender);
    addressToAmountFunded[msg.sender] += msg.value;

    // Tambahkan counter
    addressToContributionCount[msg.sender] += 1;
}
```