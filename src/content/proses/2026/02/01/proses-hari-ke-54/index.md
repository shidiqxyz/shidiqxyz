---
title: "Proses Hari ke 54"
date: "2026-02-04 17:46"
category: "proses"
tags: []
description: ""
draft: false
---

![meowbah-meowbahh](./meowbah-meowbahh.gif?width=600&a=center)

Kini berkajut ke course ZK.

[Fundamentals of Zero-Knowledge Proofs (ZKPs)](https://updraft.cyfrin.io/courses/fundamentals-of-zero-knowledge-proofs) yang pasti untuk pemula.

## Zero-Knowledge Proofs (ZKPs)

ZKPs adalah teknik kriptografi yang memungkinkan satu pihak (prover) membuktikan kepada pihak lain (verifier) bahwa suatu pernyataan adalah benar, tanpa mengungkapkan informasi apa pun selain kebenaran pernyataan itu sendiri.

### Properti ZKPs

1. **Completeness**: Jika pernyataan benar, prover dapat membuktikannya kepada verifier. Contohnya, jika prover memiliki kata sandi yang benar, ia dapat membuktikannya kepada verifier.
2. **Soundness**: Jika pernyataan salah, prover tidak dapat membuktikannya kepada verifier. Contohnya, jika prover tidak memiliki kata sandi yang benar, ia tidak dapat membuktikannya kepada verifier.
3. **Zero-Knowledge**: Verifier tidak mendapatkan informasi apa pun selain kebenaran pernyataan itu sendiri. Contohnya, verifier tidak mendapatkan informasi apa pun selain kebenaran pernyataan bahwa prover memiliki kata sandi yang benar.

## 2 Tipe ZKPs

1. **Interactive ZKPs**: ZKPs yang memerlukan interaksi antara prover dan verifier. Contohnya, prover dan verifier harus saling mengirim pesan untuk membuktikan kebenaran pernyataan.

2. **Non-Interactive ZKPs** (NIZKs): ZKPs yang tidak memerlukan interaksi antara prover dan verifier. Contohnya, prover dapat membuktikan kebenaran pernyataan kepada verifier tanpa perlu mengirim pesan.

Untuk Interactive ZKPs, tidak cocok untuk blockchain karena memerlukan interaksi antara prover dan verifier. Karenan akan memakan waktu lama.

Sedangkan untuk Non-Interactive ZKPs, cocok untuk blockchain karena tidak memerlukan interaksi antara prover dan verifier.

### Tipe NIZKs

1. **zk-SNARKs**: ZKPs yang memerlukan trusted setup.
2. **zk-STARKs**: ZKPs yang tidak memerlukan trusted setup.
3. **zk-Bulletproofs**: ZKPs yang tidak memerlukan trusted setup dan memiliki ukuran bukti yang kecil.

## ZK Terminology

### Claim / Statement

Pernyataan yang ingin dibuktikan kebenarannya oleh prover kepada verifier tanpa mengungkapkan informasi rahasia.

Contoh: “Saya tahu password yang hash-nya adalah X.”

### Private Inputs

Data rahasia yang hanya diketahui oleh prover dan tidak pernah diungkapkan secara langsung ke verifier.

Contoh: password asli.

### Public Inputs

Data yang diketahui oleh prover dan verifier, digunakan sebagai bagian dari verifikasi.

Contoh: hash dari password.

### Constraint

Aturan matematis yang harus dipenuhi agar sebuah claim dianggap benar di dalam circuit.

Contoh: hash(password) == X

### Circuit

Representasi matematis (biasanya dalam bentuk rangkaian aritmetika) dari komputasi yang akan dibuktikan.

Circuit mendefinisikan:

bagaimana inputs diproses

constraint apa saja yang harus terpenuhi

### Witness

Kumpulan nilai konkret untuk semua private inputs yang membuat seluruh constraint bernilai benar.

Singkatnya: jawaban rahasia yang membuat circuit valid.

### Prover

Pihak yang memiliki witness dan menghasilkan proof bahwa ia memenuhi semua constraint dalam circuit.

### Verifier

Pihak yang memeriksa proof menggunakan public inputs dan circuit, tanpa pernah mengetahui witness.