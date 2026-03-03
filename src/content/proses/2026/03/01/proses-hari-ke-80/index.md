---
title: "Proses Hari ke 80"
date: "2026-03-02 19:11"
category: "proses"
tags: []
description: "Immutability and Constants, Creating Custom Errors."
draft: false
---

![tired-anime](./tired-anime.gif?width=600&a=center)

## Immutability and Constants

🧑‍💻 Test yourself

1. 📕 Why a developer can choose to use immutable instead of constant for specific variables? 

2. 🧑‍💻 Invent one constant variable and one immutable variable that can be integrated into the current version of the fundMe contract.

### 1. Why a developer can choose to use immutable instead of constant for specific variables?

Seorang developer memilih menggunakan immutable daripada constant ketika nilai suatu variabel belum diketahui saat compile time, tetapi baru dapat ditentukan saat contract di-deploy melalui constructor, dan setelah itu nilainya tidak akan pernah berubah lagi.

### 2. Invent one constant variable and one immutable variable that can be integrated into the current version of the fundMe contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundMe {
    uint256 public constant MINIMUM_CONTRIBUTION = 100;
    address public immutable i_owner;
    
    constructor() {
        i_owner = msg.sender;
    }
    
    function contribute() public payable {
        require(msg.value >= MINIMUM_CONTRIBUTION, "Minimum contribution not met");
    }
}
```

## Creating Custom Errors

🧑‍💻 Test yourself 

1. 📕 What are the benefits of declaring custom errors instead of using the require keyword? 

2. 🧑‍💻 Create a custom error that is triggered when msg.sender is address(0) and then convert it into an equivalent if statement with a revert function.

### 1. What are the benefits of declaring custom errors instead of using the require keyword?

Custom errors memiliki beberapa keuntungan dibandingkan menggunakan require keyword:

1. Gas efficiency: Custom errors tidak memerlukan string untuk di-deploy, sehingga lebih hemat gas.
2. Better error messages: Custom errors memungkinkan kita untuk memberikan pesan error yang lebih spesifik dan mudah dipahami.
3. Better code organization: Custom errors dapat didefinisikan di luar fungsi, sehingga membuat kode lebih mudah dikelola dan di-maintain.

### 2. Create a custom error that is triggered when msg.sender is address(0) and then convert it into an equivalent if statement with a revert function.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CustomError {
    error ZeroAddressSender();
    
    function exampleFunction() public {
        if (msg.sender == address(0)) {
            revert ZeroAddressSender();
        }
    }
}
```
