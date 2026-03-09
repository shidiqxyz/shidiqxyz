---
title: "Proses Hari ke 88"
date: "2026-03-10 02:08"
category: "proses"
tags: []
description: ""
draft: false
---

![ashita no joe](./ashita-no-joe-joe-yabuki.gif?width=600&a=center)

Kini menanjutkan mengenai deploy smart contract via anvil menggunakan script. Yaitu dengan cara membuat folder `scripts` dan membuat file `<nama>.s.sol`.

Untuk menjalankan script tersebut, bisa menggunakan `forge script <nama>.s.sol --rpc-url <url> --broadcast --private-key <private-key>`.

Jadinya, kita akan membuat script untuk deploy smart contract.

Selanjutnya ia menjelaskan mengenai transaction dan `cast`.

```json
{
    "transaction": {
    "from": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "to": null,
    "gas": "0x714e1",
    "value": "0x0",
    "input": "0x608060...c63430008130033",
    "nonce": "0x0",
    "chainId": "0x7a69",
    "accessList": null,
    "type": null
}
```

Ini merupakan transaction yang akan dijalankan di anvil.

Salah satu parameter yaitu `gas`. Itu ditunjukkan dalam hex, yaitu `0x714e1`. Karena ini dalam hex, maka perlu diubah menjadi decimal. Dengan cara menggunakan `cast`.

```bash
cast --to-base 0x714e1 dec
```
Namun, ada permasalahan saat menjalankan `forge script`. Yaitu `private key` yang digunakan akan muncul di terminal. Maka dari itu kita bisa menggunakan `.env`. Penggunaan dari `.env` ini sebaiknya digunakan saat proses development saja, bukan saat production.

Ada cara lain yaitu dengan mengencrypt private key tersebut. Kini foundry sudah menyediakan fitur `keystore`. Yaitu dengan cara menyimpan private key dalam bentuk terenkripsi. Dan saat akan digunakan, maka akan diminta password untuk mendekripsi private key tersebut. 

```bash
cast wallet import <nama_account> --interactive
```
Dilanjutkan dengan penjelasan mengenai `cast send`. Yaitu untuk mengirim transaction ke blockchain.

```bash
cast send <address-interact> <signature-function> <parameter> --private-key <private_key> --rpc-url <rpc_url>
```

Untuk read, bisa menggunakan `cast call`.

```bash
cast call <address-interact> <signature-function> <parameter>
```

Bagian terakhir yaitu mengenai deploy ke testnet. Dengan menggunakan rpc dari Alchemy.