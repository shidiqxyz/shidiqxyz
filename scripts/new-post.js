import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

function formatDate(date) {
    const pad = (n) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getWeekOfMonth(day) {
    // Week 1: day 1-7, Week 2: day 8-14, etc.
    return Math.ceil(day / 7).toString().padStart(2, '0');
}

async function main() {
    console.log('--- Buat Artikel Baru ---\n');

    // 1. Title (Required)
    let title = '';
    while (!title) {
        title = await question('Judul Artikel: ');
        if (!title) console.log('Judul tidak boleh kosong!');
    }

    // 2. Category (Required)
    const categories = fs.readdirSync(CONTENT_DIR).filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
    console.log('Kategori tersedia:');
    categories.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));

    let category = '';
    while (!category) {
        const answer = (await question(`Pilih kategori [1-${categories.length}] atau ketik nama (${categories[0]}): `)).trim().toLowerCase();
        if (!answer) {
            category = categories[0]; // Default to first category
        } else if (/^\d+$/.test(answer)) {
            const idx = parseInt(answer, 10) - 1;
            if (idx >= 0 && idx < categories.length) category = categories[idx];
            else console.log('Nomor kategori tidak valid!');
        } else if (categories.includes(answer)) {
            category = answer;
        } else {
            // Kategori baru (mis. writeup saat belum ada foldernya)
            const create = await question(`Kategori "${answer}" belum ada. Buat baru? (y/n): `);
            if (create.toLowerCase() === 'y') category = answer;
        }
    }

    // 3. Description (Optional, tanpa titik akhir)
    const descriptionInput = await question('Deskripsi (Optional): ');
    let description = descriptionInput.trim();
    while (description.endsWith('.')) {
        description = description.slice(0, -1).trim();
    }

    // 4. Tags (Optional)
    const tagsInput = await question('Tags (pisahkan dengan koma, Optional): ');
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

    // 5. Date (Automatic)
    const date = new Date();
    const dateStr = formatDate(date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const week = getWeekOfMonth(date.getDate());

    // Generate slug
    const slug = slugify(title);

    // Create nested path: src/content/{category}/{year}/{month}/{week}/{slug}/
    // Using colocation structure: folder with index.md + images
    const postDir = path.join(CONTENT_DIR, category, year, month, week, slug);
    const targetPath = path.join(postDir, 'index.md');

    if (fs.existsSync(postDir)) {
        console.error(`\nError: Folder ${slug} sudah ada di ${category}/${year}/${month}/${week}/!`);
        rl.close();
        process.exit(1);
    }

    // Create post folder
    fs.mkdirSync(postDir, { recursive: true });

    const safeTitle = title.replace(/"/g, '\\"');
    const safeDescription = description.replace(/"/g, '\\"');
    const content = `---
title: "${safeTitle}"
date: "${dateStr}"
category: "${category}"
tags: ${JSON.stringify(tags)}
description: "${safeDescription}"
draft: false
---

`;

    fs.writeFileSync(targetPath, content);

    console.log(`\n✅ Artikel berhasil dibuat!`);
    console.log(`📂 Path: ${postDir}`);
    console.log(`📝 File: ${targetPath}`);
    console.log(`\n📸 Gambar simpan di folder yang sama: ${postDir}`);
    console.log(`   Referensi gambar dengan: ![alt](./nama-gambar.jpg)`);

    rl.close();
}

main().catch(err => {
    console.error(err);
    rl.close();
});
