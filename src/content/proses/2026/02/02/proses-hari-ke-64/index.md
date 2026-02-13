---
title: "Proses Hari ke 64"
date: "2026-02-14 02:18"
category: "proses"
tags: []
description: "Error & Warning"
draft: false
---

![evil-smug](./evil-smug.gif?width=500&align=center)

## Error & Warning

Pada saat compile di remix, pastilah tidak akan berjalan dengan mulus. Pasti ada error dan warning yang muncul.

Nah, disini yang harus diperhatikan itu untuk membaca error dan warning tersebut.

Untuk error, akan ada tanda merah saat compile. Dan kode tidak akan bisa dicompile. Maka kode tidak akan bisa di deploy.

Warning, akan ada tanda kuning saat compile. Dan kode akan bisa dicompile. Tapi mesti dipastikan kode dalam kode itu ada sesuatu yang tidak sesuai, maka harus dibenarkan.

## Mengerjakan Soal

🧑‍💻 Test yourself

1. 📕 What's the difference between a warning and an error? Make an example of each.

2. 🧑‍💻 Make a written list (or a bookmark in your browser) with at least 3 useful online resources will help you solve future bugs.

Jawaban:

### 1. What's the difference between a warning and an error? Make an example of each.


Saat melakukan compile di Remix, sering muncul pesan error atau warning.

## 🔴 Error

Error adalah masalah dalam kode yang **menghentikan proses kompilasi**.

Ciri-ciri:
- Ditampilkan dengan warna merah
- Contract tidak bisa di-compile
- Contract tidak bisa di-deploy
- Biasanya disebabkan oleh kesalahan sintaks atau struktur

### Contoh Error

Missing semicolon:

```solidity
uint256 public number
```

Compiler akan menghasilkan error karena kurang `;`.

## 🟡 Warning

Warning adalah peringatan bahwa ada praktik yang kurang tepat atau berpotensi bermasalah.

Ciri-ciri:
- Ditampilkan dengan warna kuning
- Contract tetap bisa di-compile
- Contract tetap bisa di-deploy
- Sebaiknya tetap diperbaiki

### Contoh Warning

Tidak menambahkan SPDX License:

```solidity
pragma solidity ^0.8.18;
```

Compiler akan menampilkan:

```
Warning: SPDX license identifier not provided in source file
```

### 2. Make a written list (or a bookmark in your browser) with at least 3 useful online resources will help you solve future bugs.


1. Google Search
2. Forum Developer (Stack Exchange, GitHub Discussions, dll.)
3. AI Agent (ChatGPT, Phind, dll.)