import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content');
const STATIC_IMAGES_DIR = path.join(__dirname, '../static/images');

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

async function main() {
    console.log('--- Buat Artikel Baru ---');

    // 1. Title (Required)
    let title = '';
    while (!title) {
        title = await question('Judul Artikel: ');
        if (!title) console.log('Judul tidak boleh kosong!');
    }

    // 2. Category (Required, default to pemikiran if empty? No, user said input user)
    // Let's show available categories
    const categories = fs.readdirSync(CONTENT_DIR).filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
    console.log(`Kategori tersedia: ${categories.join(', ')}`);

    let category = '';
    while (!category) {
        category = await question(`Kategori (${categories[0]}): `);
        if (!category) category = categories[0]; // Default to first category

        // Check if category exists
        if (!fs.existsSync(path.join(CONTENT_DIR, category))) {
            const create = await question(`Kategori "${category}" belum ada. Buat baru? (y/n): `);
            if (create.toLowerCase() !== 'y') {
                category = '';
            }
        }
    }

    // 3. Description (Optional)
    const description = await question('Deskripsi (Optional): ');

    // 4. Tags (Optional)
    const tagsInput = await question('Tags (pisahkan dengan koma, Optional): ');
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

    // 5. Date (Automatic)
    const dateStr = formatDate(new Date());

    // Generate Content
    const slug = slugify(title);
    const filename = `${slug}.md`;
    const targetDir = path.join(CONTENT_DIR, category);
    const targetPath = path.join(targetDir, filename);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    if (fs.existsSync(targetPath)) {
        console.error(`\nError: File ${filename} sudah ada di kategori ${category}!`);
        rl.close();
        process.exit(1);
    }

    const content = `---
title: "${title}"
date: "${dateStr}"
category: "${category}"
tags: ${JSON.stringify(tags)}
description: "${description}"
draft: false
---

`;

    fs.writeFileSync(targetPath, content);

    // Create corresponding images folder in static/images/{category}/{slug}
    const imageDir = path.join(STATIC_IMAGES_DIR, category, slug);
    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
        console.log(`📁 Folder gambar dibuat: ${imageDir}`);
    }

    console.log(`\n✅ Artikel berhasil dibuat!`);
    console.log(`📂 Path: ${targetPath}`);

    rl.close();
}

main().catch(err => {
    console.error(err);
    rl.close();
});
