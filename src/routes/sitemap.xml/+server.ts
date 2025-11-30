import { getPosts } from '$lib/utils/posts';

export const prerender = true;

export async function GET() {
  const posts = await getPosts();
  const siteUrl = 'https://shidiq.xyz';
  const pages = ['about', 'pemikiran', 'proses', 'panduan'];

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${pages
      .map(
        (page) => `
  <url>
    <loc>${siteUrl}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
      )
      .join('')}
  ${posts
      .map(
        (post) => `
  <url>
    <loc>${siteUrl}/blog/${post.category}/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `
      )
      .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
