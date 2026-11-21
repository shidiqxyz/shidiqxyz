import type { Handle } from '@sveltejs/kit';

// Content-Security-Policy — allowlist the third-party origins this site
// legitimately loads (Google Analytics beacon, Twitter/X embeds, Giscus
// comments, YouTube thumbnails/iframes). Local assets are covered by
// 'self'; everything else is rejected. See
// security/secure-external-subresources.md (CSP pairing) for the pattern.
const CONTENT_SECURITY_POLICY = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://platform.twitter.com https://giscus.app",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://i.ytimg.com",
    "font-src 'self'",
    "connect-src 'self' https://www.googletagmanager.com https://giscus.app https://www.youtube.com https://www.google-analytics.com https://region1.google-analytics.com",
    "frame-src https://www.youtube.com https://giscus.app",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ') + ';';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

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
