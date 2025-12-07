import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime';
import { getPostsByCategory } from '$lib/utils/posts';

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

        // Get all posts from the same category for prev/next navigation
        const categoryPosts = await getPostsByCategory(params.category);
        const currentIndex = categoryPosts.findIndex(p => p.slug === params.slug);

        // Posts are sorted by date (newest first), so:
        // - previous = older post = higher index
        // - next = newer post = lower index
        const prevPost = currentIndex < categoryPosts.length - 1
            ? { title: categoryPosts[currentIndex + 1].title, slug: categoryPosts[currentIndex + 1].slug }
            : null;
        const nextPost = currentIndex > 0
            ? { title: categoryPosts[currentIndex - 1].title, slug: categoryPosts[currentIndex - 1].slug }
            : null;

        return {
            content: post.default,
            meta: {
                ...post.metadata,
                slug: params.slug,
                category: params.category,
                readingTime
            },
            prevPost,
            nextPost
        };
    } catch (e) {
        throw error(404, `Could not find ${params.category}/${params.slug}`);
    }
}
