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
