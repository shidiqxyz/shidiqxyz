---
title: "Proses Hari ke 97"
date: "2026-03-19 21:06"
category: "proses"
tags: []
description: "Frontend Fund Me."
draft: false
---

![sakuya-izayoi-touhou](./sakuya-izayoi-touhou.gif?width=600&a=center)

Sekarang hanya disiruh untuk mengclone repo frontend untuk contract fundme yang sudah dibuat sebelumnya.

[html-fund-me-cu](https://github.com/Cyfrin/html-fund-me-cu)

Kurang lebihnya, bagaiamana cara kerja bagaimana mengkoneksikan antara website dengan smart contract yang sudah dibuat. Browser akan diinject provider dari metamask, dengan cara memasukan object provider ke dalam `window.provider`.

`window.provider` ini yang membantu kita untuk bisa interaksi dengan web3. Serta dijelaskan sedikit bagaimana implementasi kodenya, dll.

Dan terakhir yaitu mengenai decode ethereum transaction. Saat kita mencoba mengirimkan transaksi, pada window metamask akan muncul pop up untuk konfirmasi transaksi. Di dalam pop up tersebut akan ada informasi mengenai transaksi yang akan dikirimkan, seperti alamat tujuan, jumlah yang akan dikirim, dll.

Kita bisa melihat `hex` yang dikirimkan ke blockchain itu sesuai dengan `function selector` yang sudah dibuat. Apakah sesuai dengan sesungguhnya. 

Saya kini sedikit bisa lebih menegerti kenapa ada semcam attack `dusting`.