---
title: "Proses Hari ke 20"
date: "2025-12-24 06:33"
category: "proses"
tags: []
description: "Berlanjut ke How PoS Blockchains Work."
draft: false
---

![comfy-emote](/images/proses/2025/12/proses-hari-ke-20/comfy-emote.png?width=600&a=center)

Berlanjut ke How PoS Blockchains Work[^1].

Terdapat beberapa perbedaan antara PoW dan PoS.

Penggunaan hash masih tetap sama, sebagai identitas block, mengikat antar block, dan deteksi jika terjadi perubahan data,

Beberapa sifat penting yang ada:
- Deterministik
- Avalanche Effect
- One-way Function
- Collision Resistant

Untuk mining diganti dengan block signing.

Block signing adalah proses di mana validator menandatangani block dengan private key.

Struktur blockchain PoS:

Block baru akan menyimpan hash dari block sebelumnya, jika terjadi perubahan pada satu block, maka block itu akan invalid.

Untuk menjadi validator diharuskan untuk stake, di ETH membutuhkan 32 ETH atau sekarang setara dengan $95.000.

Di Ethereum, waktu dibagi menjadi slot (12 detik) dan epoch (32 slot).

Pada setiap slot, 1 validator dipilih secara pseudo-random (berdasarkan stake dan RANDAO) sebagai block proposer untuk mengajukan block.

Setelah block diajukan, komite validator lain bertindak sebagai attester, yang memverifikasi validitas block (transaksi, state, dan signature proposer), lalu memberikan attestation (vote kriptografis).

Jika sebuah block memperoleh ≥ 2/3 total stake, block tersebut menjadi justified.
Jika epoch berikutnya juga justified, maka block sebelumnya menjadi finalized, artinya permanen dan tidak dapat di-reorg.

Validator yang bertindak jahat akan terkena slashing, yaitu pemotongan stake sebagian atau seluruhnya, serta dikeluarkan dari jaringan.

[^1]: [How PoS Blockchains Work](https://updraft.cyfrin.io/courses/blockchain-basics/blockchain-architecture/how-pos-blockchains-work)