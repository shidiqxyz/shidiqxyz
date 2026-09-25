import { getPosts } from '$lib/utils/posts';

export const prerender = false;

export async function load() {
    const posts = await getPosts();
    // Ship a minimal search index instead of full post objects
    return {
        posts: posts.map((post) => ({
            title: post.title,
            description: post.description,
            tags: post.tags ?? [],
            date: post.date,
            category: post.category,
            slug: post.slug
        }))
    };
}
