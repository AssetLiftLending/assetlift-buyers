import { readdir, readFile } from 'node:fs/promises';

const site = 'https://assetlift-buyers.vercel.app';
const pages = (await readdir('.')).filter((file) => file.endsWith('.html') && !/^google[a-z0-9]+\.html$/i.test(file));
const sitemap = await readFile('sitemap.xml', 'utf8');
const robots = await readFile('robots.txt', 'utf8');
let failed = false;

function fail(message) {
  console.error(message);
  failed = true;
}

if (!robots.includes(`Sitemap: ${site}/sitemap.xml`)) fail('robots.txt does not point to the canonical sitemap.');
if (!robots.includes('Allow: /')) fail('robots.txt does not explicitly allow crawling.');

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const slug = file === 'index.html' ? '' : `/${file.replace(/\.html$/, '')}`;
  const canonical = `${site}${slug || '/'}`;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ?? '';
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const noindex = html.includes('noindex');

  if (noindex && file !== 'privacy.html') fail(`${file}: important page contains noindex.`);
  if (noindex) continue;
  if (!html.includes(`rel="canonical" href="${canonical}"`)) fail(`${file}: canonical should be ${canonical}`);
  if (h1Count !== 1) fail(`${file}: expected exactly one h1, found ${h1Count}.`);
  if (title.length < 35 || title.length > 70) fail(`${file}: title length ${title.length} is outside 35-70 chars.`);
  if (description.length < 105 || description.length > 170) fail(`${file}: meta description length ${description.length} is outside 105-170 chars.`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`${file}: missing from sitemap.`);
}

console.log(`Audited ${pages.length} HTML pages.`);
if (failed) process.exit(1);
