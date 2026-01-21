---
title: "Proses Hari ke 17"
date: "2025-12-19 15:27"
category: "proses"
tags: []
description: "Kembali ke course cyfrin mengenai blockchain basic."
draft: false
---

![lain](./lain.gif?width=600&a=center)

Kembali ke course cyfrin mengenai blockchain basic.

Kini telah memasuki section 2, mengenai Sending Transactions[^1].

Saya sudah familiar dengan ini karena sehari-hari saya sering berinteraksi dengan blockchain, terutama saat EVM-based (karena itu saya play dengan 2x videonya).

Poin yang selaku ditekankan bahwa recovery phrase itu jangan diberikan ke siapapun dan juga disimpan seaman mungkin (*that the point why we make the blockchain? i think*).

Pembahasan dilakukan dari membuat wallet di metamask hingga mengirimkan transaksi.

Ada pembahasan mengenai testnet dan virtual testnet.

Disini saya baru tahu ada virtual testnet. Ada platfrom yang menyediakan yaitu [Tenderly](https://tenderly.co/).

Dilanjutkan pembahasan mengenai gas.

Gas = biaya yang harus dibayarkan saat berinteraksi dengan Ethereum.

Gas Price = harga per 1 unit gas

Diukur dalam Gwei (1 Gwei = 10⁻⁹ ETH). (*rn i didn't understand that kinda term*)

Rumus biaya transaksi: Transaction Fee = Gas Used × Gas Price

Gas Limit = batas maksimum gas yang kamu izinkan.

Gas Used = gas aktual yang dipakai transaksi.

Intinya, gas adalah biaya komputasi, gas price adalah harga prioritas, dan total fee ditentukan oleh seberapa berat transaksi serta seberapa cepat kamu ingin diproses. Karena sifat gas fee itu dinamis, jika permintaan sedang sedikit, maka gas price akan lebih rendah, dan jika permintaan sedang banyak, maka gas price akan lebih tinggi. (*supply and demand economics thing*)

Setelah itu dilanjutkan kembali membahas apa itu smart contract.

Seperti bahasan sebelumnya, kontrak yang dijalankan di ethereum dalam bentuk kode.

Dan ditulis dalam bahasa solidity. Ada juga alternatif lain yaitu vyper.

Ini contoh kode solidity.

```solidity
contract MyContract {
    uint public myNumber;

    function setNumber(uint _number) public {
        myNumber = _number;
    }
}
```

Untuk lifecycle smart contract, ada beberapa tahap.

write -> compile -> deploy

[^1]: [Sending Transactions](https://updraft.cyfrin.io/courses/blockchain-basics/sending-transactions/what-is-a-wallet)