/**
 * Copy Colocated Images to Static
 * 
 * Copies all images from src/content/ to static/content/ for production builds.
 * Run before build: node scripts/copy-content-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const STATIC_CONTENT_DIR = path.join(ROOT, 'static', 'content');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

function copyImages(srcDir, destDir) {
    let copied = 0;

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            copied += copyImages(srcPath, destPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTENSIONS.includes(ext)) {
                // Create destination directory if needed
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }
                fs.copyFileSync(srcPath, destPath);
                console.log(`  Copied: ${entry.name}`);
                copied++;
            }
        }
    }

    return copied;
}

async function main() {
    console.log('=== Copying Content Images to Static ===\n');

    // Clean existing static/content if exists
    if (fs.existsSync(STATIC_CONTENT_DIR)) {
        fs.rmSync(STATIC_CONTENT_DIR, { recursive: true });
        console.log('Cleaned existing static/content/\n');
    }

    const copied = copyImages(CONTENT_DIR, STATIC_CONTENT_DIR);

    console.log(`\n=== Complete ===`);
    console.log(`Total images copied: ${copied}`);
}

main().catch(console.error);
