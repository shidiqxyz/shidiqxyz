---
title: "Proses Hari ke 79"
date: "2026-03-01 16:10"
category: "proses"
tags: []
description: "Function Modifiers."
draft: false
---

![gen-dr-stone](./gen-dr-stone.gif?width=600&a=center)

## Solidity Function Modifiers

🧑‍💻 Test yourself 

1. 📕 Why is it beneficial to use modifiers for access control? 

2. 🧑‍💻 Implement a modifier named onlyAfter(uint256 _time) that ensures a function can only be executed after a specified time.

### 1. Why is it beneficial to use modifiers for access control?

Karena modifier memungkinkan kita untuk menambahkan logika kontrol akses ke fungsi. Ini membuat kode lebih mudah dikelola dan memungkinkan kontrol akses yang lebih fleksibel. Serta mengurangi duplikasi kode dan membuat kode lebih mudah readable dan saat di-maintain.

### 2. Implement a modifier named onlyAfter(uint256 _time) that ensures a function can only be executed after a specified time.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OnlyAfter {
    uint256 public startTime;
    
    constructor(uint256 _startTime) {
        startTime = _startTime;
    }
    
    modifier onlyAfter(uint256 _time) {
        require(block.timestamp >= _time, "Function can only be called after specified time");
        _;
    }
    
    function exampleFunction() public onlyAfter(startTime) {
        // Function logic here
    }
}
```