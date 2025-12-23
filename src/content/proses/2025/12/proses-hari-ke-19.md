---
title: "Proses Hari ke 19"
date: "2025-12-23 10:38"
category: "proses"
tags: []
description: "Memasuki bagian How PoW Blockchains Work."
draft: false
---

![panic-ahhhhh](/images/proses/2025/12/proses-hari-ke-19/panic-ahhhhh.gif?width=600&a=center)

Memasuki bagian How PoW Blockchains Work[^1].

Ada beberapa istilah yang perlu diketahui :

- Hash
- SHA256
- Mining
- Block / Block Structure
- Blockchain
- Transaction
- Nonce
- Forks
- Block Reward

Hash = sebuah string yang memiliki panjang tetap yang dihasilkan dari data yang diberikan. Jika data yang diberikan ada sedikit perubahan, maka hash yang dihasilkan juga berubah.

SHA256 = salah satu algoritma hash yang paling populer.

Mining = proses mencari nonce yang memenuhi syarat aturan jaringan. Seperti bitcoin yang mencari hash dengan angka 0 beberapa digit di awal.

Nonce = angka acak yang digunakan untuk menghasilkan hash. (dalam contoh ini, nonce juga digunakan untuk menghitung jumlah transaksi di ethereum)

Transaction = pengiriman koin dari satu alamat ke alamat lainnya.

Block = Struktur data yang terdiri dari transaksi, hash, nonce dari block sebelumnya. (sebenarnya ini penjelasan singkatnya, ada bebrapa hal yang belum dimasukan dalam penjelasan ini)

Blockchain = block-block yang terhubung satu sama lain. Dengan cara memasukan hash dari block sebelumnya.

Forks = percabangan di blockchain yang terjadi ketika ada hash yang sama yang ditemukan oleh miner yang berbeda.

Block Reward = hadiah koin yang diberikan kepada miner yang berhasil menemukan hash yang memenuhi syarat untuk tercipta block baru.

Dilanjutkan ke bagian Introduction To Signatures[^2].

Cryptographic signatures memungkinkan siapa pun memverifikasi bahwa sebuah pesan/transaksi benar-benar dibuat oleh pemiliknya dan tidak pernah diubah, tanpa perlu saling percaya.

Alur :

Seed Phrase
   ↓ (hash + derivation)
Private Key
   ↓ (ECC math)
Public Key
   ↓ (Keccak-256 hash)
Wallet Address

Message / Transaction
   ↓ (hash)
Message Hash
   ↓ (sign with private key)
Digital Signature
   ↓ (verify with public key + re-hash)
Valid / Invalid


[^1]: [How PoW Blockchains Work](https://updraft.cyfrin.io/courses/blockchain-basics/blockchain-architecture/how-pow-blockchains-work)
[^2]: [Introduction To Signatures](https://updraft.cyfrin.io/courses/blockchain-basics/blockchain-architecture/introduction-to-signatures)