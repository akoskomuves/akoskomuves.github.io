// /writing/: renders Markdown posts into the site's page shell.
//   node scripts/writing.mjs                 -> writes into the repo root
//   node scripts/writing.mjs --out <dir>     -> writes into <dir> (preview)
// No dependencies: a small Markdown subset (headings, paragraphs, lists,
// bold, italic, links, inline code, rules) is enough for these posts.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { SITE } from './data.mjs';
import { page, esc, ORG, PERSON, breadcrumbs } from './layout.mjs';
import { glyph, POPPY, POPPY_DEEP, INK, PAPER } from './brand.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STYLE = `<style>
.post { font-size: 1.0625rem; line-height: 1.75; }
.post h2 { font-size: 1.625rem; }
.post ol li::marker { color: var(--link); font-weight: 600; }
.post hr { margin: 2.5rem 0; }
.post p:has(> em:only-child) { color: var(--soft); font-size: 0.9375rem; }
.post-list { list-style: none; border-top: 1px solid var(--line); }
.post-item { padding: 1.75rem 0; border-bottom: 1px solid var(--line); }
.post-item a { text-decoration: none; color: var(--ink); }
.post-item a:hover h2 { color: var(--link); }
.post-item .updated { margin: 0.375rem 0 0.625rem; }
</style>`;

// Posts, newest first. `source` is the Markdown file; `lede` is the
// answer-first summary shown above the post and used as the description.
export const POSTS = [
  {
    slug: 'indexed-titles',
    source: 'writing/indexed-titles.md',
    date: '2026-10-13',
    title: 'I taught Claude Code the App Store trick almost no indie uses',
    lede: 'Cross-localization is an App Store optimisation technique: every storefront also indexes metadata from localizations its shoppers never see, so filling those hidden titles, subtitles and keyword fields multiplies the words that rank in one market. Here is how it works, and the Claude Code setup (one skill, three MCP servers) that does it end to end.',
    tags: ['ASO', 'Claude Code', 'MCP'],
  },
];

// ---- Markdown subset --------------------------------------------------------
function inline(s) {
  // Pull code spans out first so link/emphasis rules never touch their contents.
  const codes = [];
  let out = esc(s).replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`);
}

export function markdown(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const ids = new Set();
  const html = [];
  let para = [], list = null;
  const flushPara = () => { if (para.length) { html.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { html.push(`<${list.type}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.type}>`); list = null; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flushPara(); flushList();
      const level = Math.max(2, Math.min(m[1].length, 4)); // the file's # title is the page H1, rendered separately
      const base = m[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let id = base, k = 2;
      while (ids.has(id)) id = `${base}-${k++}`;
      ids.add(id);
      html.push(`<h${level} id="${id}">${inline(m[2])}</h${level}>`);
      continue;
    }
    if (/^---+$/.test(line)) { flushPara(); flushList(); html.push('<hr class="rule">'); continue; }
    if ((m = line.match(/^\s*[-*]\s+(.*)$/))) { flushPara(); if (!list || list.type !== 'ul') { flushList(); list = { type: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) { flushPara(); if (!list || list.type !== 'ol') { flushList(); list = { type: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    if (list && /^\s{2,}\S/.test(raw)) { list.items[list.items.length - 1] += ' ' + line.trim(); continue; }
    flushList();
    para.push(line.trim());
  }
  flushPara(); flushList();
  return html.join('\n');
}

// The file's H1 is rendered from POSTS; strip it (and any leftover draft
// marker line) from the body.
export function prepare(md) {
  return md
    .replace(/^#\s+.*\n/, '')
    .replace(/^\*Draft[^\n]*\*\s*\n/m, '');
}

const human = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const words = (md) => md.replace(/[#*`>\[\]()_-]/g, ' ').split(/\s+/).filter(Boolean).length;

export function postPage(p, md) {
  const body = prepare(md);
  const n = words(body);
  const mins = Math.max(1, Math.round(n / 220));
  const url = `/writing/${p.slug}/`;
  const html = `<div class="wrap narrow">
  <article>
    <header class="page-hero" style="padding-bottom:1.5rem">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/writing/">Writing</a></li><li aria-current="page">${esc(p.title)}</li></ol></nav>
      <p class="eyebrow accent">${p.tags.map(esc).join(' · ')}</p>
      <h1 style="max-width:22ch">${esc(p.title)}</h1>
      <p class="updated"><time datetime="${p.date}">${human(p.date)}</time> · ${mins} min read · by <a href="/about/">Akos Komuves</a></p>
      <p class="lede" style="margin-top:1.5rem">${esc(p.lede)}</p>
    </header>
    <div class="prose post">${markdown(body)}</div>
  </article>
</div>`;
  return page({
    path: url, current: 'section:/writing/', ogType: 'article',
    title: `${p.title} | Tall Poppy Studio`,
    ogTitle: p.title,
    description: p.lede.split(/(?<=\.)\s/)[0],
    og: `/og/writing-${p.slug}.png`,
    extraHead: `<meta property="article:published_time" content="${p.date}">\n<meta property="article:author" content="${SITE}/about/">\n${STYLE}`,
    ld: [ORG, PERSON, breadcrumbs([['Home', '/'], ['Writing', '/writing/'], [p.title, url]]), {
      '@type': 'BlogPosting', '@id': `${SITE}${url}#article`, headline: p.title, description: p.lede,
      datePublished: p.date, dateModified: p.date, wordCount: n, timeRequired: `PT${mins}M`,
      inLanguage: 'en', keywords: p.tags.join(', '), url: `${SITE}${url}`, mainEntityOfPage: `${SITE}${url}`,
      image: `${SITE}/og/writing-${p.slug}.png`,
      author: { '@id': `${SITE}/about/#akos` }, publisher: { '@id': `${SITE}/#org` },
    }],
    body: html,
  });
}

export function indexPage(posts) {
  const items = posts.map((p) => `<li class="post-item reveal"><a href="/writing/${p.slug}/"><h2 class="h3">${esc(p.title)}</h2></a>
    <p class="updated"><time datetime="${p.date}">${human(p.date)}</time> · ${p.tags.map(esc).join(' · ')}</p>
    <p class="muted">${esc(p.lede)}</p></li>`).join('');
  return page({
    path: '/writing/', current: '/writing/',
    title: 'Writing | Tall Poppy Studio',
    description: 'Notes from Akos Komuves on building and growing apps with AI agents: App Store optimisation, Claude Code workflows and MCP servers.',
    og: '/og/writing.png',
    extraHead: STYLE,
    ld: [ORG, breadcrumbs([['Home', '/'], ['Writing', '/writing/']]), {
      '@type': 'Blog', '@id': `${SITE}/writing/#blog`, name: 'Tall Poppy Studio — Writing', url: `${SITE}/writing/`,
      publisher: { '@id': `${SITE}/#org` },
      blogPost: posts.map((p) => ({ '@id': `${SITE}/writing/${p.slug}/#article` })),
    }],
    body: `<div class="wrap narrow">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Writing</li></ol></nav>
    <p class="eyebrow accent">Writing</p>
    <h1>Writing.</h1>
    <p class="lede">Notes on building and growing apps with AI agents, from the work behind the studio’s own apps.</p>
  </section>
  <ul class="post-list">${items}</ul>
</div>`,
  });
}

// ---- share cards ---------------------------------------------------------------
function ogCard(title, sub, out) {
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..650&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden}
body{background:${PAPER};color:${INK};font-family:Inter,sans-serif;position:relative}
.c{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column}
.m{display:flex;align-items:center;gap:14px;font-family:Fraunces,serif;font-weight:600;font-size:30px}
.k{font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:#B42E1B;margin-top:auto;font-weight:500}
h1{font-family:Fraunces,serif;font-weight:560;font-size:64px;line-height:1.05;letter-spacing:-.02em;margin-top:18px;max-width:17ch}
p{font-size:26px;color:#5E554B;margin-top:20px}.r{position:absolute;left:0;right:0;bottom:0;height:12px;background:${POPPY}}
.g{position:absolute;right:70px;bottom:-30px}</style></head><body>
<div class="g">${glyph({ size: 240, petal: POPPY, deep: POPPY_DEEP, ink: INK })}</div>
<div class="c"><div class="m">${glyph({ size: 24, petal: POPPY, deep: POPPY_DEEP, ink: INK })}Tall Poppy Studio</div>
<p class="k">Writing</p><h1>${esc(title)}</h1><p>${esc(sub)}</p></div><div class="r"></div></body></html>`;
  const tmp = join(tmpdir(), `tp-w-${process.pid}.html`);
  writeFileSync(tmp, html);
  const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--virtual-time-budget=6000', `--screenshot=${out}`, `file://${tmp}`], { stdio: 'ignore' });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--out');
  const OUT = i > -1 ? process.argv[i + 1] : ROOT;
  const put = (rel, s) => { const p = join(OUT, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, s); console.log('wrote', p); };
  for (const p of POSTS) put(`writing/${p.slug}/index.html`, postPage(p, readFileSync(join(ROOT, p.source), 'utf8')));
  put('writing/index.html', indexPage(POSTS));
  if (!process.argv.includes('--no-og')) {
    mkdirSync(join(OUT, 'og'), { recursive: true });
    for (const p of POSTS) ogCard(p.title, `By Akos Komuves · ${human(p.date)}`, join(OUT, 'og', `writing-${p.slug}.png`));
    ogCard('Writing.', 'Building and growing apps with AI agents.', join(OUT, 'og', 'writing.png'));
  }
}
