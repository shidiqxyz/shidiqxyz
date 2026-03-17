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

export async function getPosts() {
    let posts: Post[] = [];

    // Optimize: only import 'metadata' eagerly to keep bundle small
    const paths = import.meta.glob('/src/content/**/*.md', { eager: true, import: 'metadata' });

    for (const path in paths) {
        const metadata = paths[path] as any;
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
    const modules = import.meta.glob('/src/content/**/*.md');
    const rawModules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default' });

    for (const path in modules) {
        const pathParts = path.split('/');
        const filename = pathParts.at(-1);
        const fileSlug = filename === 'index.md' ? pathParts.at(-2) : filename?.replace('.md', '');
        const fileCategory = pathParts[3];

        if (fileSlug === slug && fileCategory === category) {
            const [post, rawContent] = await Promise.all([
                modules[path](),
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
