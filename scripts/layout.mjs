// Shared page shell for the generated pages: <head>, header, footer, JSON-LD.
import { APPS, SITE, EMAIL } from './data.mjs';
import { glyph } from './brand.mjs';

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (path) => (/^https?:/.test(path) ? path : SITE + path);

export const SAME_AS = [
  'https://x.com/AkosKomuves',
  'https://github.com/akoskomuves',
  'https://www.linkedin.com/company/tall-poppy-studio/',
];

export const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: 'Tall Poppy Studio',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.svg`,
  email: EMAIL,
  description: 'An independent software studio in Budapest building native apps, web platforms and AI tooling.',
  founder: { '@id': `${SITE}/about/#akos` },
  address: { '@type': 'PostalAddress', addressLocality: 'Budapest', addressCountry: 'HU' },
  sameAs: SAME_AS,
};

export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/about/#akos`,
  name: 'Akos Komuves',
  url: `${SITE}/about/`,
  jobTitle: 'Founder and software engineer',
  worksFor: { '@id': `${SITE}/#org` },
  homeLocation: { '@type': 'Place', name: 'Budapest, Hungary' },
  sameAs: ['https://x.com/AkosKomuves', 'https://github.com/akoskomuves'],
};

// Where "Support" goes for an app: its own support page, or the #support
// section of its studio hub page (which gives the support address).
export const supportHref = (a) => a.support || (a.hub === 'none' ? `mailto:${EMAIL}` : `/${a.slug}/#support`);

export const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

export const jsonld = (nodes) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })}</script>`;

const NAV = [
  ['Apps', '/apps/'],
  ['Work', '/work/'],
  ['Open source', '/open-source/'],
  ['Writing', '/writing/'],
  ['About', '/about/'],
  ['Now', '/now/'],
];

const SUN = '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 3v1.5M12 19.5V21M4.2 4.2l1.1 1.1M17.7 17.7l1.1 1.1M3 12h1.5M19.5 12H21M4.2 19.8l1.1-1.1M17.7 6.3l1.1-1.1"/></svg>';
const MOON = '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 15A9.72 9.72 0 0 1 12 21.75 9.75 9.75 0 0 1 9 2.25 9.72 9.72 0 0 0 21.75 15z"/></svg>';

export function header(current) {
  // current: '/apps/' marks the page itself; 'section:/apps/' marks a parent section.
  const links = NAV.map(([label, href]) => {
    const cur = href === current ? ' aria-current="page"' : (current === 'section:' + href ? ' aria-current="true"' : '');
    return `<a href="${href}"${cur}>${label}</a>`;
  }).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-head" id="site-head">
  <div class="wrap">
    <a class="wordmark" href="/" aria-label="Tall Poppy Studio, home">${glyph({ size: 15 })}<span>Tall Poppy Studio</span></a>
    <nav class="nav" aria-label="Main">${links}</nav>
    <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Dark mode" aria-pressed="false">${SUN}${MOON}</button>
  </div>
</header>`;
}

export function footer() {
  const live = APPS.filter((a) => a.status !== 'archived' && a.hub !== 'none');
  const pick = (slugs) => slugs.map((s) => live.find((a) => a.slug === s)).filter(Boolean);
  const appLinks = pick(['wikicatch', 'notehunter', 'meritvalue', 'kumano', 'kufu', 'wikihunt', 'matchframe'])
    .map((a) => `<li><a href="/${a.slug}/">${esc(a.name)}</a></li>`).join('');
  const supportLinks = pick(['notehunter', 'wikicatch', 'wikihunt', 'meritvalue', 'kufu', 'gaiwan'])
    .map((a) => `<li><a href="${esc(supportHref(a))}">${esc(a.name)} support</a></li>`).join('');
  return `<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="wordmark" href="/">${glyph({ size: 15 })}<span>Tall Poppy Studio</span></a>
        <p class="muted small" style="margin-top:.875rem;max-width:30ch">An independent software studio in Budapest, run by Akos Komuves.</p>
        <p class="small" style="margin-top:.875rem"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
      </div>
      <div><h2>Apps</h2><ul>${appLinks}<li><a href="/apps/">All apps</a></li></ul></div>
      <div><h2>Support</h2><ul>${supportLinks}<li><a href="/apps/#support">Every app</a></li></ul></div>
      <div><h2>Studio</h2><ul>
        <li><a href="/about/">About</a></li><li><a href="/work/">Client work</a></li>
        <li><a href="/open-source/">Open source</a></li><li><a href="/writing/">Writing</a></li><li><a href="/now/">Now</a></li>
        <li><a href="/press/">Press kit</a></li><li><a href="/badge/">Studio badge</a></li>
      </ul></div>
    </div>
    <div class="foot-base">
      <span>&copy; 2026 Tall Poppy Studio &middot; Budapest, Hungary</span>
      <span><a href="https://x.com/AkosKomuves">X</a> &middot; <a href="https://github.com/akoskomuves">GitHub</a> &middot; <a href="https://www.linkedin.com/company/tall-poppy-studio/">LinkedIn</a> &middot; <a href="/llms.txt">llms.txt</a></span>
    </div>
  </div>
</footer>`;
}

const THEME_BOOT = `<script>(function(){var d=document.documentElement;d.classList.remove('no-js');var s=null;try{s=localStorage.getItem('theme')}catch(e){}if(s==='dark'||(!s&&matchMedia('(prefers-color-scheme: dark)').matches)){d.setAttribute('data-theme','dark')}else if(s==='light'){d.setAttribute('data-theme','light')}})();</script>`;

export const SITE_JS = `<script>
(function(){
  var d=document.documentElement,t=document.getElementById('theme-toggle');
  if(t){t.setAttribute('aria-pressed',String(d.getAttribute('data-theme')==='dark'));t.addEventListener('click',function(){var dark=d.getAttribute('data-theme')!=='dark';d.setAttribute('data-theme',dark?'dark':'light');t.setAttribute('aria-pressed',String(dark));try{localStorage.setItem('theme',dark?'dark':'light')}catch(e){}});}
  var h=document.getElementById('site-head');
  if(h){var f=function(){h.classList.toggle('scrolled',scrollY>8)};addEventListener('scroll',f,{passive:true});f();}
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
</script>`;

// page({ path, title, description, og, ogAlt, body, ld, current, noindex, extraHead })
export function page(p) {
  const url = abs(p.path);
  const og = abs(p.og || '/og/home.png');
  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:site_name" content="Tall Poppy Studio">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.ogAlt || p.title)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@AkosKomuves">
<meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#FBF6EE" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#17130F" media="(prefers-color-scheme: dark)">
${THEME_BOOT}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..650&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${p.extraHead || ''}
${p.ld ? jsonld(p.ld) : ''}
</head>
<body>
${header(p.current)}
<main id="main">
${p.body}
</main>
${footer()}
${SITE_JS}
${p.extraBody || ''}
</body>
</html>
`;
}
