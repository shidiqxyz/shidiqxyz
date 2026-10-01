---
title: "Proses Hari ke 56"
date: "2026-02-06 17:13"
category: "proses"
tags: []
description: "Trusted Setup, ZKP: ZKPoK vs ZKPoC, Completeness, Soundness, and Zero-Knowledge"
draft: false
---

![anime-girl-anime](./anime-girl-anime.gif?width=600&a=center)

## Trusted Setup

Trusted setup adalah proses inisialisasi **sekali di awal** yang dibutuhkan oleh beberapa sistem ZKP, terutama zk-SNARK.  
Proses ini bertujuan untuk menghasilkan **parameter publik** yang nantinya digunakan oleh prover untuk membuat bukti dan oleh verifier untuk memverifikasi bukti.

Dalam trusted setup dibuat sebuah nilai rahasia acak yang biasanya dilambangkan dengan **τ (tau)**.  
Nilai tau ini digunakan untuk menghasilkan parameter publik (CRS / SRS), **lalu harus dimusnahkan**.  
Jika tau atau bagian darinya tidak dimusnahkan, maka sistem menjadi tidak aman.

### Toxic Waste
Toxic waste adalah **rahasia internal** (misalnya tau) yang digunakan saat trusted setup dan **harus dihancurkan**.  
Jika toxic waste bocor, seseorang dapat memalsukan proof yang terlihat valid.

### CRS dan SRS
- **CRS (Common Reference String)** adalah parameter publik hasil trusted setup yang digunakan bersama oleh prover dan verifier.
- **SRS (Structured Reference String)** adalah CRS yang memiliki struktur matematika khusus, biasanya berupa powers of tau seperti:
  G, τG, τ²G, τ³G, ...

Semua SRS adalah CRS, tetapi tidak semua CRS adalah SRS.

### MPC
MPC (Multi-Party Computation) adalah metode melakukan trusted setup dengan banyak peserta.  
Setiap peserta menyumbang rahasia mereka sendiri dan **menghancurkannya setelah digunakan**.

Keamanan MPC bergantung pada satu asumsi:
> Selama **minimal satu peserta jujur**, toxic waste tidak dapat direkonstruksi dan sistem tetap aman.

### Groth16 dan PLONK
- **Groth16** memerlukan trusted setup **khusus untuk setiap circuit**. Jika circuit berubah, setup harus diulang.
- **PLONK** menggunakan trusted setup **universal dan updatable**, sehingga cukup satu setup untuk banyak circuit dalam batas ukuran tertentu.

---

## ZKP: ZKPoK vs ZKPoC

Zero-Knowledge Proof (ZKP) memungkinkan prover membuktikan suatu pernyataan benar **tanpa mengungkapkan data rahasia**.  
Dalam praktik, ada dua sudut pandang penting: Proof of Knowledge dan Proof of Computation.

### ZKPoK (Zero-Knowledge Proof of Knowledge)
ZKPoK adalah ZKP yang fokus pada pembuktian bahwa prover **mengetahui suatu rahasia (witness)** tanpa mengungkapkan rahasia tersebut.

Fokus utama ZKPoK:
- Membuktikan *pengetahuan*
- Bukan membuktikan proses komputasi
- Contoh: membuktikan tahu private key tanpa membocorkannya

### ZKPoC (Zero-Knowledge Proof of Computation)
ZKPoC adalah ZKP yang fokus pada pembuktian bahwa suatu **komputasi atau circuit dijalankan dengan benar** sesuai aturan.

Prover tidak langsung membuktikan bahwa ia tahu suatu rahasia, tetapi membuktikan bahwa:
- ia menjalankan circuit
- semua constraint terpenuhi

Karena komputasi dijalankan dengan benar, maka prover **pasti mengetahui input valid** yang memenuhi circuit tersebut.

### Relasi Keduanya
Dalam praktik modern:
- ZKPoC adalah bentuk yang paling sering digunakan
- ZKPoC **secara implisit mengandung ZKPoK**

Dengan kata lain:
> Proof of Computation ⇒ Proof of Knowledge  
> tetapi Proof of Knowledge ≠ selalu Proof of Computation


## Completeness, Soundness, and Zero-Knowledge

### Completeness
Completeness berarti **prover yang jujur selalu bisa lolos**.

Jika pernyataan benar, prover memiliki witness yang valid, dan protokol dijalankan dengan benar, maka verifier harus menerima proof tersebut.  
Kegagalan completeness berarti sistem menolak orang yang sebenarnya benar.

### Soundness
Soundness berarti **prover yang bohong tidak bisa menipu sistem**.

Jika pernyataan salah atau prover tidak memiliki witness yang valid, maka hampir mustahil bagi prover untuk menghasilkan proof yang diterima.  
Kegagalan soundness berarti sistem menerima klaim palsu, dan ini merupakan bug paling berbahaya.

### Zero-Knowledge
Zero-knowledge berarti **verifier tidak mempelajari rahasia apa pun**.

Verifier hanya mengetahui bahwa pernyataan benar, tanpa mengetahui witness atau data privat milik prover.  
Sifat ini menjamin privasi dalam sistem ZKP.

### Inti Utama
Sebuah ZKP yang benar:
- Tidak menolak klaim yang benar (Completeness)
- Tidak menerima klaim yang salah (Soundness)
- Tidak membocorkan informasi rahasia (Zero-Knowledge)
