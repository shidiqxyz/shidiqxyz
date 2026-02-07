import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime';
import { getPostsByCategory } from '$lib/utils/posts';

/**
 * Mengekstrak URL gambar pertama dari konten markdown.
 * Jika path gambar adalah relatif (dimulai dengan ./), maka akan diubah menjadi absolute path
 * yang mengarah ke folder static content yang sesuai.
 */
function extractFirstImage(content: string, postPath: string): string | null {
    // Regex untuk mencocokkan gambar markdown: ![alt](url)
    const imageRegex = /!\[[^\]]*\]\(([^)\s]+)/;
    const match = content.match(imageRegex);

    if (match && match[1]) {
        let imageUrl = match[1];
        // Hapus query params seperti ?width=600&a=center
        imageUrl = imageUrl.split('?')[0];

        // Jika URL adalah eksternal (http) atau sudah absolute path (/), kembalikan apa adanya
        if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) {
            return imageUrl;
        }

        // Jika URL adalah relatif (./ atau nama-file.jpg)
        // Hilangkan ./ di awal jika ada
        const cleanImageUrl = imageUrl.replace(/^\.\//, '');

        // Dapatkan path relatif dari folder /src/content/
        // postPath: /src/content/proses/2026/02/01/proses-hari-ke-57/index.md
        // Kita butuh bagian: proses/2026/02/01/proses-hari-ke-57/
        const contentBase = '/src/content/';
        if (postPath.startsWith(contentBase)) {
            const relativeDir = postPath
                .substring(contentBase.length)
                .split('/')
                .slice(0, -1)
                .join('/');

            // Gambar yang dikolokasi disajikan dari /content/ di static
            return `/content/${relativeDir}/${cleanImageUrl}`;
        }

        return imageUrl;
    }

    return null;
}

export async function load({ params }) {
    // 1. Find the file path using glob, same as we do in posts.ts
    const modules = import.meta.glob('/src/content/**/*.md');
    // Also get raw content for extracting first image
    const rawModules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default', eager: true });

    let matchPath: string | undefined;

    for (const path in modules) {
        // Support both folder structure (index.md) and legacy file structure
        const pathParts = path.split('/');
        const filename = pathParts.at(-1);
        const fileSlug = filename === 'index.md'
            ? pathParts.at(-2)  // folder name for colocation structure
            : filename?.replace('.md', '');  // legacy: filename without extension

        // Check if category matches (must be the top-level folder under content)
        // path: /src/content/proses/post-name/index.md -> parts[3] = proses
        const fileCategory = pathParts[3];

        if (fileSlug === params.slug && fileCategory === params.category) {
            matchPath = path;
            break;
        }
    }

    if (!matchPath) {
        throw error(404, `Could not find ${params.category}/${params.slug}`);
    }

    const post = await modules[matchPath]() as any;
    const rawContent = rawModules[matchPath] as string;

    // Ekstrak gambar pertama dari konten markdown dengan menyertakan matchPath untuk resolusi URL
    const firstImage = extractFirstImage(rawContent, matchPath);


    try {
        // Use reading time from metadata (remark plugin) or calculate it manually as fallback
        let readingTime = post.metadata.readingTime;

        if (!readingTime) {
            try {
                const rendered = post.default.render();
                if (rendered && rendered.html) {
                    readingTime = calculateReadingTime(rendered.html);
                }
            } catch {
                // If render fails and no metadata, default to 0
                readingTime = 0;
            }
        }

        // Get all posts from the same category for prev/next navigation
        const categoryPosts = await getPostsByCategory(params.category);
        const currentIndex = categoryPosts.findIndex(p => p.slug === params.slug);

        // Posts are sorted by date (newest first), so:
        // - previous = older post = higher index
        // - next = newer post = lower index
        const prevPost = currentIndex < categoryPosts.length - 1
            ? { title: categoryPosts[currentIndex + 1].title, slug: categoryPosts[currentIndex + 1].slug }
            : null;
        const nextPost = currentIndex > 0
            ? { title: categoryPosts[currentIndex - 1].title, slug: categoryPosts[currentIndex - 1].slug }
            : null;

        return {
            content: post.default,
            meta: {
                ...post.metadata,
                slug: params.slug,
                category: params.category,
                readingTime,
                firstImage
            },
            prevPost,
            nextPost
        };
    } catch (e) {
        throw error(500, `Error loading post: ${e}`);
    }
}
