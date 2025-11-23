import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        // Try to find the post in both categories
        let post;
        try {
            post = await import(`../../../content/pemikiran/${params.slug}.md`);
        } catch {
            try {
                post = await import(`../../../content/proses/${params.slug}.md`);
            } catch {
                throw error(404, `Could not find ${params.slug}`);
            }
        }

        return {
            content: post.default,
            meta: post.metadata
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`);
    }
}
