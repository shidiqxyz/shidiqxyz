import { getPostsByCategory } from '$lib/utils/posts';

export async function load() {
    const posts = await getPostsByCategory('proses');
    return { posts };
}
