import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    // HTML: short browser cache, longer edge cache with SWR so CDN
    // serves stale content while revalidating instead of `max-age=0`
    // forcing every visit back to origin.
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
        response.headers.set(
            'Cache-Control',
            'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
        );
    }

    return response;
};
