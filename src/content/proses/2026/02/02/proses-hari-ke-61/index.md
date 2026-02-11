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

A **variable** is a named storage location that holds data in a smart contract.  
It consists of:
- A name
- A data type
- A storage location (storage/memory)

A **value** is the actual data stored inside the variable.

Example:

```solidity
uint256 favoriteNumber = 88;
```

- `favoriteNumber` → variable  
- `uint256` → data type  
- `88` → value  

### 2. Default Values of Solidity Types

In Solidity, every variable has a default value if it is not initialized.

| Type      | Default Value |
|-----------|--------------|
| bool      | false |
| uint      | 0 |
| int256    | 0 |
| string    | "" (empty string) |
| address   | 0x0000000000000000000000000000000000000000 |
| bytes     | 0x (empty) |
| bytes32   | 0x0000000000000000000000000000000000000000000000000000000000000000 |

Solidity automatically assigns these zero-values when variables are declared but not explicitly initialized.


### 3. How does `uint` differ from `bytes`?

`uint` and `bytes` differ in purpose and behavior.

#### `uint`
- Represents an unsigned integer (positive whole number).
- Used for mathematical operations.
- Supports arithmetic operations like `+`, `-`, `*`, `/`.
- Example:

```solidity
uint256 number = 10;
```

#### `bytes`
- Represents raw binary data.
- Stored in hexadecimal form.
- Used for low-level data manipulation.
- Cannot be directly used in arithmetic operations.
- Example:

```solidity
bytes data = "ETH";
```

#### Key Difference

- `uint` is a numeric type meant for calculations.
- `bytes` is a raw data type meant for storing and manipulating binary data.

Additionally:

- `bytes32` is a fixed-size 32-byte data type.
- `string` is a dynamic byte array used specifically for text.
- `bytes` is dynamic and allows indexing and manipulation.

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
