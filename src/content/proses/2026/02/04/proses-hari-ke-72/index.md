---
title: "Proses Hari ke 72"
date: "2026-02-22 14:34"
category: "proses"
tags: []
description: "Chainlink, Interface."
draft: false
---

![russaki-tama-tama-twins](./russaki-tama-tama-twins.gif?width=500&align=center)

## Intro to Oracles - Getting Real World Price Data

🧑💻 Test yourself

1. 📕 Describe 4 Chainlink products and what problem each one solves.

### 1. Describe 4 Chainlink products and what problem each one solves.

1. Chainlink VRF (Verifiable Random Function)

Chainlink VRF adalah produk Chainlink yang digunakan untuk menghasilkan bilangan acak yang verifikasi. Ini sering digunakan dalam permainan yang memerlukan bilangan acak, seperti gacha.

2. Chainlink Data Feed

Chainlink Data Feed adalah produk Chainlink yang digunakan untuk mengambil data dari sumber data yang terpercaya. Ini sering digunakan dalam permainan yang memerlukan data yang terpercaya, seperti harga kripto.

3. Chainlink Automation (Keepers)

Chainlink Automation (Keepers) adalah produk Chainlink yang digunakan untuk menjalankan kontrak smart contract secara otomatis.

4. Chainlink Functions

Chainlink Functions adalah memungkinkan smartcontract untuk melakukan API call ke external data source.

## Mid Section Recap

🧑‍💻 Test yourself

1. 📕 What are the three primary topics covered from lessons 1 to 5?

### 1. What are the three primary topics covered from lessons 1 to 5?

1. Payable

Payable adalah keyword yang digunakan untuk menandai sebuah function agar bisa menerima ETH.

2. Require

Require adalah statement yang mewajibkan user memenuhi kondisi tertentu. Jika kondisi tersebut tidak terpenuhi, maka function akan di-revert.

3. Reverts

Reverts digunakan untuk melindungi kontrak dari kondisi yang tidak diinginkan.

## Solidity Interfaces

🧑‍💻 Test yourself

1. 📕 Explain the role of interfaces in Solidity and why are they advantageous.

2. 📕 What are the steps required to convert a variable containing a value in ETH to its equivalent in USD?

3. 🧑💻 Implement another function on the FundMe contract that implements the decimals() methods of the Data Feed address.

### 1. Explain the role of interfaces in Solidity and why are they advantageous.

Interface di Solidity adalah deklarasi function signature tanpa implementasi yang digunakan untuk berinteraksi dengan kontrak eksternal yang sudah terdeploy. Interface memberikan ABI sehingga kontrak kita dapat memanggil fungsi kontrak lain tanpa mengetahui implementasinya. Ini membuat sistem modular, efisien, dan reusable.

### 2. What are the steps required to convert a variable containing a value in ETH to its equivalent in USD?

Langkah konversi ETH ke USD:

1. Ambil harga ETH/USD dari Chainlink Data Feed (latestRoundData)
2. Perhatikan jumlah decimals dari price feed (decimals())
3. Ambil jumlah ETH yang dikirim (msg.value)
4. Kalikan harga ETH dengan jumlah ETH
5. Sesuaikan presisi (karena ETH 18 decimals, price feed 8 decimals)
6. Bandingkan hasil USD dengan minimumUSD
7. Jika kurang, revert

### 3. Implement another function on the FundMe contract that implements the decimals() methods of the Data Feed address.

```solidity
function getDecimals() public view returns (uint8) {
    return AggregatorV3Interface(
        0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    ).decimals();
}
```

## Use AI to Help pt.2

🧑‍💻 Test yourself

1. 📕 Delve deeper into the getVersion function by asking AI three more questions about it

### 1. Delve deeper into the getVersion function by asking AI three more questions about it

1. Apa yang terjadi di level EVM ketika memanggil:

```solidity
AggregatorV3Interface(0x...).version();
```

Ketika kita melakukan type casting address ke interface, Solidity TIDAK membuat kontrak baru.  
Solidity hanya memberi tahu compiler bahwa address tersebut memiliki function `version()`.

Yang terjadi di level EVM:

1. Solidity membuat function selector dari `version()`
   (4 byte pertama dari keccak256("version()"))
2. EVM melakukan external CALL ke address tersebut
3. Kontrak asli di address itu menjalankan logic-nya
4. Return value dikirim kembali ke kontrak pemanggil
5. Solidity mendecode hasilnya menjadi uint256

Jadi interface hanyalah:
- Deklarasi signature
- Bantuan ABI encoding/decoding
- Tidak mengandung logic apa pun

2. Apakah Solidity mengecek apakah function itu benar-benar ada?

Tidak.

Solidity hanya mengecek:
- Interface memiliki function tersebut
- Return type sesuai

Solidity TIDAK:
- Mengecek apakah address itu benar
- Mengecek apakah kontrak di sana benar-benar punya function tersebut

Validasi hanya terjadi saat runtime.

Jika:
- Function tidak ada
- Signature salah
- Return data tidak sesuai

Maka:
- Transaksi akan revert
- Atau decoding akan gagal


3. Apa yang terjadi jika address tersebut adalah EOA (bukan kontrak)?

Jika address tersebut adalah EOA:

- Tidak ada bytecode di address itu
- CALL tetap technically sukses
- Tetapi tidak ada return data

Karena tidak ada return data:
- Solidity mencoba mendecode sebagai uint256
- Decoding gagal
- Transaksi revert

Inilah mengapa dalam production sering dilakukan pengecekan:

require(address.code.length > 0, "Not a contract");

Untuk memastikan address tersebut memang kontrak.