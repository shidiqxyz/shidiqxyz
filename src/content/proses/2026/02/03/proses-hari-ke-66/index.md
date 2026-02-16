---
title: "Proses Hari ke 66"
date: "2026-02-16 12:11"
category: "proses"
tags: []
description: "Calldata, Memory, Storage, Mappings."
draft: false
---

![blonde-big-eyes](./blonde-big-eyes.gif?width=500&align=center)

## Calldata, Memory, Storage

EVM melakukan ketegori read dan write dalam beberapa tempat.

Terdapat 3 kategori:

1. Write & Read
2. Read (hanya membaca)
3. Write (hanya menulis)

Pada setiap bagiannya tadi memiliki keywordnya masing-masing. Ini untuk versi singkatnya.

### Write & Read Storage

- Stack
- Memory
- Storage
- Calldata

### Read Calldata

- Chain Data

### Write Memory

- Logs

## Mengerjakan soal

🧑‍💻 Test yourself

1. 📕 How does the Solidity compiler handle primitive types and strings in terms of memory management?

2. 📕 Why can't the storage keyword be used for variables inside a function?

3. 🧑‍💻 Write a smart contract that uses storage, memory and calldata keywords for its variables.

### 1. How does the Solidity compiler handle primitive types and strings in terms of memory management?

Solidity membagi tipe data menjadi dua kategori utama, yaitu value types dan reference types.

Primitive types seperti `uint256`, `bool`, `address`, dan `bytes32` termasuk value types. Tipe data ini disimpan secara langsung (inline) di storage atau memory tanpa menggunakan pointer. Nilainya akan di-copy ketika diassign ke variabel lain. Solidity menggunakan slot berukuran 32 byte sebagai unit dasar storage, dan beberapa primitive types dengan ukuran kecil dapat di-packing dalam satu slot untuk efisiensi storage.

Contoh:

```solidity
uint8 a;
uint8 b;
```

Kedua variabel ini dapat disimpan dalam satu slot storage karena ukurannya kecil.

Sedangkan `string`, `bytes`, array, dan struct termasuk reference types. Tipe data ini tidak menyimpan seluruh data langsung di slot utama. Slot utama hanya menyimpan metadata, seperti panjang data dan/atau pointer ke lokasi data sebenarnya. Data sebenarnya disimpan di lokasi lain yang ditentukan menggunakan hash `keccak256(slot)`.

Jika disimpan di memory, reference types akan dialokasikan secara temporary dan akan dihapus setelah function selesai dieksekusi.

Kesimpulannya:

- Primitive types disimpan langsung dan memiliki ukuran tetap.
- Reference types seperti string disimpan sebagai reference, dengan metadata di slot utama dan data di lokasi terpisah.

### 2. Why can't the storage keyword be used for variables inside a function?

Keyword `storage` tidak digunakan untuk membuat lokasi storage baru, tetapi hanya untuk membuat reference ke variabel yang sudah ada di storage.

Storage adalah persistent storage yang berada di blockchain dan digunakan untuk menyimpan state variable. Variabel local di dalam function tidak dapat menggunakan storage kecuali variabel tersebut mereference state variable yang sudah ada.

Contoh yang valid:

```solidity
uint[] public numbers;

function example() public {
    uint[] storage ref = numbers;
}
```

Ini valid karena `ref` adalah reference ke state variable `numbers` yang sudah ada di storage.

Contoh yang tidak valid:

```solidity
function example() public {
    uint[] storage ref;
}
```

Ini tidak valid karena tidak ada variabel storage yang direference.

Kesimpulannya:

- Storage hanya digunakan sebagai reference ke state variable.
- Storage tidak dapat digunakan untuk membuat variabel local baru.

### 3. Write a smart contract that uses storage, memory and calldata keywords for its variables.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Example {

    // storage variable
    string public text;

    // calldata and memory usage
    function setText(string calldata _text) external {

        // memory variable
        string memory temp = _text;

        // store into storage
        text = temp;
    }

    function getText() external view returns (string memory) {

        // memory copy from storage
        string memory temp = text;

        return temp;
    }
}
```

## Mappings

Mapping adalah struktur data yang memasangkan key-value. Ini seperti kamus.

```solidity
mapping(address => uint256) public balanceOf;
```

## Mengerjakan Soal


🧑‍💻 Test yourself

1. 📕 In which cases is better to use an array instead of a mapping?

2. 🧑‍💻 Create a Solidity contract with a mapping named addressToBalance. Implement functions to add and retrieve data from this mapping.

Jawaban:

### 1. In which cases is better to use an array instead of a mapping?

Array lebih baik digunakan ketika kita perlu mengiterasi seluruh data, mengetahui jumlah total data menggunakan length, atau mengakses data berdasarkan index. Array juga cocok digunakan ketika urutan data penting.

Sedangkan mapping lebih cocok digunakan ketika kita ingin melakukan lookup langsung berdasarkan key tanpa perlu iterasi. Misalnya, jika kita memiliki daftar nama dan nomor favorit, dan kita ingin mengetahui nomor favorit dari satu nama tertentu, mapping lebih efisien karena dapat langsung mengakses nilai berdasarkan nama sebagai key tanpa harus mengiterasi seluruh data seperti pada array.

### 2. Create a Solidity contract with a mapping named addressToBalance. Implement functions to add and retrieve data from this mapping.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressBalance {
    
    // Mapping from address to balance
    mapping(address => uint256) private addressToBalance;

    // Add or update balance for an address
    function setBalance(address _address, uint256 _balance) public {
        addressToBalance[_address] = _balance;
    }

    // Get balance for an address
    function getBalance(address _address) public view returns (uint256) {
        return addressToBalance[_address];
    }

}
```