export const prerender = true;

export async function GET() {
    const siteUrl = 'https://shidiq.blog';

    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
