---
title: "Proses Hari ke 51"
date: "2026-02-01 16:55"
category: "proses"
tags: []
description: "Social Recovery"
draft: false
---

![sad-cute](./sad-cute.gif?width=600&a=center)

Untuk level advanced, bisa juga menggunakan social recovery. 

## Social Recovery

Secara konsep mirip dengan multi-sig wallet.

Dengan cara kerjanya,

Ada 1 Key untuk sign transaksi sehari-hari.

Dan nantinya kita setup *guardian* untuk recovery wallet kita.

Dengan cara kerjanya, kita harus menentukan jumlah dari berapa *guardian* yang harus menandatangani transaksi sebelum transaksi tersebut dijalankan. 

Misalnya jika ada 5 *guardian*, maka setidaknya ada 3 *guardian* yang harus menandatangani transaksi sebelum transaksi tersebut dijalankan.

Ini menggunakan Shamir's Secret Sharing. Yaitu teknik memecah sebuah secret menjadi beberapa bagian. Untuk mengembalikannya, kita harus menggabungkan beberapa bagian tersebut. Seperti contoh *guardian* diatas.

Nah ada yang sangat jelas membedakan antara multi-sig wallet dan social recovery.

Multi-sig wallet itu smartcontract. Maka pada chain yang lainnya addresnya akan berbeda.

Sedangkan social recovery itu menggunakan EOA (Externally Owned Account). Jadi addressnya akan sama.

## Gnosis Safe

Gnosis / Safe adalah salah satu multi-sig wallet yang paling populer.

[Safe](https://safe.global/)

Kita bisa deploy multi-sig wallet kita sendiri dengan sangat mudah.

Bahkan kita bisa melihat kode sumbernya pada [Github](https://github.com/safe-global) untuk melakukan audit mandiri.

## Disaster Recovery

Disaster Recovery adalah mengembalikan wallet dalam suatu device yang rusak maupun hilang. Dengan cara memasukan recovery phrase atau private key.

Saat membuat wallet baru, biasanya ada perintah untuk membuat backup recovery phrase atau private key.

Kita bisa menulisanya dalam kertas, atau bahkan sebagian orang ada yang menulisnya dalam plat besi.

## Transcantions dan Signatures Verification

Untuk transaksi, sebaiknya kita harus mengecek apa yang akan kita lakukan.

Seperti contohnya, ketika kita ingin supply ETH di Aave.

Saat send transaction, kita harus cek apa yang transaksi ini lakukan.

Apakah benar transaksi ini akan supply ETH di Aave?

Atau transaksi ini akan mengirim ETH ke alamat lain?

Kita bisa cek dengan cara menyesuaikan alamat contractnya dengan mengecek dokumentasi resmi dari Aave.

Jika sesuai kita bisa lanjutkan transaksi tersebut.

Untuk signature, biasanya ketika kita memasuki sebuah website dApp, kita akan diminta untuk menandatangani sebuah pesan. 

Kita harus jeli apakah sign itu benar dari dApp tersebut atau tidak. 

Karena bisa saja ada oknum yang membuat dApp palsu untuk mencuri data kita.