// Generates the brand assets in public/:
//   favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png  (from public/favicon.svg)
//   og/*.jpg  1200x630 screenshots of each page, used as link previews
//
// Run with `npm run brand` after changing the mark or the look of a page. It
// builds the site, serves it locally and photographs every page in the
// sitemap. Needs a local Chrome (set CHROME_PATH if it isn't in the default
// place). The outputs are committed, so the deploy build never runs this.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { spawn, execSync } from 'node:child_process';
import { chromium } from 'playwright-core';

const root = new URL('../public/', import.meta.url);
const cwd = new URL('..', import.meta.url);
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
await page.close();

// ---- Link previews: a photo of each page ----------------------------------
const port = 4399;
const base = `http://localhost:${port}`;
execSync('npx astro build', { cwd, stdio: 'ignore' });
const server = spawn('npx', ['astro', 'preview', '--port', String(port)], { cwd, shell: true, stdio: 'ignore' });

try {
  for (let i = 0; ; i++) {
    try { if ((await fetch(base)).ok) break; } catch {}
    if (i > 60) throw new Error('preview server did not start');
    await new Promise((r) => setTimeout(r, 500));
  }

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, colorScheme: 'dark' });
  const shot = await ctx.newPage();
  rmSync(new URL('og/', root), { recursive: true, force: true });
  mkdirSync(new URL('og/', root), { recursive: true });
  for (const path of paths) {
    await shot.goto(base + path, { waitUntil: 'load' });
    await shot.evaluate(() => document.fonts.ready);
    // No pointer in a screenshot: hide the cursor effects.
    await shot.addStyleTag({ content: '.cursor-ring,.cursor-spotlight{display:none!important}' });
    await shot.waitForTimeout(1500); // let the entrance animations finish
    const name = path === '/' ? 'home' : path.split('/').filter(Boolean).pop();
    writeFileSync(new URL(`og/${name}.jpg`, root), await shot.screenshot({ type: 'jpeg', quality: 88 }));
    console.log(`og/${name}.jpg  ${path}`);
  }
} finally {
  if (process.platform === 'win32') execSync(`for /f "tokens=5" %p in ('netstat -ano ^| findstr :${port} ^| findstr LISTENING') do taskkill /F /PID %p`, { stdio: 'ignore', shell: 'cmd.exe' });
  else server.kill();
  await browser.close();
}
