<svelte:head>
    <title>Panduan Penulisan - shidiq</title>
</svelte:head>

<article class="prose prose-lg dark:prose-invert max-w-none">
    <h1>Panduan Penulisan Artikel</h1>

    <p>
        Blog ini menggunakan file Markdown (<code>.md</code>) untuk konten
        artikel. Berikut adalah panduan lengkap dan contoh format yang bisa
        digunakan.
    </p>

    <hr />

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

    <h2>3. Struktur & Format Konten</h2>

    <div
        class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 mb-8"
    >
        <p class="text-red-800 dark:text-red-200 font-bold m-0">
            ⚠️ JANGAN gunakan Heading 1 (<code># Judul</code>) di dalam konten!
        </p>
        <p class="text-red-800 dark:text-red-200 text-sm mt-1">
            Judul artikel sudah otomatis diambil dari metadata <code>title</code
            > dan ditampilkan sebagai H1.
        </p>
    </div>

    <h3>Heading (Judul Bagian)</h3>
    <p>Gunakan Heading 2 untuk bagian utama dan Heading 3 untuk sub-bagian.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code
                    >## Bagian Utama
### Sub Bagian</code
                ></pre>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil:</p>
            <h2 class="mt-0 text-2xl font-bold">Bagian Utama</h2>
            <h3 class="text-xl font-bold">Sub Bagian</h3>
        </div>
    </div>

    <h3>Format Teks</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code
                    >**Teks Tebal**
*Teks Miring*
~~Teks Dicoret~~
`Kode Inline`</code
                ></pre>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil:</p>
            <p><strong>Teks Tebal</strong></p>
            <p><em>Teks Miring</em></p>
            <p><del>Teks Dicoret</del></p>
            <p><code>Kode Inline</code></p>
        </div>
    </div>

    <h3>Daftar (Lists)</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code
                    >- Poin satu
- Poin dua
  - Sub poin

1. Langkah pertama
2. Langkah kedua</code
                ></pre>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil:</p>
            <ul class="list-disc pl-5 mb-4">
                <li>Poin satu</li>
                <li>
                    Poin dua
                    <ul class="list-disc pl-5">
                        <li>Sub poin</li>
                    </ul>
                </li>
            </ul>
            <ol class="list-decimal pl-5">
                <li>Langkah pertama</li>
                <li>Langkah kedua</li>
            </ol>
        </div>
    </div>

    <h3>Kutipan (Blockquote)</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code
                    >> "Menulis adalah bekerja untuk keabadian."
>
> — Pramoedya Ananta Toer</code
                ></pre>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil:</p>
            <blockquote class="border-l-4 border-gray-300 pl-4 italic">
                "Menulis adalah bekerja untuk keabadian."
                <br />
                <br />
                — Pramoedya Ananta Toer
            </blockquote>
        </div>
    </div>

    <h3>Kode (Code Block)</h3>
    <p>
        Gunakan tiga backtick (<code>```</code>) diikuti nama bahasa
        pemrogramannya.
    </p>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
        <pre><code
                >```javascript
function sapa(nama) {"{"} 
  console.log(`Halo, ${"${"}nama}!`);
{"}"}
```</code
            ></pre>
    </div>

    <h3>Gambar</h3>
    <p>
        Simpan gambar di folder <code>static/images/</code> dan panggil dengan path
        absolut.
    </p>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
        <pre><code>![Deskripsi Gambar](/images/nama-file.jpg)</code></pre>
    </div>

    <h3>Mengatur Ukuran dan Posisi Gambar</h3>
    <p>
        Anda bisa mengatur ukuran dan posisi gambar langsung di Markdown dengan
        menambahkan parameter di URL gambar:
    </p>
    <ul class="list-disc pl-5 mb-4">
        <li><code>?w=300</code> : Mengatur lebar (width)</li>
        <li><code>?h=200</code> : Mengatur tinggi (height)</li>
        <li><code>?a=center</code> : Posisi tengah</li>
        <li><code>?a=left</code> : Posisi kiri (float left)</li>
        <li><code>?a=right</code> : Posisi kanan (float right)</li>
    </ul>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
        <div class="mb-4">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code>![Deskripsi](/images/nama-file.jpg?w=300&a=center)</code
                ></pre>
        </div>
        <div>
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil HTML:</p>
            <pre><code
                    >&lt;img src="..." style="width: 300px; display: block; margin: 0 auto;" ... /&gt;</code
                ></pre>
        </div>
    </div>

    <h3>Tabel</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code
                    >| Fitur | Status |
| :--- | :--- |
| Markdown | ✅ Oke |
| Svelte | ✅ Oke |</code
                ></pre>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil:</p>
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th class="border-b p-2">Fitur</th>
                        <th class="border-b p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="p-2 border-b">Markdown</td>
                        <td class="p-2 border-b">✅ Oke</td>
                    </tr>
                    <tr>
                        <td class="p-2">Svelte</td>
                        <td class="p-2">✅ Oke</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <h3>Referensi / Catatan Kaki</h3>
    <p>
        Gunakan tanda kurung siku dengan angka <code>[^1]</code> untuk membuat referensi
        otomatis.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Markdown:</p>
            <pre><code
                    >Menurut data[^1]...

[^1]: Judul Referensi</code
                ></pre>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <p class="text-sm text-gray-500 mb-2 font-mono">Hasil:</p>
            <p>
                Menurut data<sup
                    ><a
                        href="#user-content-fn-1"
                        id="user-content-fnref-1"
                        data-footnote-ref
                        aria-describedby="footnote-label"
                        class="text-blue-600 dark:text-blue-400">1</a
                    ></sup
                >...
            </p>
            <section
                data-footnotes
                class="footnotes mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
                <ol
                    class="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400"
                >
                    <li id="user-content-fn-1">
                        <p>
                            Judul Referensi <a
                                href="#user-content-fnref-1"
                                data-footnote-backref
                                class="text-blue-600 dark:text-blue-400 hover:underline"
                                >↩</a
                            >
                        </p>
                    </li>
                </ol>
            </section>
        </div>
    </div>
</article>
