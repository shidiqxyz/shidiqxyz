import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime';

export async function load({ params }) {
    try {
        // Use category from URL to load the correct post
        const post = await import(`../../../../content/${params.category}/${params.slug}.md`);

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
                slug: params.slug,
                category: params.category,
                readingTime
            }
        };
    } catch (e) {
        throw error(404, `Could not find ${params.category}/${params.slug}`);
    }
}
