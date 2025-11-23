import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime';

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

        // Calculate reading time from the component
        let readingTime = 0;
        try {
            const rendered = post.default.render();
            if (rendered && rendered.html) {
                readingTime = calculateReadingTime(rendered.html);
            }
        } catch {
            // If render fails, default to 0
            readingTime = 0;
        }

        return {
            content: post.default,
            meta: {
                ...post.metadata,
                readingTime
            }
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`);
    }
}
