export interface Post {
    title: string;
    date: string;
    description: string;
    category: string;
    tags: string[];
    slug: string;
}

export async function getPosts() {
    let posts: Post[] = [];

    const paths = import.meta.glob('/src/content/*/*.md', { eager: true });

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');
        const category = path.split('/').at(-2);

        if (file && typeof file === 'object' && 'metadata' in file && slug && category) {
            const metadata = file.metadata as Omit<Post, 'slug' | 'category'>;
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
