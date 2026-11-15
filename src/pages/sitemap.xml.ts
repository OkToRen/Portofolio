import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { site } from '../data/site';
import { portrait } from '../data/identity';

const paths = ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/publications', '/colophon'];

// Image sitemap entries, so Google Images finds the portrait on the home page.
const images: Record<string, string[]> = { '/': [portrait.url] };

export const GET: APIRoute = ({ site: base }) => {
  const urls = paths
    .map((p) => {
      const imgs = (images[p] ?? []).map((src) => `<image:image><image:loc>${src}</image:loc></image:image>`).join('');
      return `  <url><loc>${new URL(p, base).href}</loc><lastmod>${site.lastUpdatedIso}</lastmod>${imgs}</url>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
