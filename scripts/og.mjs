// Renders the 1200x630 share cards into /og/ with headless Chrome.
// Usage: node scripts/og.mjs            (all cards)
//        node scripts/og.mjs home apps  (only these)
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { APPS } from './data.mjs';
import { glyph, POPPY, POPPY_DEEP, INK, PAPER } from './brand.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const base = (inner) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..650&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:${PAPER};color:${INK};font-family:Inter,system-ui,sans-serif;position:relative}
.card{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column}
.mark{display:flex;align-items:center;gap:14px;font-family:Fraunces,serif;font-weight:600;font-size:34px;letter-spacing:-.01em}
.mark small{font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:#6B6157;font-weight:500;margin-left:4px}
h1{font-family:Fraunces,serif;font-weight:560;font-size:78px;line-height:1.02;letter-spacing:-.025em;margin-top:auto;max-width:15ch;font-variation-settings:"opsz" 144}
p.sub{font-size:28px;color:#5E554B;margin-top:22px;max-width:34ch;line-height:1.35}
.big{position:absolute;right:70px;bottom:-30px;opacity:1}
.rule{position:absolute;left:0;right:0;bottom:0;height:12px;background:${POPPY}}
.icons{display:flex;gap:14px;margin-top:34px}
.icons img{width:64px;height:64px;border-radius:15px;box-shadow:0 0 0 1px rgba(28,24,20,.1)}
.appicon{width:150px;height:150px;border-radius:34px;box-shadow:0 0 0 1px rgba(28,24,20,.12),0 12px 30px rgba(28,24,20,.12);margin-top:auto}
.app h1{margin-top:28px;font-size:84px}
.chip{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.1em;text-transform:uppercase;border:1.5px solid #B42E1B;color:#B42E1B;border-radius:999px;padding:6px 14px;margin-top:22px}
</style></head><body>${inner}<div class="rule"></div></body></html>`;

const wordmark = `<div class="mark">${glyph({ size: 26, petal: POPPY, deep: POPPY_DEEP, ink: INK })}<span>Tall Poppy Studio</span></div>`;
const bigGlyph = `<div class="big">${glyph({ size: 300, petal: POPPY, deep: POPPY_DEEP, ink: INK })}</div>`;

function page(title, sub, extra = '') {
  return base(`${bigGlyph}<div class="card">${wordmark}<h1>${esc(title)}</h1><p class="sub">${esc(sub)}</p>${extra}</div>`);
}

const iconStrip = (slugs) => `<div class="icons">${slugs.map((s) => `<img src="file://${ROOT}/img/apps/${s}.webp">`).join('')}</div>`;

export const CARDS = {
  home: () => page('Native apps and AI tooling.', 'An independent software studio in Budapest, run by Akos Komuves.',
    iconStrip(['wikicatch', 'notehunter', 'meritvalue', 'kufu', 'wikihunt', 'matchframe', 'kumano'])),
  apps: () => page('Every app from the studio.', 'iPhone, Mac, web and MCP: maps, music, money, training and developer tools.',
    iconStrip(APPS.filter((a) => a.status !== 'archived').map((a) => a.slug).slice(0, 12))),
  work: () => page('Client work.', 'Mobile apps, web platforms and AI systems, built end to end for teams.'),
  'open-source': () => page('Open source.', 'MCP servers and agent skills for App Store Connect, keyword research and valuation.'),
  about: () => page('About the studio.', 'Akos Komuves: ten years shipping production software, now independent.'),
  now: () => page('What I’m working on now.', 'A dated note on the studio’s current focus.'),
  press: () => page('Press kit.', 'Boilerplate, the mark and app icons for Tall Poppy Studio.'),
  badge: () => page('A Tall Poppy Studio app.', 'A small footer badge for the studio’s product sites.'),
};
for (const a of APPS) {
  if (a.hub === 'none') continue;
  CARDS[`app-${a.slug}`] = () => base(`${bigGlyph}<div class="card app">${wordmark}
    <img class="appicon" src="file://${ROOT}/img/apps/${a.slug}.webp">
    <h1>${esc(a.name)}</h1><p class="sub">${esc(a.tagline)}</p></div>`);
}

function render(name) {
  const dir = join(tmpdir(), `tp-og-${process.pid}`);
  mkdirSync(dir, { recursive: true });
  const html = join(dir, `${name}.html`);
  writeFileSync(html, CARDS[name]());
  const out = join(ROOT, 'og', `${name}.png`);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--window-size=1200,630', '--virtual-time-budget=6000', `--screenshot=${out}`, `file://${html}`], { stdio: 'ignore' });
  rmSync(dir, { recursive: true, force: true });
  console.log('og/' + name + '.png');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(join(ROOT, 'og'), { recursive: true });
  const want = process.argv.slice(2);
  for (const name of (want.length ? want : Object.keys(CARDS))) render(name);
}
