// Static build for tallpoppystudio.com. No dependencies: `node scripts/build.mjs`.
// Writes generated HTML/text into the repo; the output is committed and served
// as-is by GitHub Pages. Hand-written pages (notehunter, gaiwan, tuuvi,
// sensorcam legal pages, trip) are never touched except the sitemap entry.
// Re-render share cards with `node scripts/og.mjs` after changing names or
// taglines, and QR codes with scripts/qr.mjs after changing App Store ids.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPS, OSS, SITE, UPDATED } from './data.mjs';
import * as P from './pages.mjs';
import { glyph, head, POPPY, POPPY_DEEP, INK } from './brand.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const write = (rel, content) => {
  const p = join(ROOT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log('wrote', rel);
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
// ---- sitemap ---------------------------------------------------------------
// Pages listed here are public and indexable. /trip/ and the notehunter
// campaign redirects (/notehunter/go/*) are deliberately left out.
export const SITEMAP = [
  ['/', UPDATED, '1.0'],
  ['/gaiwan/', UPDATED, '0.8'], ['/gaiwan/privacy/', '2026-09-22', '0.4'],
  ['/tuuvi/', UPDATED, '0.7'], ['/tuuvi/privacy/', '2026-09-23', '0.4'],
  ['/notehunter/', UPDATED, '0.8'], ['/notehunter/support/', UPDATED, '0.5'],
  ['/notehunter/privacy/', UPDATED, '0.4'], ['/notehunter/beta/', UPDATED, '0.4'],
  ['/sensorcam/support/', '2026-10-10', '0.5'], ['/sensorcam/privacy/', '2026-10-10', '0.4'],
];

function buildSitemap(extra = []) {
  const rows = SITEMAP.concat(extra).map(([loc, mod, pri]) =>
    `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${mod}</lastmod>\n    <priority>${pri}</priority>\n  </url>`);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`);
}

// Download/star counts for /open-source/, fetched at build time. Optional:
// on any failure the page just leaves the numbers out.
async function ossStats() {
  const get = async (u) => { try { const r = await fetch(u, { headers: { 'user-agent': 'tallpoppystudio-build' }, signal: AbortSignal.timeout(8000) }); return r.ok ? r.json() : null; } catch { return null; } };
  const out = {};
  await Promise.all(OSS.map(async (o) => {
    const s = {};
    if (o.npm) {
      const d = await get(`https://api.npmjs.org/downloads/point/last-month/${o.npm}`);
      const m = await get(`https://registry.npmjs.org/${o.npm.replace('/', '%2f')}`);
      if (d?.downloads) { s.downloads = d.downloads; s.source = 'npm'; }
      if (m?.['dist-tags']?.latest) s.version = m['dist-tags'].latest;
    }
    if (o.pypi) {
      const d = await get(`https://pypistats.org/api/packages/${o.pypi}/recent`);
      const m = await get(`https://pypi.org/pypi/${o.pypi}/json`);
      if (d?.data?.last_month) { s.downloads = d.data.last_month; s.source = 'PyPI'; }
      if (m?.info?.version) s.version = m.info.version;
    }
    const gh = (o.links.find(([l]) => l === 'GitHub') || [])[1];
    if (gh) {
      const r = await get(gh.replace('https://github.com/', 'https://api.github.com/repos/'));
      if (r?.stargazers_count) s.stars = r.stargazers_count;
    }
    out[o.slug] = s;
  }));
  return out;
}

const hubs = APPS.filter((a) => a.hub !== 'existing' && a.hub !== 'none');
for (const a of hubs) {
  if (existsSync(join(ROOT, a.slug, 'index.html')) && !read(`${a.slug}/index.html`).includes('<link rel="stylesheet" href="/assets/site.css">')) {
    throw new Error(`${a.slug}/index.html exists and is hand-written; refusing to overwrite`);
  }
  write(`${a.slug}/index.html`, P.hubPage(a));
}
write('apps/index.html', P.appsPage());
write('work/index.html', P.workPage());
const stats = await ossStats();
write('open-source/index.html', P.ossPage(stats));
write('index.html', P.homePage(stats));
write('about/index.html', P.aboutPage());
write('now/index.html', P.nowPage());
write('press/index.html', P.pressPage());
write('404.html', P.notFoundPage());
write('badge/index.html', P.badgePage());
write('badge/badge.svg', P.badgeSvg(false));
write('badge/badge-dark.svg', P.badgeSvg(true));
write('badge/snippet.html', P.badgeSnippet() + '\n');
write('llms.txt', P.llmsTxt());
write('robots.txt', P.robotsTxt());
write('favicon.svg', head() + '\n');
write('press/tall-poppy-mark.svg', glyph({ size: 240, petal: POPPY, deep: POPPY_DEEP, ink: INK }).replace(' aria-hidden="true" focusable="false"', '') + '\n');

buildSitemap([
  ['/apps/', UPDATED, '0.9'],
  ...hubs.map((a) => [`/${a.slug}/`, UPDATED, '0.7']),
  ['/work/', UPDATED, '0.8'], ['/open-source/', UPDATED, '0.7'], ['/about/', UPDATED, '0.8'],
  ['/now/', UPDATED, '0.6'], ['/press/', UPDATED, '0.4'], ['/badge/', UPDATED, '0.3'],
]);
