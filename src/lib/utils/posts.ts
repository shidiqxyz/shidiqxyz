export interface Post {
    title: string;
    date: string;
    description: string;
    category: string;
    tags: string[];
    slug: string;
    draft?: boolean;
    readingTime?: number;
}

// Hoisted: import.meta.glob is resolved at build time, so create the maps once.
const metaModules = import.meta.glob('/src/content/**/*.md', { eager: true, import: 'metadata' });
const contentModules = import.meta.glob('/src/content/**/*.md');
const rawModules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default' });

let postsCache: Post[] | null = null;

export async function getPosts() {
    if (postsCache) return postsCache;

    let posts: Post[] = [];

    for (const path in metaModules) {
        const metadata = metaModules[path] as any;
        if (!metadata) continue;

        const pathParts = path.split('/');
        const filename = pathParts.at(-1);
        const slug = filename === 'index.md'
            ? pathParts.at(-2)
            : filename?.replace('.md', '');

        const category = pathParts[3];

        if (slug && category) {
            // Skip drafts in production
            if (metadata.draft && !import.meta.env.DEV) {
                continue;
            }

            const post = { ...metadata, slug, category } as Post;
            posts.push(post);
        }
    }

    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );

    postsCache = posts;
    return posts;
}

export async function getPostsByCategory(category: string) {
    const posts = await getPosts();
    return posts.filter((post) => post.category === category);
}

/**
 * Dynamically imports post content and raw source only when needed.
 */
export async function getPostContent(category: string, slug: string) {
    for (const path in contentModules) {
        const pathParts = path.split('/');
        const filename = pathParts.at(-1);
        const fileSlug = filename === 'index.md' ? pathParts.at(-2) : filename?.replace('.md', '');
        const fileCategory = pathParts[3];

        if (fileSlug === slug && fileCategory === category) {
            const [post, rawContent] = await Promise.all([
                contentModules[path](),
                rawModules[path]()
            ]);
            return {
                content: (post as any).default,
                metadata: (post as any).metadata,
                rawContent: rawContent as string,
                path
            };
        }
    }
    return null;
}
