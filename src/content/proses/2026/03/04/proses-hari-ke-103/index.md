---
title: "Proses Hari ke 103"
date: "2026-03-25 20:44"
category: "proses"
tags: []
description: "CEI."
draft: false
---

![](./ghibli-studio-ghibli.gif?width=600&align=center)

Pada bagian kode `Raffle.sol` dilanjut untuk mereset array dari pemenangnya.

Ada hal yang menarik yang sampaikan oleh Patrick, mengenai bahwa yang sedang ditunjukan saat dia membuat kode dalam materi, sangatlah berbeda sekali dengan proses sebenenarnya. Jika dalam kondisi sebenarnya itu kita menulis bebuah `function` lalu coba complile dan error. Hal ini perlu dicoba berulang kali hingga selesai.

Dan juga pengenalan CEI patterns `The Checks-Effects-Interactions`. 

Checks: Validate inputs and conditions to ensure the function can execute safely. This includes checking permissions, input validity, and contract state prerequisites.

Effects: Modify the state of our contract based on the validated inputs. This phase ensures that all internal state changes occur before any external interactions.

Interactions: Perform external calls to other contracts or accounts. This is the last step to prevent reentrancy attacks, where an external call could potentially call back into the original function before it completes, leading to unexpected behavior. (More about reentrancy attacks on a later date)
