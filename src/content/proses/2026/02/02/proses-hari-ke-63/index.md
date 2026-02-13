---
title: "Proses Hari ke 63"
date: "2026-02-13 20:40"
category: "proses"
tags: []
description: ""
draft: false
---

![chione-rin](./chione-rin.gif?width=500&align=center)

## Array & Struct

### Apa itu Array?

Array adalah kumpulan data dengan tipe yang sama.

#### Contoh Dynamic Array

```solidity
uint256[] public listOfFavoriteNumbers;
```

- `[]` → menandakan array
- Bisa bertambah dan berkurang ukurannya
- Index dimulai dari 0 (zero-indexed)

Contoh akses:
```
listOfFavoriteNumbers[0] // elemen pertama
```

---

#### Static Array

```solidity
uint256[3] public fixedNumbers;
```

- Ukuran tetap (3 elemen)
- Tidak bisa ditambah atau dikurangi

---

#### 🔎 Perbedaan Dynamic vs Static Array

| Dynamic Array | Static Array |
|---------------|--------------|
| Ukuran fleksibel | Ukuran tetap |
| Bisa `push()` | Tidak bisa berubah ukuran |
| Lebih fleksibel | Lebih hemat gas dalam kondisi tertentu |

### Apa itu Struct?

Struct adalah tipe data buatan sendiri yang bisa menyimpan beberapa variabel dalam satu objek.

#### Contoh:

```solidity
struct Person {
    uint256 favoriteNumber;
    string name;
}
```

Struct `Person` memiliki:
- `favoriteNumber`
- `name`

#### Membuat Instance Struct

```solidity
Person public myFriend = Person(7, "Pat");
```

Atau versi eksplisit:

```solidity
Person public myFriend = Person({
    favoriteNumber: 7,
    name: "Pat"
});
```

### Array of Struct

Daripada membuat banyak variabel `Person`, kita bisa membuat array berisi struct:

```solidity
Person[] public listOfPeople;
```

Ini adalah **dynamic array of struct**.

### Menambahkan Data ke Array

Gunakan fungsi `push()` untuk menambahkan data:

```solidity
function addPerson(string memory _name, uint256 _favoriteNumber) public {
    listOfPeople.push(Person(_favoriteNumber, _name));
}
```

Penjelasan:
1. Membuat object `Person`
2. Menyimpannya ke dalam array `listOfPeople`

## Mengerjakan Soal

🧑‍💻 Test yourself

1. 📕 Define the difference between a dynamic array and a static array. Make an example of each.

2. 📕 What is an array and what is a struct?

3. 🧑‍💻 Create a smart contract that can store and view a list of animals. Add manually three (3) animals and give the possibility to the user to manually add an indefinite number of animals into the smart contract.

Jawaban:

### 1. Define the difference between a dynamic array and a static array. Make an example of each.

#### Dynamic Array

Dynamic array adalah array yang ukurannya fleksibel dan dapat berubah selama contract berjalan.

Ciri-ciri:
- Ukuran dapat bertambah menggunakan `.push()`
- Panjang array dapat diakses dengan `.length`
- Lebih fleksibel untuk data yang jumlahnya tidak pasti

Contoh:

```solidity
uint256[] public nomorFavorit;
```

Menambahkan data:

```solidity
nomorFavorit.push(10);
```

#### Static Array

Static array adalah array yang ukurannya sudah ditentukan saat deklarasi dan tidak dapat diubah.

Ciri-ciri:
- Ukuran tetap
- Tidak bisa menggunakan `.push()`
- Memory layout lebih predictable

Contoh:

```solidity
uint256[3] public jenisHewan;
```

Array ini hanya dapat menyimpan tepat 3 elemen.


### 2. What is an array and what is a struct?

#### Array

Array adalah kumpulan data dengan tipe yang sama, disusun secara berurutan dan diakses menggunakan indeks.

Contoh:

```solidity
uint256[] public angka;
```

Semua elemen dalam array harus bertipe `uint256`.

#### Struct

Struct adalah tipe data custom yang memungkinkan kita mengelompokkan beberapa variabel berbeda dalam satu entitas.

Struct digunakan untuk merepresentasikan objek atau data yang lebih kompleks.

Contoh:

```solidity
struct Animal {
    string name;
    uint256 age;
}
```

Struct `Animal` menyimpan dua atribut:
- `name`
- `age`

### 3. Create a smart contract that can store and view a list of animals. Add manually three (3) animals and give the possibility to the user to manually add an indefinite number of animals into the smart contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

contract AnimalList {

    // Manually added 3 animals
    string[] public ourAnimalList = ["cat", "dog", "bird"];

    // Add unlimited animals
    function addAnimal(string memory newAnimal) public {
        ourAnimalList.push(newAnimal);
    }

    // Get total number of animals
    function getTotalAnimals() public view returns (uint256) {
        return ourAnimalList.length;
    }

    // Get full list manually (optional, since public already creates a getter per index)
    function getAnimalList() public view returns (string[] memory) {
        return ourAnimalList;
    }
}
```