// Static build for tallpoppystudio.com. No dependencies: `node scripts/build.mjs`.
// Writes generated HTML/text into the repo; the output is committed and served
// as-is by GitHub Pages. Hand-written pages (notehunter, gaiwan, tuuvi,
// sensorcam legal pages, trip) are never touched except the sitemap entry.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPS, OSS, STATUS, SITE, EMAIL, UPDATED, appStoreUrl } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (rel, content) => {
  const p = join(ROOT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log('wrote', rel);
};
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const inject = (html, name, content) => {
  const re = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(<!-- /build:${name} -->)`);
  if (!re.test(html)) throw new Error(`marker build:${name} missing`);
  return html.replace(re, `$1\n${content}\n$2`);
};

// Where a card's Support link goes: the app's own support page if it has
// one, otherwise its studio hub page (which carries the support address).
const HUBS_BUILT = false; // flipped once the /{app}/ hub pages exist
const hasHub = (a) => a.hub === 'existing' || (HUBS_BUILT && a.hub !== 'none');
export const supportHref = (a) => a.support || (hasHub(a) ? `/${a.slug}/` : `mailto:${EMAIL}`);
// Primary link: the product domain, the studio page, or the App Store.
const primaryHref = (a) => (/^https?:/.test(a.url) || hasHub(a)) ? a.url
  : (a.appStoreId ? appStoreUrl(a.appStoreId, 'studio-home') : a.support);

function chips(a) {
  return `<p class="chips"><span class="chip chip-${a.status}">${STATUS[a.status]}</span>`
    + `<span class="chip">${esc(a.kind)}</span>`
    + a.platforms.map((p) => `<span class="chip">${esc(p)}</span>`).join('') + '</p>';
}

// Wave 1 card, in the current homepage's markup.
function homeCard(a) {
  const href = primaryHref(a);
  const ext = /^https?:/.test(a.url);
  const viaStore = href !== a.url && a.appStoreId;
  const label = href === a.support && href !== a.url ? 'Support page' : (ext ? 'Visit ' + a.urlLabel : a.urlLabel);
  const primary = viaStore ? '' : `<a class="work-card-link" href="${esc(href)}">${esc(label)} <span class="arrow">→</span></a>`;
  const store = a.appStoreId && !a.externalStore
    ? `<a class="work-card-link" href="${esc(appStoreUrl(a.appStoreId, 'studio-home'))}">App Store <span class="arrow">→</span></a>` : '';
  const play = a.play ? `<a class="work-card-link" href="${esc(a.play)}">Google Play <span class="arrow">→</span></a>` : '';
  const legal = [
    a.status !== 'archived' ? `<a href="${esc(supportHref(a))}">Support</a>` : '',
    a.privacy ? `<a href="${esc(a.privacy)}">Privacy</a>` : '',
    a.terms ? `<a href="${esc(a.terms)}">Terms</a>` : '',
  ].filter(Boolean).join(' · ');
  return `                    <article class="work-card">
                        <a class="app-icon-wrap" href="${esc(href)}" tabindex="-1" aria-hidden="true">
                            <span class="app-icon">
                                <img src="img/apps/${a.slug}.webp" alt="" width="64" height="64" loading="lazy">
                                <svg class="app-icon-border"><use href="#app-icon-stroke"/></svg>
                            </span>
                        </a>
                        <h3 class="work-card-title"><a href="${esc(href)}">${esc(a.name)}</a></h3>
                        ${chips(a)}
                        <p class="work-card-desc">${esc(a.desc)}</p>
                        <div class="work-card-links">${primary}${store}${play}</div>
                        ${legal ? `<p class="card-legal">${legal}</p>` : ''}
                    </article>`;
}

function ossCard(o) {
  return `                    <article class="work-card">
                        <h3 class="work-card-title">${esc(o.name)}</h3>
                        ${chips(o)}
                        <p class="work-card-desc">${esc(o.tagline)} ${esc(o.desc)}</p>
                        <div class="work-card-links">${o.links.map(([l, u]) => `<a class="work-card-link" href="${esc(u)}">${esc(l)} <span class="arrow">→</span></a>`).join('')}</div>
                    </article>`;
}

function buildHome() {
  const order = ['wikicatch', 'notehunter', 'meritvalue', 'wikihunt', 'kufu', 'matchframe', 'invention-capture', 'kotone', 'shrd', 'gaiwan', 'tuuvi', 'sensorcam', 'kranked'];
  const bySlug = Object.fromEntries(APPS.map((a) => [a.slug, a]));
  const cards = order.map((s) => homeCard(bySlug[s]))
    .concat(OSS.slice(0, 2).map(ossCard))
    .concat([homeCard(bySlug.wikibubbles)]);
  write('index.html', inject(read('index.html'), 'products', cards.join('\n\n')));
}

// ---- sitemap ---------------------------------------------------------------
// Pages listed here are public and indexable. /trip/ and the notehunter
// campaign redirects (/notehunter/go/*) are deliberately left out.
export const SITEMAP = [
  ['/', UPDATED, '1.0'],
  ['/gaiwan/', '2026-09-22', '0.8'], ['/gaiwan/privacy/', '2026-09-22', '0.4'],
  ['/tuuvi/', '2026-09-23', '0.7'], ['/tuuvi/privacy/', '2026-09-23', '0.4'],
  ['/notehunter/', '2026-10-03', '0.8'], ['/notehunter/support/', UPDATED, '0.5'],
  ['/notehunter/privacy/', UPDATED, '0.4'], ['/notehunter/beta/', UPDATED, '0.4'],
  ['/sensorcam/support/', '2026-10-10', '0.5'], ['/sensorcam/privacy/', '2026-10-10', '0.4'],
];

function buildSitemap(extra = []) {
  const rows = SITEMAP.concat(extra).map(([loc, mod, pri]) =>
    `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${mod}</lastmod>\n    <priority>${pri}</priority>\n  </url>`);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`);
}

buildHome();
buildSitemap();
