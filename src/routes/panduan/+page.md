

# Panduan Penulisan Artikel

Blog ini menggunakan file Markdown (`.md`) untuk konten artikel. Berikut adalah panduan lengkap dan contoh format yang bisa digunakan.

---

## 1. Persiapan File

Buat file `.md` baru di dalam folder kategori dengan struktur tahun dan bulan:

- `src/content/pemikiran/[Tahun]/[Bulan]/` - Untuk opini atau pemikiran.
- `src/content/proses/[Tahun]/[Bulan]/` - Untuk dokumentasi teknis atau proses belajar.

> [!TIP]
> **Tips:** Gunakan script `npm run new` untuk membuat folder dan file secara otomatis.

## 2. Metadata (Frontmatter)

Setiap file **wajib** diawali dengan metadata di antara tiga tanda strip (`---`).

```yaml
---
title: "Judul Artikel Anda"
date: "2023-11-23"
category: "pemikiran" 
tags: ["tag1", "tag2"]
description: "Deskripsi singkat untuk SEO dan preview."
draft: false
---
```

> [!IMPORTANT]
> **Aturan Penting:**
> - **category**: Harus persis sama dengan nama folder ("pemikiran" atau "proses").
> - **date**: Gunakan format ISO `YYYY-MM-DD`.
> - **draft**: (Opsional) Set `true` jika artikel belum siap dipublikasikan.

## 3. Struktur & Format Konten

> [!CAUTION]
> **JANGAN gunakan Heading 1 (`# Judul`) di dalam konten!**
>
> Judul artikel sudah otomatis diambil dari metadata `title` dan ditampilkan sebagai H1.

### Heading (Judul Bagian)

Gunakan Heading 2 untuk bagian utama dan Heading 3 untuk sub-bagian.

| Markdown | Hasil |
| :--- | :--- |
| `## Bagian Utama` | **Bagian Utama** (H2) |
| `### Sub Bagian` | **Sub Bagian** (H3) |

### Format Teks

| Markdown | Hasil |
| :--- | :--- |
| `**Teks Tebal**` | **Teks Tebal** |
| `*Teks Miring*` | *Teks Miring* |
| `~~Teks Dicoret~~` | ~~Teks Dicoret~~ |
| `` `Kode Inline` `` | `Kode Inline` |

### Alerts (Kotak Info)

Anda bisa menggunakan syntax GitHub Alerts untuk membuat kotak informasi yang menarik.

> [!NOTE]
> Ini adalah `> [!NOTE]`. Berguna untuk informasi tambahan.

> [!TIP]
> Ini adalah `> [!TIP]`. Berguna untuk saran atau tips.

> [!IMPORTANT]
> Ini adalah `> [!IMPORTANT]`. Berguna untuk poin penting.

> [!WARNING]
> Ini adalah `> [!WARNING]`. Berguna untuk peringatan yang tidak kritis.

> [!CAUTION]
> Ini adalah `> [!CAUTION]`. Berguna untuk peringatan bahaya atau kesalahan fatal.

### Daftar (Lists)

**Unordered List:**
- Poin satu
- Poin dua
  - Sub poin

**Ordered List:**
1. Langkah pertama
2. Langkah kedua

### Daftar Tugas (Task Lists)

- [x] Tugas selesai
- [ ] Tugas belum selesai

### Kutipan (Blockquote)

> "Menulis adalah bekerja untuk keabadian."
>
> — Pramoedya Ananta Toer

### Kode (Code Block)

Gunakan tiga backtick (```) diikuti nama bahasa pemrogramannya.

```javascript
function sapa(nama) {
  console.log(`Halo, ${nama}!`);
}
```

### Gambar

Simpan gambar di folder `static/images/[kategori]/[Tahun]/[Bulan]/[Slug]/`. Panggil dengan path absolut yang dimulai dari `/images/...`.

```markdown
![Deskripsi Gambar](/images/proses/2025/12/judul-artikel/nama-file.jpg)
```

**Mengatur Ukuran dan Posisi:**
Tambahkan parameter di URL gambar:
- `?w=300` : Lebar (width)
- `?h=200` : Tinggi (height)
- `?a=center` : Posisi tengah
- `?a=left` : Posisi kiri
- `?a=right` : Posisi kanan

Contoh: `![Deskripsi](/path/img.jpg?w=300&a=center)`

### Tabel

```markdown
| Fitur | Status |
| :--- | :--- |
| Markdown | ✅ Oke |
| Svelte | ✅ Oke |
```

### Referensi / Catatan Kaki

Gunakan tanda kurung siku dengan angka `[^1]` untuk membuat referensi otomatis.

> [!NOTE]
> **Kapan menggunakan Link vs Footnote?**
>
> - **Link Biasa**: `[Google](https://google.com)` untuk navigasi umum.
> - **Footnote**: `[^1]` untuk referensi spesifik, sitasi, atau penjelasan tambahan.

Contoh penggunaan:
Menurut data[^1] yang valid...

[^1]: Judul Referensi

### Komponen Svelte

Anda bisa menggunakan komponen Svelte di dalam file Markdown. Pastikan untuk mengimpornya terlebih dahulu di dalam tag `<script>`.

```html
<script>
  import Button from '$lib/components/Button.svelte';
</script>

<Button>Klik Saya</Button>
```
