import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime';
import { getPostsByCategory } from '$lib/utils/posts';

/**
 * Mengekstrak URL gambar pertama dari konten markdown
 * Format yang didukung: ![alt](url) atau ![alt](url?params)
 */
function extractFirstImage(content: string): string | null {
    // Regex untuk mencocokkan gambar markdown: ![alt](url)
    const imageRegex = /!\[[^\]]*\]\(([^)\s]+)/;
    const match = content.match(imageRegex);

    if (match && match[1]) {
        let imageUrl = match[1];
        // Hapus query params seperti ?width=600&a=center
        imageUrl = imageUrl.split('?')[0];
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
        // Check if slug matches
        const fileSlug = path.split('/').at(-1)?.replace('.md', '');

        // Check if category matches (must be the top-level folder under content)
        // path: /src/content/process/2025/12/slug.md -> parts[3] = process
        const pathParts = path.split('/');
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

    // Ekstrak gambar pertama dari konten markdown
    const firstImage = extractFirstImage(rawContent);

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
