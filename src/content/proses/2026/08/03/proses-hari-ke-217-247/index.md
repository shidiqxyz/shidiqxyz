---
title: "Proses hari ke 217 - 247"
date: "2026-08-18 20:17"
category: "proses"
tags: []
description: "HTTP Selesai"
draft: false
---

Hari ini adalah hari ke-247, berarti skip sekitar satu bulanan penuh ya, sekitar 32 hari tidak menulis proses di dalam blog, karena setelah saya coba, ternyata terlalu melelahkan untuk menulis setiap hari. 

Nah, untuk sekarang saya akan menulis per keinginan saya saja, bisa jadi per minggu, per bulan, atau per semester, atau per kuartal mungkin. Saya juga tidak tahu ya. Tapi saya akan menulis.

Untuk kali ini saya sudah menyelesaikan pada bagian fase satu bagian satu, mengenai HTTP. Secara garis besarnya saya sudah mengetahui bagaimana HTTP bekerja, terus request response seperti apa, lalu header, body, dan berbagai macam istilah yang ada di dalam HTTP. 

Memang sih, pembelajarannya cukup lama. Saya hampir satu bulan lebih kali untuk mempelajari HTTP ini. Ya kadang-kadang ada tidak mood-nya satu belajar, atau malas, atau ya pengen skip aja hari ini gitu. Pada bagian HTTP ini sudah cukup saya rasa untuk melanjutkan ke tahapan selanjutnya.

Bukan berarti saya berhenti untuk belajar HTTP lebih lanjut lagi, tapi secara garis besar sepertinya mending untuk lanjut. Kalau tidak saya akan bakalan stuck di HTTP selamanya. Dan saya rasa itu juga tidak baik ya untuk proses bug bounty ini. 

Terus untuk praktek, sebenarnya saya setelah saya cari lebih dalam ya mengenai latihan di PortSwigger, karena pada awalnya modul ini dibuat oleh LLM, dengan bantuan dari Qwen 3.8 Max. Jadi mungkin kekurangan konteks atau apa, saya kurang tahu.

Tapi dalam latihannya di PortSwigger itu ada dua, pertama, HTTP request smuggling, dan juga HTTP header host attack yang sebenarnya kurang cocok pada tahapan ini. 

Nah, pada HTTP request smuggling saya awalnya cukup kesulitan sih untuk mempelajari cara kerjanya. Namun setelah menonton beberapa video, mencoba membaca modulnya dan sebagainya, ternyata memang sulit. Tapi setidaknya saya sudah tahu bagaimana alur cara kerja dari request smuggling.

Jadi kurang lebihnya request smuggling ini memanfaatkan ketidaksesuaian antara front end dan back end sehingga terjadi desync. Jadi ketika ada next request dari user biasa, nah request user biasa ini bisa kita capture gitu, kita bisa ambil alih. Ini makanya berbahaya.

Nah, setelah itu ada HTTP header host attack. Ya secara contohnya sih banyak ya untuk dalam kasus password reset dan sebagainya. (karena saya belum baca ini secara mendalam). 

Yaitu HTTP header host attack itu memanfaatkan header host pada request. Nah, karena validasi di sisi server yang kurang baik. Nah, maka bisa terjadi attack ini gitu.

Dan selanjutnya saya belajar mengenai cara kerja dari browser ya di sini. Ini resource-nya terlalu banyak, saya juga pas lihat udah muak gitu. Tapi ya mau bagaimana lagi kalau jadi bug hunter yang bisa mereplicate hunting-nya gitu. Mau tidak mau harus belajar cara kerjanya gimana, terus cara break-nya gimana, lalu bisa melaporkannya gitu. 

Itu kata-kata dari [@rhynorater](https://x.com/rhynorater), salah satu white hat yang terkenal lah. Dia punya podcast Critical Thinking Bug Bounty Podcast. Mungkin kalian bisa denger lah. 

Ya segitu aja dari saya. Terima kasih.
