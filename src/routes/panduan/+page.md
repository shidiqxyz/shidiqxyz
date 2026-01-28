<script>
  import YouTube from '$lib/components/YouTube.svelte';
  import Button from '$lib/components/Button.svelte';
  import InlineToc from '$lib/components/InlineToc.svelte';
  import Tweet from '$lib/components/Tweet.svelte';
  import Mermaid from '$lib/components/Mermaid.svelte';

  const flowchartExample = `flowchart TD
    A[Kotak] --> B[Kotak Lain]
    B --> C{Keputusan}
    C -->|Ya| D[Hasil A]
    C -->|Tidak| E[Hasil B]`;

  const flowchartLR = `flowchart LR
    A[Start] --> B[Step 1]
    B --> C[Step 2]
    C --> D[End]`;

  const sequenceExample = `sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob!
    B-->>A: Hi Alice!`;

  const pieExample = `pie title Waktu Belajar
    "Coding" : 40
    "Membaca" : 30
    "Latihan" : 20
    "Istirahat" : 10`;
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
*Script ini akan meminta input Judul dan Kategori, lalu:*
1. Membuat file draft di `src/content/[kategori]/[tahun]/[bulan]/[slug].md`.
2. **Otomatis membuat folder gambar** di `static/images/[kategori]/[tahun]/[bulan]/[slug]/`.

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

### Tabel
Tabel data memiliki fitur **horizontal scroll** otomatis di layar kecil (HP), sehingga tidak akan merusak layout halaman.

| Fitur | Status | Keterangan |
| :--- | :--- | :--- |
| Responsive | ✅ | Scrollable di mobile |
| Styling | ✅ | Minimalis & bersih |

### Kutipan (Blockquote)
Gunakan `>` untuk mengutip kalimat penting atau memberikan catatan.

> "Kode adalah puisi yang dieksekusi oleh mesin."

---

## 4. Manajemen Gambar

Blog ini memiliki sistem optimasi gambar otomatis. Simpan gambar Anda di folder `static/images/`.

### Struktur Folder Gambar
Tidak perlu repot membuat folder manual. Saat Anda menjalankan `npm run new`, sistem **otomatis membuatkan folder khusus** untuk gambar artikel tersebut.

Silakan cek output terminal untuk melihat lokasi foldernya, lalu letakkan semua gambar artikel di sana.

Struktur path otomatis:
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

### Simbol Matematika (LaTeX)
Blog ini mendukung penulisan simbol matematika menggunakan sintaks **LaTeX** (via KaTeX). Berikut adalah panduan lengkap berdasarkan kategori penggunaannya.

#### 1. Dasar LaTeX
Konsep fundamental untuk menulis matematika.

**Pangkat & Indeks**
Gunakan `^` untuk pangkat dan `_` untuk indeks (subscript).
- `$x^2$` → $x^2$
- `$a_1$` → $a_1$
- `$x^{2a}$` → $x^{2a}$ (Gunakan `{}` jika lebih dari satu karakter)

**Pecahan**
Gunakan `\frac{pembilang}{penyebut}`.
- `\frac{1}{2}` → $\frac{1}{2}$
- `\frac{a+b}{c}` → $\frac{a+b}{c}$

**Akar**
Gunakan `\sqrt{}`.
- `\sqrt{x}` → $\sqrt{x}$
- `\sqrt[3]{27}` → $\sqrt[3]{27}$ (Akar pangkat 3)

#### 2. Operator Matematika
Simbol-simbol operasi aritmatika dan relasi.

| Jenis | Simbol | Kode LaTeX |
| :--- | :--- | :--- |
| **Aritmatika** | $\times$ | `\times` |
| | $\div$ | `\div` |
| | $\pm$ | `\pm` |
| | $\cdot$ | `\cdot` |
| **Dasar** | $<$ | `$<$` atau `&lt;` |
| | $>$ | `$>$` atau `&gt;` |
| **Relasi** | $\leq$ | `\leq` |
| | $\geq$ | `\geq` |
| | $\neq$ | `\neq` |
| | $\approx$ | `\approx` |
| **Khusus** | $\sum$ | `\sum` (Sigma) |
| | $\prod$ | `\prod` (Product) |

#### 3. Notasi Khusus (Kalkulus)
Penulisan limit, turunan, dan integral.

**Limit**
Gunakan `\lim_{x \to \infty}`.

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

Kode:
```latex
$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$
```

**Integral**
Gunakan `\int` untuk integral tak tentu dan `\int_{a}^{b}` untuk integral tentu.
$$ \int_{0}^{1} x^2 dx $$
Kode:
```latex
$$ \int_{0}^{1} x^2 dx $$
```

**Turunan (Fraksi)**
$$ f'(x) = 2x $$
Kode:
```latex
$$ f'(x) = 2x $$
```

#### 4. Matriks

**Matriks**
- `bmatrix`: Kurung siku `[]`
- `pmatrix`: Kurung biasa `()`

Contoh `bmatrix`:
$$
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$
Kode:
```latex
$$
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$
```

<!-- Sistem Persamaan (Cases) sementara dinonaktifkan karena isu parser -->

#### 5. Simbol Yunani & Khusus
Huruf Yunani sering digunakan sebagai variabel dalam fisika dan matematika.

| Nama | Huruf Kecil | Kode | Huruf Besar | Kode |
| :--- | :--- | :--- | :--- | :--- |
| Alpha | $\alpha$ | `\alpha` | | |
| Beta | $\beta$ | `\beta` | | |
| Theta | $\theta$ | `\theta` | $\Theta$ | `\Theta` |
| Pi | $\pi$ | `\pi` | $\Pi$ | `\Pi` |
| Lambda | $\lambda$ | `\lambda` | $\Lambda$ | `\Lambda` |
| Sigma | $\sigma$ | `\sigma` | $\Sigma$ | `\Sigma` |
| Delta | $\delta$ | `\delta` | $\Delta$ | `\Delta` |
| Infinity | $\infty$ | `\infty` | | |

---

## 6. Mermaid Flowchart

Blog ini mendukung diagram flowchart interaktif menggunakan Mermaid. **Klik diagram untuk zoom fullscreen**.

### Cara Penggunaan

Definisikan chart di dalam tag `<script>` sebagai variable, lalu panggil komponen `<Mermaid />`.

```html
<script>
  import Mermaid from '$lib/components/Mermaid.svelte';

  const myChart = `flowchart TD
    A[Start] --> B[Process]
    B --> C[End]`;
</script>

<Mermaid chart={myChart} />
```

> ⚠️ **Penting:** Definisi chart HARUS ada di dalam `<script>` tag untuk menghindari error parsing mdsvex.

### Contoh Flowchart (Top-Down)

```
flowchart TD
    A[Kotak] --> B[Kotak Lain]
    B --> C{Keputusan}
    C -->|Ya| D[Hasil A]
    C -->|Tidak| E[Hasil B]
```

<Mermaid chart={flowchartExample} />

### Contoh Flowchart (Left-Right)

```
flowchart LR
    A[Start] --> B[Step 1]
    B --> C[Step 2]
    C --> D[End]
```

<Mermaid chart={flowchartLR} />

### Sequence Diagram

```
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob!
    B-->>A: Hi Alice!
```

<Mermaid chart={sequenceExample} />

### Pie Chart

```
pie title Waktu Belajar
    "Coding" : 40
    "Membaca" : 30
    "Latihan" : 20
    "Istirahat" : 10
```

<Mermaid chart={pieExample} />

### Bentuk Node

| Sintaks | Bentuk |
|---------|--------|
| `A[Text]` | Kotak |
| `A(Text)` | Kotak bulat |
| `A([Text])` | Stadium |
| `A{Text}` | Diamond/Keputusan |
| `A{{Text}}` | Hexagon |
| `A[[Text]]` | Subroutine |
| `A[(Text)]` | Database |

### Jenis Panah

| Sintaks | Deskripsi |
|---------|-----------|
| `-->` | Panah solid |
| `---` | Garis tanpa panah |
| `-.->` | Panah putus-putus |
| `==>` | Panah tebal |
| `--text-->` | Panah dengan label |

### Arah Flowchart

| Kode | Arah |
|------|------|
| `TD` / `TB` | Top to Down/Bottom |
| `BT` | Bottom to Top |
| `LR` | Left to Right |
| `RL` | Right to Left |

### Tips
1. Nama node harus unik (A, B, C, atau nama deskriptif)
2. Klik diagram untuk **zoom fullscreen**
3. Tekan **Escape** untuk menutup zoom
4. Preview diagram di [Mermaid Live Editor](https://mermaid.live/)

---

## 7. SEO Best Practices

Agar tulisan Anda mudah ditemukan di Google:

1.  **Judul Menarik**: Gunakan kata kunci di awal judul. Hindari *clickbait* berlebihan.
2.  **Deskripsi Jelas**: Isi field `description` dengan rangkuman padat yang memancing klik.
3.  **URL (Slug)**: Nama file `.md` akan menjadi URL. Gunakan kata kunci, pisahkan dengan strip.
    - Buruk: `tulisan-saya-1.md`
    - Bagus: `cara-optimasi-seo-blog.md`
4.  **Alt Text Gambar**: Selalu isi deskripsi gambar dalam tanda kurung siku `![Deskripsi ini penting untuk SEO]`.

---

## 8. Troubleshooting

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
