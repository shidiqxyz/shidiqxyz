---
title: "Proses Hari ke 47"
date: "2026-01-28 12:42"
category: "proses"
tags: []
description: "Scalability, Rollup Stages and etc."
draft: false
---

![anime-anime-girl](./anime-anime-girl.gif?width=600&a=center)

## Scalability

Blockchain trillema, yaitu masalah fundamental yang dihadapi oleh blockchain. Ada 3 unsur dalam blockchain trillema, yaitu :

- Decentralization
- Security
- Scalability

Ketiga unsur ini tidak bisa dipenuhi secara bersamaan dalam satu blockchain. Hanya 2 unsur yang bisa dipenuhi secara bersamaan. Contohnya : 

- Bitcoin : Decentralization + Security
- Ethereum : Decentralization + Security
- Solana : Scalability + Security

Ada yang bisa memenuhi desentralisasi dan security. Namun hal yang dikorbankan adalah scalability. Salah satu solusinya adalah dengan menggunakan Layer 2 (L2) yaitu dengan membangun blockchain di atas Layer 1 (L1).

### L1

Layer 1 (L1) adalah blockchain utama. 

Contoh : Bitcoin, Ethereum, Solana, dll.

### L2

Layer 2 (L2) adalah blockchain yang dibangun di atas Layer 1.

Contoh : Optimism, Arbitrum, dll.

### Rollups

Rollups adalah teknologi yang memungkinkan transaksi di Layer 2 diproses secara off-chain, kemudian dikirim ke Layer 1 untuk disimpan.

Ada 2 jenis rollups : 

- Optimistic Rollups
- ZK Rollups

#### Optimistic Rollups

Optimistic Rollups adalah teknologi yang memungkinkan transaksi di Layer 2 diproses secara off-chain, kemudian dikirim ke Layer 1 untuk disimpan.

Optimistic Rollups mengasumsikan bahwa transaksi yang dikirim ke Layer 1 adalah valid. Namun ada kemungkinan transaksi tersebut tidak valid. Oleh karena itu, ada masa tunggu sebelum transaksi tersebut dianggap final.

#### ZK Rollups

ZK Rollups adalah teknologi Layer 2 di mana transaksi diproses off-chain, lalu hasilnya dikirim ke Layer 1 bersama bukti kriptografis (Zero-Knowledge Proof).

ZK Rollups tidak mengasumsikan transaksi valid. Setiap batch transaksi harus disertai validity proof yang dapat diverifikasi secara matematis oleh Layer 1. Jika bukti tersebut valid, maka transaksi langsung dianggap sah.

Karena kebenaran transaksi dibuktikan secara kriptografis, tidak diperlukan masa tunggu (challenge period), sehingga finalitas transaksi bisa dicapai dengan cepat.

## Centralized Sequencer

Sequencer adalah komponen dalam sistem Layer 2 (seperti Optimistic Rollups dan ZK Rollups) yang bertugas mengumpulkan transaksi dari pengguna, mengurutkannya, dan mengirimkannya ke Layer 1 (blockchain utama) dalam bentuk batch.

Dalam arsitektur awal atau sederhana, sequencer seringkali bersifat terpusat (centralized). Artinya, hanya ada satu entitas atau node yang memiliki hak eksklusif untuk menjalankan fungsi sequencer.

### Kelebihan Centralized Sequencer

- **Efisiensi dan Kecepatan**: Satu sequencer terpusat dapat memproses transaksi dengan sangat cepat karena tidak perlu melalui proses konsensus yang rumit dengan banyak node.
- **Biaya Rendah**: Mengurangi overhead komunikasi dan komputasi yang diperlukan untuk koordinasi antar node sequencer yang terdistribusi.
- **Implementasi Lebih Mudah**: Pengembangan dan pemeliharaan sistem menjadi lebih sederhana dibandingkan dengan arsitektur terdistribusi yang kompleks.

### Kekurangan Centralized Sequencer

- **Risiko Sensor**: Sequencer terpusat dapat memblokir atau menahan transaksi pengguna sesuai keinginan operatornya, sehingga mengurangi sifat tanpa izin (permissionless) dari blockchain.
- **Titik Kegagalan Tunggal (Single Point of Failure)**: Jika sequencer terpusat mengalami downtime atau serangan, seluruh jaringan L2 dapat terhenti atau terganggu.
- **Potensi Censorship**: Operator sequencer memiliki kekuatan untuk memprioritaskan atau menolak transaksi tertentu, yang bertentangan dengan prinsip desentralisasi.
- **Risiko MEV (Maximal Extractable Value)**: Operator sequencer terpusat memiliki kontrol penuh atas urutan transaksi, memungkinkan mereka untuk mengekstrak MEV secara sepihak tanpa transparansi atau mekanisme pembagian yang adil.

### Solusi: Decentralized Sequencer

Untuk mengatasi kekurangan centralized sequencer, komunitas Ethereum dan pengembang L2 sedang mengembangkan solusi decentralized sequencer. Dalam sistem ini, fungsi sequencer didistribusikan ke banyak node yang berpartisipasi dalam mekanisme konsensus untuk menentukan urutan transaksi. Hal ini bertujuan untuk mengembalikan sifat desentralisasi dan tanpa sensor pada ekosistem Layer 2.
    
## Roolup Stages

Rollup stages adalah tahapan pengembangan rollup. Dimana setiap tahapan memiliki tingkat desentralisasi yang berbeda. Ini berdasarkan propose dari Vitalik Buterin. L2Beat membagi rollup stages menjadi 3 tahapan, yaitu :

- Stage 0: Full Training Wheels
- Stage 1: Enhanced Rollup Governance
- Stage 2: No Training Wheels

Bisa cek di [L2Beat](https://l2beat.com/scaling/summary).

## Menggunakan ZkSync

Dilanjutkan bagaimana cara menggunakan zkSync.

Dari ganti rpc dengan [Chainlist](https://chainlist.org/).

Bridge ETH dari L1 ke L2 menggunakan [zkSync Bridge](https://portal.zksync.io/bridge/) di testnet.

## Beres course Blockchain Basics

![photo_2026-01-28_18-20-51](./photo_2026-01-28_18-20-51.jpg?width=00&a=center)

Tidak buruk hasilnya, dari 30 pertanyaan yang benar 28.

Dan ini archivement dari course Blockchain Basics.

![photo_2026-01-28_18-23-00](./photo_2026-01-28_18-23-00.jpg?width=600&a=center)