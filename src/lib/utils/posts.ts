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
        // Support both folder structure (index.md) and legacy file structure
        const pathParts = path.split('/');
        const filename = pathParts.at(-1);
        const slug = filename === 'index.md'
            ? pathParts.at(-2)  // folder name for colocation structure
            : filename?.replace('.md', '');  // legacy: filename without extension

        // Category is always the folder directly under /src/content/
        // path example: /src/content/proses/post-name/index.md -> parts[3] is 'proses'
        // path example: /src/content/pemikiran/idea.md -> parts[3] is 'pemikiran'
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
