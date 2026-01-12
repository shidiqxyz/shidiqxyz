/**
 * Script untuk mengoptimasi semua gambar ke WebP
 * Mendukung: GIF, PNG, JPG, JPEG
 * 
 * Usage: node scripts/optimize-images.js [options]
 * 
 * Options:
 *   --dry-run       Tampilkan file yang akan dikonversi tanpa eksekusi
 *   --keep-original Jangan hapus file asli setelah konversi
 *   --quality=N     Set kualitas WebP (1-100, default: 80)
 *   --min-size=N    Minimum ukuran file GIF untuk dikonversi dalam KB (default: 500)
 *   --gif-only      Hanya konversi GIF
 *   --static-only   Hanya konversi gambar statis (PNG, JPG)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi
const STATIC_DIR = path.join(__dirname, '..', 'static');
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const KEEP_ORIGINAL = args.includes('--keep-original');
const GIF_ONLY = args.includes('--gif-only');
const STATIC_ONLY = args.includes('--static-only');
const qualityArg = args.find(a => a.startsWith('--quality='));
const QUALITY = qualityArg ? parseInt(qualityArg.split('=')[1]) : 80;
const minSizeArg = args.find(a => a.startsWith('--min-size='));
const MIN_GIF_SIZE_KB = minSizeArg ? parseInt(minSizeArg.split('=')[1]) : 500;
const MIN_GIF_SIZE_BYTES = MIN_GIF_SIZE_KB * 1024;

// Extension kategorisasi
const ANIMATED_EXTENSIONS = ['.gif'];
const STATIC_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const ALL_EXTENSIONS = [...ANIMATED_EXTENSIONS, ...STATIC_EXTENSIONS];

// Warna untuk console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Rekursif mencari semua file gambar dalam direktori
 */
async function findImageFiles(dir, extensions) {
    const imageFiles = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subImages = await findImageFiles(fullPath, extensions);
                imageFiles.push(...subImages);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (extensions.includes(ext)) {
                    imageFiles.push(fullPath);
                }
            }
        }
    } catch (err) {
        // Directory tidak ada, abaikan
    }

    return imageFiles;
}

/**
 * Mengecek apakah ffmpeg tersedia
 */
async function checkFfmpeg() {
    try {
        await execAsync('ffmpeg -version');
        return true;
    } catch {
        return false;
    }
}

/**
 * Konversi GIF animasi ke WebP menggunakan ffmpeg
 */
async function convertAnimatedToWebp(inputPath, quality) {
    const webpPath = inputPath.replace(/\.(gif)$/i, '.webp');

    const cmd = `ffmpeg -y -i "${inputPath}" -vcodec libwebp -lossless 0 -compression_level 6 -q:v ${quality} -loop 0 -preset default -an -vsync 0 "${webpPath}"`;

    await execAsync(cmd);
    return webpPath;
}

/**
 * Konversi gambar statis (PNG, JPG) ke WebP menggunakan ffmpeg
 */
async function convertStaticToWebp(inputPath, quality) {
    const webpPath = inputPath.replace(/\.(png|jpe?g)$/i, '.webp');

    // Untuk gambar statis, gunakan konfigurasi berbeda
    const cmd = `ffmpeg -y -i "${inputPath}" -vcodec libwebp -lossless 0 -compression_level 6 -q:v ${quality} "${webpPath}"`;

    await execAsync(cmd);
    return webpPath;
}

/**
 * Mendapatkan ukuran file dalam format yang readable
 */
async function getFileSize(filePath) {
    try {
        const stats = await fs.stat(filePath);
        const bytes = stats.size;

        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } catch {
        return 'N/A';
    }
}

/**
 * Mendapatkan ukuran file dalam bytes
 */
async function getFileSizeBytes(filePath) {
    try {
        const stats = await fs.stat(filePath);
        return stats.size;
    } catch {
        return 0;
    }
}

/**
 * Update referensi dalam file markdown
 */
async function updateMarkdownReferences(originalPath) {
    const originalFilename = path.basename(originalPath);
    const ext = path.extname(originalFilename);
    const webpFilename = originalFilename.replace(ext, '.webp');

    const mdFiles = await findMarkdownFiles(CONTENT_DIR);
    let updatedFiles = [];

    for (const mdFile of mdFiles) {
        let content = await fs.readFile(mdFile, 'utf-8');

        // Escape special regex characters in filename
        const escapedFilename = originalFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(escapedFilename, 'gi');

        if (pattern.test(content)) {
            content = content.replace(pattern, webpFilename);
            await fs.writeFile(mdFile, content, 'utf-8');
            updatedFiles.push(mdFile);
        }
    }

    return updatedFiles;
}

/**
 * Mencari semua file markdown
 */
async function findMarkdownFiles(dir) {
    const mdFiles = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subMds = await findMarkdownFiles(fullPath);
                mdFiles.push(...subMds);
            } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.svx'))) {
                mdFiles.push(fullPath);
            }
        }
    } catch {
        // Ignore errors
    }

    return mdFiles;
}

/**
 * Cek apakah file adalah animasi
 */
function isAnimated(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return ANIMATED_EXTENSIONS.includes(ext);
}

/**
 * Format bytes ke readable string
 */
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Main function
 */
async function main() {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║      🖼️  Image Optimizer - Convert to WebP            ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    // Cek ffmpeg
    log('🔍 Mengecek ffmpeg...', 'blue');
    const hasFfmpeg = await checkFfmpeg();

    if (!hasFfmpeg) {
        log('\n❌ ffmpeg tidak ditemukan!', 'red');
        log('\nInstall ffmpeg terlebih dahulu:', 'yellow');
        log('  Windows: winget install ffmpeg', 'dim');
        log('  Mac:     brew install ffmpeg', 'dim');
        log('  Linux:   sudo apt install ffmpeg', 'dim');
        process.exit(1);
    }

    log('✓ ffmpeg tersedia\n', 'green');

    // Tentukan extension yang akan diproses
    let extensionsToProcess = ALL_EXTENSIONS;
    if (GIF_ONLY) {
        extensionsToProcess = ANIMATED_EXTENSIONS;
    } else if (STATIC_ONLY) {
        extensionsToProcess = STATIC_EXTENSIONS;
    }

    // Cari semua gambar
    log('🔍 Mencari file gambar...', 'blue');
    const imageFiles = await findImageFiles(STATIC_DIR, extensionsToProcess);

    if (imageFiles.length === 0) {
        log('✓ Tidak ada file gambar ditemukan.', 'green');
        process.exit(0);
    }

    // Kategorisasi file
    const gifFiles = imageFiles.filter(f => isAnimated(f));
    const staticFiles = imageFiles.filter(f => !isAnimated(f));

    log(`✓ Ditemukan ${imageFiles.length} file gambar:`, 'green');
    if (gifFiles.length > 0) log(`  └─ GIF animasi: ${gifFiles.length}`, 'cyan');
    if (staticFiles.length > 0) log(`  └─ Statis (PNG/JPG): ${staticFiles.length}`, 'magenta');
    console.log('');

    // Mode konfigurasi
    if (DRY_RUN) {
        log('📋 Mode: DRY RUN (tidak ada perubahan)\n', 'yellow');
    }
    log(`⚙️  Quality: ${QUALITY}`, 'dim');
    log(`⚙️  Keep Original: ${KEEP_ORIGINAL ? 'Ya' : 'Tidak'}`, 'dim');
    log(`⚙️  Min GIF Size: ${MIN_GIF_SIZE_KB} KB`, 'dim');
    console.log('');

    // Proses setiap gambar
    let totalOriginalBytes = 0;
    let totalWebpBytes = 0;
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < imageFiles.length; i++) {
        const imagePath = imageFiles[i];
        const relativePath = path.relative(STATIC_DIR, imagePath);
        const ext = path.extname(imagePath).toLowerCase();
        const progress = `[${i + 1}/${imageFiles.length}]`;
        const typeLabel = isAnimated(imagePath) ? '🎬' : '🖼️';

        log(`${progress} ${typeLabel} ${relativePath}`, 'blue');

        const originalSize = await getFileSizeBytes(imagePath);
        totalOriginalBytes += originalSize;

        // Skip GIF di bawah threshold
        if (isAnimated(imagePath) && originalSize < MIN_GIF_SIZE_BYTES) {
            log(`  └─ ⏭️  Skipped: GIF < ${MIN_GIF_SIZE_KB} KB (${formatBytes(originalSize)})`, 'yellow');
            skippedCount++;
            continue;
        }

        if (DRY_RUN) {
            log(`  └─ Size: ${formatBytes(originalSize)}`, 'dim');
            continue;
        }

        try {
            let webpPath;

            // Pilih metode konversi berdasarkan tipe
            if (isAnimated(imagePath)) {
                webpPath = await convertAnimatedToWebp(imagePath, QUALITY);
            } else {
                webpPath = await convertStaticToWebp(imagePath, QUALITY);
            }

            const webpSize = await getFileSizeBytes(webpPath);
            totalWebpBytes += webpSize;

            // Cek apakah WebP lebih besar dari asli
            if (webpSize >= originalSize) {
                // WebP lebih besar, skip dan hapus WebP
                await fs.unlink(webpPath);
                log(`  └─ ⏭️  Skipped: WebP lebih besar (${formatBytes(originalSize)} → ${formatBytes(webpSize)})`, 'yellow');
                totalWebpBytes -= webpSize;
                totalWebpBytes += originalSize; // Keep original size in total
                skippedCount++;
                continue;
            }

            const savedBytes = originalSize - webpSize;
            const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

            log(`  └─ ✓ ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savedPercent}% saved)`, 'green');

            // Update referensi markdown
            const updatedMds = await updateMarkdownReferences(imagePath);
            if (updatedMds.length > 0) {
                log(`  └─ ✓ Updated ${updatedMds.length} markdown file(s)`, 'green');
            }

            // Hapus file asli jika tidak --keep-original
            if (!KEEP_ORIGINAL) {
                await fs.unlink(imagePath);
                log(`  └─ ✓ Removed original`, 'dim');
            }

            successCount++;
        } catch (err) {
            log(`  └─ ❌ Error: ${err.message}`, 'red');
            errorCount++;
        }
    }

    // Summary
    console.log('\n' + '═'.repeat(50));
    log('\n📊 Summary:', 'blue');
    log(`  ✓ Converted: ${successCount} files`, 'green');
    if (skippedCount > 0) {
        log(`  ⏭️  Skipped: ${skippedCount} files (WebP larger)`, 'yellow');
    }
    if (errorCount > 0) {
        log(`  ✗ Errors: ${errorCount} files`, 'red');
    }

    if (!DRY_RUN && successCount > 0) {
        const savedBytes = totalOriginalBytes - totalWebpBytes;
        const savedPercent = ((savedBytes / totalOriginalBytes) * 100).toFixed(1);
        log(`\n  📦 Original total: ${formatBytes(totalOriginalBytes)}`, 'dim');
        log(`  📦 After WebP: ${formatBytes(totalWebpBytes)}`, 'dim');
        log(`  💾 Total saved: ${formatBytes(savedBytes)} (${savedPercent}%)`, 'green');
    } else if (DRY_RUN) {
        log(`\n  📦 Total size to optimize: ${formatBytes(totalOriginalBytes)}`, 'dim');
    }
    console.log('');
}

main().catch(console.error);
