export interface Post {
    title: string;
    date: string;
    description: string;
    category: string;
    tags: string[];
    slug: string;
    content: string;
    draft?: boolean;
}

export async function getPosts() {
    let posts: Post[] = [];

    // Use recursive glob to find all markdown files in any subdirectory
    const paths = import.meta.glob('/src/content/**/*.md', { eager: true });

    // For raw content, we also need to match the same recursive pattern
    // Note: In newer Vite, we might not need the second glob if we don't use 'content' string directly from it here,
    // but preserving original logic structure.
    const rawPaths = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default', eager: true });

    for (const path in paths) {
        const file = paths[path];
        // Slug is just the filename without extension
        const slug = path.split('/').at(-1)?.replace('.md', '');

        // Category is always the folder directly under /src/content/
        // path example: /src/content/proses/2025/12/pag.md -> parts[3] is 'proses'
        // path example: /src/content/pemikiran/idea.md -> parts[3] is 'pemikiran'
        const pathParts = path.split('/');
        const category = pathParts[3];

        const content = rawPaths[path];

        if (file && typeof file === 'object' && 'metadata' in file && slug && category) {
            const metadata = file.metadata as Omit<Post, 'slug' | 'category' | 'content'>;

            // Skip drafts in production
            if (metadata.draft && !import.meta.env.DEV) {
                continue;
            }

            const post = { ...metadata, slug, category, content } as Post;
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
