---
title: "Proses Hari ke 102"
date: "2026-03-24 10:55"
category: "proses"
tags: []
description: "Masih VRF."
draft: false
---

![card-captor-sakura-kinomoto-sakura](./card-captor-sakura-kinomoto-sakura.gif?width=600&align=center)

Berlanjut untuk implementasi dari `Chainlink VRF`, ya ini agak sulit untuk dipahami.

terdapat juga perbedaan antara tutorial dalam bentuk teks dan video, sehingga cukup menyulitkan saya dalam implementasinya. Setelah mencoba cek ke dokumentasi ternyata berbeda juga. Sepertinya terdapat update pada `VRF 2.5`.

Dalam materi:

Bahwa variabel `subscriptionId` didefinisikan dalam tipe `uint256` sedangkan pada dokumentasi menggunakan `uint64`. Sehingga harus mengupdate tipenya.

Sepertinya belum di update makanya terjadi kekeliruan ini. Saya sendiri sudah mengganti dengan yang sesuai yaitu dengan menggunakan `uint64`.
