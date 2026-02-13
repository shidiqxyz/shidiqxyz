---
title: "Proses Hari ke 62"
date: "2026-02-12 16:08"
category: "proses"
tags: []
description: "Function di Solidity."
draft: false
---

![cat-meme-cat](./cat-meme-cat.gif?width=500&align=center)

## Function

Function adalah blok kode dalam contract yang dapat dipanggil untuk menjalankan logika tertentu. Function dapat menerima parameter dan mengembalikan nilai.

### Function Visibility

Terdapat 4 jenis function visibility:

- public → dapat diakses dari dalam dan luar contract
- external → hanya dapat dipanggil dari luar contract
- internal → dapat diakses dari dalam contract dan contract turunan
- private → hanya dapat diakses dalam contract tempat dideklarasikan

### Function Read State

- view → tidak mengubah state, tetapi boleh membaca state
- pure → tidak boleh membaca maupun mengubah state

## Scope Variable

- Variabel yang dideklarasikan di dalam function memiliki scope lokal.
- Variabel yang dideklarasikan di dalam contract (di luar function) disebut state variable dan dapat diakses oleh seluruh function dalam contract sesuai visibility-nya.


## Mengerjakan Soal

🧑💻 Test yourself

1. 📕 Describe the four visibility keywords and their impact on the code.

2. 📕 What's the difference between view and pure?

3. 📕 In which circumstances a pure function will incur gas costs?

4. 📕 Explain what a scope is and provide an example of an incorrect scope.

5. 📕 What's the difference between a transaction that deploys a contract and a transaction that transfers ETH?

    🧑💻 Write a contract that features 3 functions:

    - a view function that can be accessed only by the current contract
    - a pure function that's not accessible within the current contract
    - a view function that can be accessed from children's contracts

Jawaban:

### 1. Describe the four visibility keywords and their impact on the code.

Solidity memiliki empat visibility specifier:

- **public**  
  Dapat diakses dari dalam contract maupun dari luar contract.  
  Jika digunakan pada state variable, Solidity otomatis membuat getter function.

- **private**  
  Hanya dapat diakses di dalam contract tempat ia dideklarasikan.  
  Tidak dapat diakses oleh contract turunan (inheritance).

- **internal**  
  Dapat diakses oleh contract itu sendiri dan contract turunan (inheritance).  
  Ini adalah visibility default jika tidak ditentukan.

- **external**  
  Hanya dapat dipanggil dari luar contract.  
  Tidak bisa dipanggil secara langsung dari dalam contract tanpa menggunakan `this`.

Impact pada kode:
Visibility menentukan batas akses suatu function atau variable, yang memengaruhi keamanan, arsitektur inheritance, dan bagaimana contract berinteraksi dengan contract lain.

### 2. What's the difference between `view` and `pure`?

Keduanya tidak mengubah state blockchain.

- **view**
  - Boleh membaca state variable.
  - Tidak boleh mengubah state.
  - Tidak boleh emit event atau membuat contract baru.

- **pure**
  - Tidak boleh membaca maupun mengubah state.
  - Hanya boleh menggunakan parameter dan local variable.

Perbedaan utama:
`view` boleh membaca state, sedangkan `pure` sama sekali tidak boleh berinteraksi dengan state blockchain.

### 3. In which circumstances a `pure` function will incur gas costs?

Fungsi `pure` akan tetap memerlukan gas jika dipanggil melalui sebuah **transaction**.

Contoh:
- Dipanggil dari function lain yang mengubah state.
- Dipanggil melalui wallet sebagai bagian dari transaksi on-chain.

Gas dibayar karena eksekusi transaction, bukan karena fungsi tersebut membaca atau menulis state.

Jika hanya dipanggil sebagai "call" (tanpa transaction), maka tidak memerlukan gas.

### 4. Explain what a scope is and provide an example of an incorrect scope.

Scope adalah konteks atau area dalam kode di mana sebuah variabel dapat diakses.

Dalam Solidity:

- Variabel yang dideklarasikan di luar function (di dalam contract) disebut **state variable** dan dapat diakses oleh seluruh function dalam contract sesuai visibility-nya.
- Variabel yang dideklarasikan di dalam function memiliki **local scope** dan hanya bisa digunakan dalam function tersebut.

Contoh incorrect scope:

```solidity
contract Example {
    function store() public {
        uint256 localNumber = 5;
    }

    function read() public {
        localNumber = 10; // ❌ Error: localNumber tidak ada dalam scope ini
    }
}
```

`localNumber` hanya berlaku di dalam function `store`.

### 5. What's the difference between a transaction that deploys a contract and a transaction that transfers ETH?

**Deploy Contract:**
- Field `to` kosong.
- Bytecode contract dikirim dalam field `data`.
- Menghasilkan address contract baru.
- Biasanya membutuhkan gas lebih besar.

**Transfer ETH:**
- Field `to` berisi address penerima.
- Biasanya tidak memiliki data.
- Hanya memindahkan value (ETH).
- Gas lebih rendah dibanding deploy.

Perbedaan utama terletak pada struktur transaksi dan tujuan eksekusinya, bukan hanya pada biaya gas.

### 6. Write a contract that features 3 functions:

- a view function that can be accessed only by the current contract

```solidity
function seeNumber () private view returns (uint256) {
    return myNumber;
}
```

- a pure function that's not accessible within the current contract

```solidity

function calculate(uint256 a, uint256 b) external pure returns (uint256) {
    return a + b;
}

```

- a view function that can be accessed from children's contracts

```solidity

function seeNumber () internal view returns (uint256) {
    return myNumber;
}

```
