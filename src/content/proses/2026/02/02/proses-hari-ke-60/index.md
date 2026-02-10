---
title: "Proses Hari ke 60"
date: "2026-02-10 16:20"
category: "proses"
tags: []
description: "Awal memasuki solidity."
draft: false
---

![angry-anime](./angry-anime.gif?width=500&align=center)

Akhirnya memasuki solidity, ke course [https://updraft.cyfrin.io/courses/solidity](https://updraft.cyfrin.io/courses/solidity).

Awal ini hanya mencoba untuk mengcompile contract di [Remix](https://remix.ethereum.org/).

Ada note disini:

Jenis-jenis version constraint di pragma solidity

1. Versi spesifik (exact version)

```solidity
pragma solidity 0.8.24;
```

Hanya compiler 0.8.24

- ❌ 0.8.23 → tidak bisa
- ❌ 0.8.25 → tidak bisa

2. Caret (^) — PALING UMUM

```solidity
pragma solidity ^0.8.24;
```

Minimal: 0.8.24

Maksimal: &lt;0.9.0

Yang boleh:

- ✅ 0.8.24
- ✅ 0.8.25
- ✅ 0.8.26

Yang tidak boleh:

- ❌ 0.7.x
- ❌ 0.9.0

3. Rentang versi (range)

```solidity
pragma solidity >=0.8.0 <0.9.0;
```

Bebas selama di 0.8.x

Mirip ^0.8.0, tapi lebih eksplisit

4. Operator perbandingan tunggal

```solidity
pragma solidity >=0.8.20;
```

Semua versi di atas atau sama dengan 0.8.20

5. Multiple constraints (gabungan)

```solidity
pragma solidity >=0.8.18 <=0.8.24;
```