---
title: "Proses Hari ke 61"
date: "2026-02-11 19:42"
category: "proses"
tags: []
description: "Basic data types di Solidity."
draft: false
---

![masha-roshidere](./masha-roshidere.gif?width=500&align=center)

## Basic Data Types in Solidity

### Boolean

Yaitu untuk menyimpan nilai true atau false.

```solidity
// true atau false
bool apakahSukaMakanAyam = true;
```

### Uint

Uint adalah singkatan dari unsigned integer, yaitu bilangan bulat positif. Ukurannya dari uint8 sampai uint256. Secara default menggunakan uint256.

```solidity
// bilangan bulat positif
uint umur = 25;
```

### Int

Int adalah singkatan dari integer, yaitu bilangan bulat positif dan negatif. Ukurannya dari int8 sampai int256. Secara default menggunakan int256.

```solidity
// bilangan bulat positif dan negatif
int umur = 25;
```
### Address

Address adalah tipe data yang digunakan untuk menyimpan alamat Ethereum. Ukurannya 20 byte.

```solidity
// alamat Ethereum
address owner = 0x1234567890123456789012345678901234567890;
```
### String

String adalah tipe data yang digunakan untuk menyimpan teks.

```solidity
// teks
string nama = "John Doe";
```
### Bytes

Bytes adalah tipe data yang digunakan untuk menyimpan data biner (low-level data). 

```solidity
// data biner
bytes data = "John Doe";
```
## Mengerjakan Soal

🧑‍💻 Test yourself

1. 📕 What's the difference between a variable and a value?

2. 📕 Describe the default value of the following types: bool, uint, int256, string, address, bytes, bytes32

3. 📕 How does uint differ from bytes?

4. 🧑‍💻 Write a smart contract that contains at least five storage variables, each with a distinct data type.

Jawaban:

### 1. What's the difference between a variable and a value?

Sebuah **variable** adalah lokasi penyimpanan bernama yang digunakan untuk menyimpan data di dalam smart contract.  
Variable terdiri dari:
- Sebuah nama
- Sebuah tipe data
- Sebuah lokasi penyimpanan (storage/memory)

Sedangkan **value** adalah data aktual yang tersimpan di dalam variable tersebut.

Contoh:

```solidity
uint256 favoriteNumber = 88;
```

- `favoriteNumber` → variable  
- `uint256` → tipe data  
- `88` → value  


---

### 2. Default Values of Solidity Types

Di dalam Solidity, setiap variable memiliki nilai default apabila tidak diinisialisasi secara eksplisit.

| Type      | Nilai Default |
|-----------|--------------|
| bool      | false |
| uint      | 0 |
| int256    | 0 |
| string    | "" (string kosong) |
| address   | 0x0000000000000000000000000000000000000000 |
| bytes     | 0x (kosong) |
| bytes32   | 0x0000000000000000000000000000000000000000000000000000000000000000 |

Solidity secara otomatis memberikan nilai nol (zero-value) ini ketika variable dideklarasikan tetapi tidak diberi nilai awal.


---

### 3. How does `uint` differ from `bytes`?

`uint` dan `bytes` memiliki perbedaan dalam tujuan penggunaan dan perilakunya.

#### `uint`
- Merepresentasikan bilangan bulat positif (unsigned integer).
- Digunakan untuk operasi matematika.
- Mendukung operasi aritmatika seperti `+`, `-`, `*`, `/`.
- Contoh:

```solidity
uint256 number = 10;
```

#### `bytes`
- Merepresentasikan data biner mentah (raw binary data).
- Disimpan dalam bentuk heksadesimal.
- Digunakan untuk manipulasi data tingkat rendah (low-level).
- Tidak dapat langsung digunakan untuk operasi aritmatika.
- Contoh:

```solidity
bytes data = "ETH";
```

#### Perbedaan Utama

- `uint` adalah tipe numerik yang digunakan untuk perhitungan.
- `bytes` adalah tipe data mentah yang digunakan untuk menyimpan dan memanipulasi data biner.

Tambahan:

- `bytes32` adalah tipe data berukuran tetap 32 byte.
- `string` adalah dynamic byte array yang digunakan khusus untuk teks.
- `bytes` bersifat dynamic dan memungkinkan akses per indeks serta manipulasi data.


---

### 4. Write a smart contract that contains at least five storage variables, each with a distinct data type.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DataTypes {
    // 1. Boolean
    bool public isComplete = false;

    // 2. Unsigned Integer (256-bit default)
    uint256 public favoriteNumber = 42;

    // 3. Signed Integer (256-bit default)
    int256 public temperature = -10;

    // 4. Address
    address public owner = msg.sender;

    // 5. String
    string public name = "Cyfrin";

    // 6. Bytes (dynamic)
    bytes public data = "Hello";

    // 7. Bytes32 (fixed-size 32 bytes)
    bytes32 public fixedData = "Fixed Size Data";
}
```