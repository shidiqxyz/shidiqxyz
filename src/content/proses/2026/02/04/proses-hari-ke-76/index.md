---
title: "Proses Hari ke 76"
date: "2026-02-26 14:47"
category: "proses"
tags: []
description: "SafeMath, For Loop."
draft: false
---

![nopers-nope](./nopers-nope.gif?width=500&align=center)

## Using Safemath

🧑‍💻 Test yourself 

1. 📕 Why was the SafeMath library widely used before version 0.8? 

2. 📕 Explain the meaning of integer overflow and integer underflow. Make an example using uint16.

3. 📕 What happened after Solidity version 0.8? 

4. 📕 What is the unchecked construct? 

5. 🧑‍💻 Modify the SafeMathTester contract by using the SafeMath library to prevent integer overflow.

### 1. Why was the SafeMath library widely used before version 0.8?

Library SafeMath digunakan untuk mencegah integer overflow dan integer underflow. Karena sebelum versi 0.8, Solidity tidak memiliki fitur untuk mencegah integer overflow dan integer underflow secara otomatis. 

### 2. Explain the meaning of integer overflow and integer underflow. Make an example using uint16.

#### Integer Overflow

Terjadi ketika nilai melebihi batas maksimum tipe data.

uint16 memiliki rentang:

```solidity
0 sampai 65535
```

Contoh overflow (sebelum Solidity 0.8):

```solidity
uint16 number = 65535;
number = number + 1;
```

Hasilnya:

```solidity
number = 0
```

Karena melewati batas maksimum, nilainya kembali ke awal.

#### Integer Underflow

Terjadi ketika nilai kurang dari batas minimum tipe data.

Contoh underflow:

```solidity
uint16 number = 0;
number = number - 1;
```

Hasilnya:

```solidity
number = 65535
```

Karena uint tidak bisa negatif, ia akan kembali ke nilai maksimum.

### 3. What happened after Solidity version 0.8?

Sejak Solidity versi 0.8, integer overflow dan integer underflow tidak terjadi lagi. Karena Solidity versi 0.8 sudah memiliki fitur untuk mencegah integer overflow dan integer underflow secara otomatis. Karena itu SafeMath tidak dibutuhkan lagi.

### 4. What is the unchecked construct?

Unchecked adalah sebuah blok kode yang digunakan untuk mematikan fitur integer overflow dan integer underflow.

### 5. Modify the SafeMathTester contract by using the SafeMath library to prevent integer overflow.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract SafeMathTester {
    using SafeMath for uint8;

    uint8 public bigNumber = 255;

    function add() public {
        bigNumber = bigNumber.add(1);
    }
}
```

## Solidity for Loop

🧑‍💻 Test yourself 

1. 📕 What are the shortcuts we addressed in this lesson? 
2. 📕 How does a for loop work in Solidity? 
3. 🧑‍💻 Implement a function named pushNumbers to populate a numbers array with values from 1 to 10.

### 1. What are the shortcuts we addressed in this lesson?

`++`

Contohnya seperti:

`funderIndex++` 

Shorthand dari:

`funderIndex = funderIndex + 1;`

Menambahkan nilai 1 ke variabel tersebut.

`+=`

Shorthand dari:

`x = x + y;`

### 2. How does a for loop work in Solidity?

```solidity
for (initialization; condition; increment) {
    // kode yang dijalankan berulang
}
```

Terdiri dari tiga bagian:

- Initialization, dijalankan sekali di awal

- Condition, dicek sebelum setiap iterasi

- Increment, dijalankan setiap selesai satu iterasi

### 3. Implement a function named pushNumbers to populate a numbers array with values from 1 to 10.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NumberPusher {

    uint256[] public numbers;

    function pushNumbers() public {
        for (uint256 i = 1; i <= 10; i++) {
            numbers.push(i);
        }
    }
}
```

1. Loop dimulai dari 1

2. Berjalan sampai i &lt;= 10

3. Setiap iterasi akan memasukkan angka ke dalam array numbers

4. Setelah selesai, array berisi:

```solidity
[1,2,3,4,5,6,7,8,9,10]
```
