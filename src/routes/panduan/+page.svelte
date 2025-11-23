<svelte:head>
    <title>Panduan Penulisan - shidiq</title>
</svelte:head>

<article class="prose prose-lg dark:prose-invert max-w-none">
    <h1>Panduan Penulisan Artikel</h1>

    <p>
        Blog ini menggunakan file Markdown (<code>.md</code>) untuk konten
        artikel. Berikut adalah panduan lengkap cara membuat artikel baru.
    </p>

    <h2>1. Persiapan File</h2>
    <p>
        Buat file <code>.md</code> baru di salah satu folder berikut sesuai kategorinya:
    </p>
    <ul>
        <li>
            <code>src/content/pemikiran/</code> - Untuk opini atau pemikiran.
        </li>
        <li>
            <code>src/content/proses/</code> - Untuk dokumentasi teknis atau proses
            belajar.
        </li>
    </ul>

    <h2>2. Metadata (Frontmatter)</h2>
    <p>
        Setiap file <strong>wajib</strong> diawali dengan metadata di antara
        tiga tanda strip (<code>---</code>).
    </p>

    <div
        class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700"
    >
        <pre><code
                >---
title: "Judul Artikel Anda"
date: "2023-11-23"
category: "pemikiran" 
tags: ["tag1", "tag2"]
description: "Deskripsi singkat untuk SEO dan preview."
---</code
            ></pre>
    </div>

    <div
        class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
    >
        <h3 class="text-yellow-800 dark:text-yellow-200 font-bold mt-0">
            Aturan Penting:
        </h3>
        <ul class="mb-0 text-yellow-800 dark:text-yellow-200">
            <li>
                <strong>category</strong>: Harus persis sama dengan nama folder
                ("pemikiran" atau "proses").
            </li>
            <li>
                <strong>date</strong>: Gunakan format ISO
                <code>YYYY-MM-DD</code>.
            </li>
        </ul>
    </div>

    <h2>3. Penulisan Konten</h2>

    <h3>Judul & Heading</h3>
    <div
        class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 mb-4"
    >
        <p class="text-red-800 dark:text-red-200 font-bold m-0">
            ⚠️ JANGAN gunakan Heading 1 (<code># Judul</code>) di dalam konten!
        </p>
        <p class="text-red-800 dark:text-red-200 text-sm mt-1">
            Judul artikel sudah otomatis diambil dari metadata <code>title</code
            > dan ditampilkan sebagai H1. Gunakan mulai dari H2 untuk sub-judul.
        </p>
    </div>

    <pre><code
            >## Sub Judul (H2)
### Sub Sub Judul (H3)</code
        ></pre>

    <h3>Gambar</h3>
    <p>
        1. Simpan file gambar di folder <code>static/images/</code>.<br />
        2. Panggil gambar menggunakan path absolut mulai dari
        <code>/images/</code>.
    </p>
    <div class="not-prose bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <p class="font-mono text-sm mb-2 text-gray-500">Contoh:</p>
        <code class="block">![Keterangan Gambar](/images/nama-file.jpg)</code>
    </div>

    <h3>List (Daftar)</h3>
    <p><strong>Unordered List (Bullet):</strong></p>
    <pre><code
            >- Item satu
- Item dua
  - Sub item</code
        ></pre>

    <p><strong>Ordered List (Angka):</strong></p>
    <pre><code
            >1. Langkah pertama
2. Langkah kedua</code
        ></pre>

    <h3>Blockquote (Kutipan)</h3>
    <p>Gunakan tanda <code>&gt;</code> untuk membuat kutipan.</p>
    <pre><code>&gt; Ini adalah kutipan bijak.</code></pre>

    <h3>Format Lainnya</h3>
    <ul>
        <li><strong>Tebal</strong>: <code>**Teks**</code></li>
        <li><em>Miring</em>: <code>*Teks*</code></li>
        <li>Coret: <code>~~Teks~~</code></li>
        <li>Link: <code>[Teks](https://example.com)</code></li>
        <li>Kode Inline: <code>`kode`</code></li>
        <li>Blok Kode: <code>```javascript</code></li>
        <li>Garis Pembatas: <code>---</code> (tiga strip)</li>
    </ul>
</article>
