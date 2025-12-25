<script>
  import YouTube from '$lib/components/YouTube.svelte';
  import Button from '$lib/components/Button.svelte';
  import InlineToc from '$lib/components/InlineToc.svelte';
  import Tweet from '$lib/components/Tweet.svelte';
</script>

# Wiki & Panduan Penulisan

Selamat datang di pusat dokumentasi teknis untuk blog ini. Halaman ini dirancang sebagai referensi lengkap untuk menulis, mengelola, dan mempublikasikan artikel dengan standar kualitas tinggi.

---

<InlineToc title="Daftar Isi Wiki" />

---

## 1. Workflow Penulisan

Ikuti alur kerja ini untuk menjaga kerapian repositori.

### Langkah 1: Buat Draft Baru
Gunakan script otomatis untuk membuat folder dan file dengan struktur tanggal yang benar.

```bash
npm run new
```
*Script ini akan meminta input Judul dan Kategori, lalu membuat file di `src/content/[kategori]/[tahun]/[bulan]/[slug].md`.*

### Langkah 2: Menulis & Preview
Jalankan server lokal untuk melihat tulisan Anda secara *real-time*.
```bash
npm run dev
```
Buka `http://localhost:5173` di browser Anda.

### Langkah 3: Publikasi
Setelah selesai, ubah status `draft: true` menjadi `draft: false` di metadata, lalu lakukan commit ke GitHub.

---

## 2. Metadata (Frontmatter)

Setiap artikel **wajib** memiliki blok metadata di paling atas file.

```yaml
---
title: "Mengapa Kopi itu Hitam?"
date: "2025-12-24 20:30"
category: "pemikiran"
tags: ["sains", "filosofi", "kopi"]
description: "Sebuah eksplorasi mendalam tentang warna kopi dari sudut pandang kimia dan eksistensialis."
draft: false
---
```

### Penjelasan Field

| Field | Tipe | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `title` | String | Ya | Judul utama artikel. (Otomatis jadi H1). |
| `date` | String | Ya | Format: `YYYY-MM-DD` atau `YYYY-MM-DD HH:mm`. |
| `category` | String | Ya | Pilihan: `pemikiran` (opini) atau `proses` (jurnal/teknis). |
| `tags` | Array | Tidak | Maksimal 4-5 tag relevan. Huruf kecil semua. |
| `description`| String | Ya | Wajib untuk SEO & Preview Link (Twitter/WA). Max 160 karakter. |
| `draft` | Boolean| Ya | `true`: Hanya tampil di dev mode. `false`: Live di production. |

---

## 3. Struktur & Format Konten

### Hierarki Heading
Gunakan **Heading 2** untuk bab utama dan **Heading 3** untuk sub-bab.

> **PENTING:** Jangan gunakan Heading 1 (`#`), karena sudah dipakai untuk Judul Artikel.

### Teks & Penekanan
- **Bold**: `**Teks Tebal**` untuk poin penting.
- *Italic*: `*Teks Miring*` untuk istilah asing atau penekanan halus.
- `Code`: `` `Teks Code` `` untuk istilah teknis atau path file.

### Daftar (List)
Gunakan daftar untuk memecah dinding teks (wall of text).

**Unordered List (Poin)**
- Gunakan `-` atau `*`.
- Cocok untuk item yang tidak berurutan.

**Ordered List (Angka)**
1. Gunakan angka `1.`.
2. Cocok untuk tutorial atau langkah-langkah.

### Kutipan (Blockquote)
Gunakan `>` untuk mengutip kalimat penting atau memberikan catatan.

> "Kode adalah puisi yang dieksekusi oleh mesin."

---

## 4. Manajemen Gambar

Blog ini memiliki sistem optimasi gambar otomatis. Simpan gambar Anda di folder `static/images/`.

### Struktur Folder Gambar
Disarankan mengikuti struktur artikel agar rapi:
`static/images/[kategori]/[tahun]/[bulan]/[slug]/nama-file.jpg`

### Cara Penggunaan
Panggil gambar menggunakan path absolut dari root web (tanpa `static`).

```markdown
![Keterangan Gambar](/images/pemikiran/2025/12/kopi/biji-kopi.jpg?w=800&a=center)
```

### Query Parameters (Magic!)
Anda bisa mengatur tampilan gambar langsung dari URL-nya:

| Param | Fungsi | Contoh | Keterangan |
| :--- | :---: | :--- | :--- |
| `w` | Width | `?w=400` | Mengatur lebar gambar dalam pixel. |
| `h` | Height| `?h=300` | Mengatur tinggi gambar (jarang dipakai, biasanya auto). |
| `a` | Align | `?a=center` | Posisi: `left`, `center`, atau `right`. |

**Contoh Penerapan:**
- **Gambar Full**: `?w=800&a=center` (Standar)
- **Gambar Kecil di Kanan**: `?w=300&a=right` (Teks akan mengalir di kirinya)

---

## 5. Embed & Komponen

### YouTube
Video akan otomatis responsif. Cukup ambil ID videonya.

```html
<script>
  import YouTube from '$lib/components/YouTube.svelte';
</script>

<YouTube id="dQw4w9WgXcQ" />
```

<YouTube id="dQw4w9WgXcQ" />

### Tweet Embed (X)
Sematkan cuitan dari X (Twitter) menggunakan komponen `<Tweet />`.

```html
<script>
  import Tweet from '$lib/components/Tweet.svelte';
</script>

<Tweet tweetLink="https://twitter.com/jack/status/20" />
```

**Hasil (Live Preview):**

<Tweet tweetLink="https://twitter.com/jack/status/20" />

### Tombol (Button)
Gunakan komponen `Button` untuk Call to Action (CTA).

```html
<script>
  import Button from '$lib/components/Button.svelte';
</script>

<div class="flex gap-4 my-4">
  <Button href="#">Download File</Button>
  <Button variant="outline" href="#">Dokumentasi</Button>
</div>
```

<div class="flex gap-4 my-4">
  <Button href="#">Download File</Button>
  <Button variant="outline" href="#">Dokumentasi</Button>
</div>

---

## 6. SEO Best Practices

Agar tulisan Anda mudah ditemukan di Google:

1.  **Judul Menarik**: Gunakan kata kunci di awal judul. Hindari *clickbait* berlebihan.
2.  **Deskripsi Jelas**: Isi field `description` dengan rangkuman padat yang memancing klik.
3.  **URL (Slug)**: Nama file `.md` akan menjadi URL. Gunakan kata kunci, pisahkan dengan strip.
    - Buruk: `tulisan-saya-1.md`
    - Bagus: `cara-optimasi-seo-blog.md`
4.  **Alt Text Gambar**: Selalu isi deskripsi gambar dalam tanda kurung siku `![Deskripsi ini penting untuk SEO]`.

---

## 7. Troubleshooting

**Masalah**: *Halaman error 500 atau blank saat dibuka.*
**Solusi**:
- Cek format YAML di metadata. Pastikan indentasi benar dan tidak ada tanda petik yang lupa ditutup.
- Pastikan format tanggal benar `YYYY-MM-DD`.

**Masalah**: *Gambar tidak muncul.*
**Solusi**:
- Pastikan path diawali dengan `/`.
- Cek nama folder dan file (case-sensitive). `Foto.jpg` tidak sama dengan `foto.jpg`.

**Masalah**: *Komponen Svelte error.*
**Solusi**:
- Pastikan sudah import komponen di dalam tag `<script>` di paling atas file.
