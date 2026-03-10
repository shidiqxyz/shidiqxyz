---
title: "Proses hari ke 89"
date: "2026-03-11 04:22"
category: "proses"
tags: []
description: "foundry-zksync."
draft: false
---

![konakonagifs-keion](./konakonagifs-keion.gif?width=600&a=center)

Sekarang memcoba untuk verifikasi smart contract di etherscan. Masih dengan cara manual, yaitu dengan cara copy paste kode soliditynya langsung.

Ini hasil tx deploy ke sepolia:

https://sepolia.etherscan.io/tx/0x1da3d22cd4c5dac9e6e85becdc92094d2f82c498669abe439a15a53e0cde179e

Sedangkan ini hasil verifikasi di etherscan:

https://sepolia.etherscan.io/address/0x12b323199D378F1e6751484Ac201e2bEfE89B2b3


`forge fmt` untuk memformat kode solidity agar rapi. Dan juga penggunaan `README.md` untuk penjelasan project yang sedang dibuat, seperti cara pakai, dll.

Dilanjutkan dengan `foundry-zksync`. Kode dalam bentuk human-readable mungkin tidak ada yang berbeda, namun dalam bentuk low-level ada yang berbeda. Makanya harus menginstall `foundry-zksync` secara spesifik untuk deploy di zksync.

Sisanya hanya penjelasan mengenai deploy ke zksync. Kurang lebih sama seperti deploy menggunakan foundry, namun ada perbedaan sedikit bentuk command.

Dijelaskan juga mengenai type tx.

Transaction Types

Type 0 — Legacy Transaction

Format asli sebelum EIP-2718. Field: nonce, gasPrice, gasLimit, to, value, data, v, r, s. Masih didukung sampai sekarang.

Type 1 — EIP-2930 (Access List Transaction)

Ditambahkan di Berlin hard fork. Sama seperti Type 0 tapi menambahkan field accessList — daftar address & storage slot yang akan diakses, sehingga gas lebih efisien untuk kontrak yang sudah diketahui akses storagenya.

Type 2 — EIP-1559 (Fee Market Transaction)

Ditambahkan di London hard fork. Mengganti gasPrice dengan dua field baru:

maxFeePerGas — batas maksimum yang mau dibayar per gas
maxPriorityFeePerGas — tip untuk validator

Base fee dibakar, dan sisanya jadi tip. Ini yang paling umum dipakai sekarang.

Type 3 — EIP-4844 (Blob Transaction)

Ditambahkan di Dencun hard fork (Maret 2024). Didesain khusus untuk L2 rollups. Menambahkan field blobVersionedHashes dan maxFeePerBlobGas. Data blob disimpan sementara (~18 hari) dan tidak masuk ke EVM execution, sehingga biaya data L2 jauh lebih murah.

Type 4 — EIP-7702 (Set Code Transaction)

Ditambahkan di Pectra hard fork (2025). Memungkinkan EOA (wallet biasa) untuk sementara menjalankan kode smart contract dalam satu transaksi — fondasi dari account abstraction native.