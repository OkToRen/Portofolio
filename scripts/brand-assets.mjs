// Generates the brand assets in public/ from public/favicon.svg and the project data:
//   favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png  (the DO mark)
//   og/*.png                                                     (1200x630 link previews)
//
// Run with `npm run brand` after changing the mark or a project's name/tagline.
// Needs a local Chrome (set CHROME_PATH if it isn't in the default place) and
// network access for Google Fonts. The outputs are committed, so the deploy
// build never runs this.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { projects } from '../src/data/projects.ts';

const root = new URL('../public/', import.meta.url);
const chrome =
  process.env.CHROME_PATH ??
  (process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome');

const mark = readFileSync(new URL('favicon.svg', root), 'utf8');
// Full-bleed square for platforms that round the corners themselves (iOS, Android).
const square = mark.replace(/ rx="[\d.]+"/, '');
const dataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

const browser = await chromium.launch({ executablePath: chrome });
const page = await browser.newPage();

// Chrome won't size a window below ~100px, so render in a fixed viewport and clip.
async function png(svg, size) {
  await page.setViewportSize({ width: 600, height: 600 });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}img{display:block;width:${size}px;height:${size}px}</style><img src="${dataUri(svg)}">`,
  );
  await page.locator('img').evaluate((img) => img.decode());
  return page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}

// ---- Icons --------------------------------------------------------------
writeFileSync(new URL('apple-touch-icon.png', root), await png(square, 180));
writeFileSync(new URL('icon-192.png', root), await png(square, 192));
writeFileSync(new URL('icon-512.png', root), await png(square, 512));

// favicon.ico with PNG-encoded 16, 32 and 48px images, for browsers and
// crawlers that ask for /favicon.ico directly.
const sizes = [16, 32, 48];
const images = [];
for (const s of sizes) images.push(await png(mark, s));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync(new URL('favicon.ico', root), Buffer.concat([header, ...images]));

// ---- Link previews ------------------------------------------------------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function card({ eyebrow, title, lede }) {
  return `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
  :root{--bg:oklch(0.16 0.004 285);--ink:oklch(0.90 0.004 285);--muted:oklch(0.62 0.012 285);--accent:oklch(0.64 0.17 258);--rule:oklch(0.30 0.006 285)}
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:var(--bg);color:var(--ink);font-family:"Inter Tight",sans-serif;position:relative;overflow:hidden}
  .blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.34}
  .b1{width:520px;height:520px;right:-140px;top:-200px;background:linear-gradient(135deg,#3b82f6,#1d4ed8)}
  .b2{width:380px;height:380px;right:180px;bottom:-260px;background:linear-gradient(135deg,#06b6d4,#3b82f6)}
  .b3{width:300px;height:300px;right:-80px;bottom:-60px;background:linear-gradient(135deg,#10b981,#06b6d4);opacity:.22}
  main{position:absolute;inset:72px 80px;display:flex;flex-direction:column}
  .eyebrow{font-family:"JetBrains Mono",monospace;font-size:24px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
  h1{font-family:Fraunces,serif;font-weight:500;font-variation-settings:"opsz" 144;letter-spacing:-.025em;line-height:.95;margin-top:auto}
  h1 .dot{color:var(--accent)}
  .lede{font-size:38px;line-height:1.3;color:var(--muted);margin-top:28px;max-width:940px}
  footer{display:flex;align-items:center;gap:20px;margin-top:auto;padding-top:36px;border-top:1px solid var(--rule)}
  footer img{width:56px;height:56px}
  footer b{font-weight:600;font-size:28px}
  footer span{font-family:"JetBrains Mono",monospace;font-size:24px;color:var(--muted);margin-left:auto}
</style></head><body>
<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
<main>
  ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
  <h1 style="font-size:${title.length > 12 ? 128 : 152}px">${esc(title)}<span class="dot">.</span></h1>
  <p class="lede">${esc(lede)}</p>
  <footer><img src="${dataUri(mark)}" alt=""><b>Darren Haryanto</b><span>darrenharyanto.com</span></footer>
</main></body></html>`;
}

const cards = [
  {
    file: 'home',
    eyebrow: 'Portfolio',
    title: 'Darren Haryanto',
    lede: 'Computer Science student at BINUS, working in Rust, C and the modern web.',
  },
  { file: 'projects', eyebrow: 'Projects', title: 'Projects', lede: "A selection of things I've built: mobile apps, tooling, and the web." },
  { file: 'colophon', eyebrow: 'Colophon', title: 'Colophon', lede: "How this site is made: what it runs on, the type it's set in, and what didn't survive." },
  ...projects.map((p) => ({
    file: p.slug,
    eyebrow: `Project · ${p.year} · ${p.status}`,
    title: p.name,
    lede: p.tagline,
  })),
];

mkdirSync(new URL('og/', root), { recursive: true });
await page.setViewportSize({ width: 1200, height: 630 });
for (const c of cards) {
  await page.setContent(card(c), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  writeFileSync(new URL(`og/${c.file}.png`, root), await page.screenshot({ type: 'png' }));
  console.log(`og/${c.file}.png`);
}

await browser.close();
