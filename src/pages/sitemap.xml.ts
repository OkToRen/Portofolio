import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { site } from '../data/site';

const paths = ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/colophon'];

export const GET: APIRoute = ({ site: base }) => {
  const urls = paths
    .map((p) => `  <url><loc>${new URL(p, base).href}</loc><lastmod>${site.lastUpdatedIso}</lastmod></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
