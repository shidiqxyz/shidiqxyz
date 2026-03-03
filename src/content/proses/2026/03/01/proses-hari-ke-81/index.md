---
title: "Proses Hari ke 81"
date: "2026-03-03 07:36"
category: "proses"
tags: []
description: "receive and fallback function."
draft: false
---

![anime-frieren](./anime-frieren.gif?width=600&a=center)

## Implementing The Receive Fallback

🧑‍💻 Test yourself 

1. 📕 How does the fallback function differ from the receive function? 

2. 📕 What does it happen when Ether is sent with _data_ but in the contract only a receive function exist?

### 1. How does the fallback function differ from the receive function?

Perbedaan utama antara fallback dan receive adalah pada kondisi kapan masing-masing fungsi dipanggil.

#### receive()

- Dipanggil ketika contract menerima Ether
- msg.data kosong (tidak ada data)
- Harus bersifat external payable
- Lebih spesifik untuk menerima transfer Ether langsung

#### fallback()

- Dipanggil ketika:

Ether dikirim dengan data

Fungsi yang dipanggil tidak ada di dalam contract

- atau ketika tidak ada receive() dan Ether dikirim tanpa data
- Bisa payable atau tidak
- Berfungsi sebagai “penangkap terakhir” (catch-all function)

### 2. What does it happen when Ether is sent with _data_ but in the contract only a receive function exist?

Jika Ether dikirim dengan data, tetapi contract hanya memiliki receive() dan tidak memiliki fallback(), maka:

Transaksi akan revert (gagal).

Hal ini terjadi karena:

- receive() hanya menangani transaksi dengan msg.data kosong.
- Ketika terdapat data, Solidity akan mencoba memanggil fallback().
- Jika fallback() tidak ada, maka tidak ada fungsi yang bisa menangani transaksi tersebut, sehingga transaksi ditolak.

## Akhir dari basics solidity

Hari ini saya baru saja menyelesaikan course basics (jika ditanya apa yang dipelajari, *idk*), setidaknya ada beberapa hal yang saya baru tahu ketahui.

Diperlukan repetisi untuk memahami materi yang sudah saya pelajari.

Tahap sekarang lebih seperti perkenalan awal atau acknowledgment.

Dan juga ada tambahan opsional tadi untuk belajar [speedrunethereum](https://speedrunethereum.com/).