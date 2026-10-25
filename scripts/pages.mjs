// Every generated page except the homepage. Imported by build.mjs.
import { APPS, OSS, GROUPS, STATUS, SITE, EMAIL, UPDATED, appStoreUrl } from './data.mjs';
import { page, esc, abs, ORG, PERSON, breadcrumbs, supportHref } from './layout.mjs';
import { glyph } from './brand.mjs';

const UPDATED_HUMAN = new Date(UPDATED + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export { UPDATED_HUMAN };

// One plain, answer-first definition per app (GEO: "X is a … that …").
const WHAT = {
  wikicatch: 'a fishing spots map app for iPhone',
  wikihunt: 'a GPS hunting map app for iPhone',
  notehunter: 'an ear training and music theory app for iPhone, iPad and Mac',
  meritvalue: 'a stock valuation service on the web and iPhone that computes intrinsic value from SEC filings',
  kufu: 'a workout tracker for iPhone and Apple Watch that combines gym strength training with calisthenics',
  matchframe: 'an AI dating photo coach for iPhone',
  kumano: 'a Mac app that adds a product-management layer to agentic development with Claude Code',
  'invention-capture': 'an iPhone app that turns a spoken description and photos of an invention into a structured invention disclosure, on the device',
  kotone: 'a website for listening to traditional music of Japan and China from public-domain and Creative Commons recordings',
  shrd: 'a taxi-sharing app for iPhone and Android',
  gaiwan: 'a gongfu tea timer and tea journal for iPhone',
  tuuvi: 'a sun care app for families on iPhone',
  sensorcam: 'an iPhone camera app for open gate video and 48 MP ProRAW photos',
  kranked: 'an App Store keyword tracker for iPhone',
  wikibubbles: 'a dive and snorkel site app for iPhone and Android',
};
export const what = (a) => WHAT[a.slug] || a.tagline;
// Shorten to whole sentences (or whole words) within max characters.
export function clip(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const dot = cut.lastIndexOf('. ');
  return dot > max * 0.5 ? cut.slice(0, dot + 1) : cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '\u2026';
}

export const hubHref = (a) => (a.hub === 'none' ? a.url : `/${a.slug}/`);
export const iconImg = (a, size = 56) =>
  `<span class="icon" style="--s:${size}px"><img src="/img/apps/${a.slug}.webp" alt="" width="${size}" height="${size}"${size >= 88 ? "" : " loading=\"lazy\""} decoding="async"></span>`;
export const chips = (a) => `<ul class="chips" aria-label="Category and platforms"><li class="chip">${esc(a.kind)}</li>${a.platforms.map((p) => `<li class="chip">${esc(p)}</li>`).join('')}</ul>`;
const supportOf = (a) => a.support || `mailto:${EMAIL}?subject=${encodeURIComponent(a.name + ' support')}`;
const platformAttr = (a) => a.platforms.map((p) => ({ iOS: 'iphone', iPadOS: 'iphone', watchOS: 'iphone', macOS: 'mac', Web: 'web', Android: 'android', MCP: 'mcp', 'Claude Code skill': 'mcp', 'Agent skills': 'mcp' }[p])).filter(Boolean).join(' ');
const storeBadge = (a, ct) => `<a class="store-badge" href="${esc(appStoreUrl(a.appStoreId, ct))}">
  <img class="on-light" src="/notehunter/img/app-store-badge.svg" alt="Download ${esc(a.name)} on the App Store" width="132" height="44">
  <img class="on-dark" src="/notehunter/img/app-store-badge-white.svg" alt="Download ${esc(a.name)} on the App Store" width="132" height="44"></a>`;
export const phone = (a, eager = false) => a.shot
  ? `<div class="phone"><img src="/img/shots/${a.shot}.webp" alt="${esc(a.shotAlt)}" width="480" height="1043"${eager ? '' : ' loading="lazy"'} decoding="async"></div>` : '';

// App card used on /apps/ (and the homepage long tail).
export function appCard(a, ct = 'studio-apps') {
  const ext = /^https?:/.test(a.url);
  const links = [
    ext && a.hub !== 'none' ? `<a href="${esc(a.url)}">${esc(a.urlLabel)}</a>` : '',
    a.appStoreId && !a.externalStore ? `<a href="${esc(appStoreUrl(a.appStoreId, ct))}">App Store</a>` : '',
    a.externalStore ? `<a href="${esc(a.url)}">App Store</a>` : '',
    a.play ? `<a href="${esc(a.play)}">Google Play</a>` : '',
    a.status !== 'archived' ? `<a href="${esc(supportHref(a))}">Support</a>` : '',
    a.privacy ? `<a href="${esc(a.privacy)}">Privacy</a>` : '',
  ].filter(Boolean).join('');
  return `<article class="card reveal" id="app-${a.slug}" data-slug="${a.slug}" data-platforms="${platformAttr(a)}" data-status="${a.status}">
  <div class="card-top">${iconImg(a)}<div><h3><a href="${esc(hubHref(a))}">${esc(a.name)}</a></h3></div></div>
  ${chips(a)}
  <p class="tag">${esc(a.tagline)}</p>
  <p class="links">${links}</p>
</article>`;
}

export function ossCard(o) {
  const links = o.links.map(([l, u]) => `<a href="${esc(u)}">${esc(l)}</a>`).join('');
  return `<article class="card reveal" id="app-${o.slug}" data-slug="${o.slug}" data-platforms="mcp" data-status="${o.status}">
  <div class="card-top"><span class="icon icon-oss" aria-hidden="true">{ }</span><div><h3><a href="/open-source/#${o.slug}">${esc(o.name)}</a></h3></div></div>
  <ul class="chips"><li class="chip">Open source</li><li class="chip">${esc(o.platforms[0])}</li><li class="chip">${esc(o.license)}</li></ul>
  <p class="tag">${esc(o.tagline)}</p>
  <p class="links">${links}</p>
</article>`;
}

// ---------------------------------------------------------------- JSON-LD
export function appLd(a) {
  const type = a.web && !a.appStoreId ? 'WebApplication' : (a.mac ? 'SoftwareApplication' : 'MobileApplication');
  const os = a.platforms.filter((p) => !['MCP', 'Web'].includes(p)).join(', ') || undefined;
  const sameAs = [/^https?:/.test(a.url) ? a.url : null, a.appStoreId ? `https://apps.apple.com/app/id${a.appStoreId}` : null, a.play || null].filter(Boolean);
  const node = {
    '@type': type,
    '@id': `${SITE}/${a.slug}/#app`,
    name: a.name,
    description: `${a.name} is ${what(a)}. ${a.desc}`,
    url: a.hub === 'none' ? a.url : `${SITE}/${a.slug}/`,
    applicationCategory: a.category,
    image: `${SITE}/img/apps/${a.slug}.webp`,
    publisher: { '@id': `${SITE}/#org` },
    author: { '@id': `${SITE}/about/#akos` },
  };
  if (os) node.operatingSystem = os;
  if (type === 'WebApplication') node.browserRequirements = 'Requires a modern web browser';
  if (sameAs.length) node.sameAs = sameAs;
  if (a.shot) node.screenshot = `${SITE}/img/shots/${a.shot}.webp`;
  if (a.appStoreId) node.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: `https://apps.apple.com/app/id${a.appStoreId}` };
  return node;
}

// ---------------------------------------------------------------- hub page
export function hubPage(a) {
  const ext = /^https?:/.test(a.url);
  const primary = ext ? `<a class="btn btn-primary" href="${esc(a.url)}">Visit ${esc(a.urlLabel)} <span class="arr" aria-hidden="true">→</span></a>` : '';
  const store = a.appStoreId ? `${storeBadge(a, `studio-hub-${a.slug}`)}
  <span class="qr"><img src="/img/qr/${a.slug}.svg" alt="" width="84" height="84" style="background:#fff;padding:6px;border-radius:8px"> Scan to open on your iPhone</span>` : '';
  const play = a.play ? `<a class="btn btn-ghost" href="${esc(a.play)}">Get it on Google Play</a>` : '';
  const note = a.note ? `<p class="muted">${a.note}</p>` : '';
  const price = a.price || (a.appStoreId ? 'Free download on the App Store' : '');
  const priceRow = price ? `<dt>Price</dt><dd>${price}</dd>` : '';
  const supportRow = a.support
    ? `<dt>Support</dt><dd><a href="${esc(a.support)}">${esc(a.support.replace(/^https?:\/\/(www\.)?/, ''))}</a>, or write to <a href="mailto:${EMAIL}">${EMAIL}</a></dd>`
    : `<dt>Support</dt><dd>Write to <a href="${esc(supportOf(a))}">${EMAIL}</a>. Say which device and OS version you use and what happened; a person replies.</dd>`;
  const body = `<div class="wrap narrow">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/apps/">Apps</a></li><li aria-current="page">${esc(a.name)}</li></ol></nav>
    <div class="hub-head">${iconImg(a, 88)}<div><p class="eyebrow accent">A Tall Poppy Studio app</p><h1 style="margin:0">${esc(a.name)}</h1></div></div>
    ${chips(a)}
    <p class="lede" style="margin-top:1.25rem"><strong>${esc(a.name)} is ${esc(what(a))}.</strong> ${esc(a.desc)}</p>
    ${note}
    <div class="btns" style="margin-top:1.75rem">${primary}${store}${play}</div>
  </section>
  ${a.shot ? `<div class="hub-shots reveal">${phone(a, true)}</div>` : ''}
  <section class="section prose" style="padding-top:1.5rem">
    <h2 id="support">Support, privacy and terms</h2>
    <dl class="facts">
      ${supportRow}
      ${a.privacy ? `<dt>Privacy</dt><dd><a href="${esc(a.privacy)}">Privacy policy</a></dd>` : ''}
      ${a.terms ? `<dt>Terms</dt><dd><a href="${esc(a.terms)}">Terms of use</a></dd>` : ''}
    </dl>
    <h2>Details</h2>
    <dl class="facts">
      <dt>Platforms</dt><dd>${a.platforms.map(esc).join(', ')}</dd>
      <dt>Status</dt><dd>${STATUS[a.status]}</dd>
      ${priceRow}
      <dt>Category</dt><dd>${esc(a.kind)}</dd>
      <dt>Made by</dt><dd><a href="/about/">Akos Komuves</a>, Tall Poppy Studio, Budapest</dd>
    </dl>
    <p class="updated">Checked ${UPDATED_HUMAN}.</p>
  </section>
</div>`;
  return page({
    path: `/${a.slug}/`,
    title: `${a.name}: ${a.tagline.replace(/\.$/, '')} | Tall Poppy Studio`,
    ogTitle: `${a.name} — ${a.tagline.replace(/\.$/, '')}`,
    description: clip(`${a.name} is ${what(a)}. ${a.desc}`, 300),
    og: `/og/app-${a.slug}.png`,
    ogAlt: `${a.name}: ${a.tagline}`,
    current: 'section:/apps/',
    extraHead: a.appStoreId ? `<meta name="apple-itunes-app" content="app-id=${a.appStoreId}">` : '',
    ld: [ORG, appLd(a), breadcrumbs([['Home', '/'], ['Apps', '/apps/'], [a.name, `/${a.slug}/`]])],
    body,
  });
}

// ---------------------------------------------------------------- /apps/
export function appsPage() {
  const groups = GROUPS.map((g) => {
    const items = APPS.filter((a) => a.group === g.id && a.status !== 'archived').map((a) => appCard(a))
      .concat(g.id === 'dev' ? OSS.map(ossCard) : []);
    return `<section class="group" data-group="${g.id}" aria-labelledby="g-${g.id}">
  <h2 id="g-${g.id}" class="h3" style="font-size:1.5rem">${esc(g.name)}</h2>
  <p class="muted">${esc(g.blurb)}</p>
  <div class="grid">${items.join('\n')}</div>
</section>`;
  }).join('\n');
  const archived = APPS.filter((a) => a.status === 'archived');
  const supportList = APPS.filter((a) => a.status !== 'archived').map((a) =>
    `<li><a class="row" href="${esc(supportHref(a))}">${iconImg(a, 40)}<span><span class="t">${esc(a.name)}</span><br><span class="d">${a.support ? 'Support page' : 'Support details on the app\u2019s page'}</span></span></a></li>`).join('');
  const filters = [['all', 'All'], ['iphone', 'iPhone & Watch'], ['mac', 'Mac'], ['web', 'Web'], ['android', 'Android'], ['mcp', 'MCP & open source'], ['beta', 'In beta']];
  const live = APPS.filter((a) => a.status !== 'archived');
  const body = `<div class="wrap">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Apps</li></ol></nav>
    <p class="eyebrow accent">Apps</p>
    <h1>Every app from the studio.</h1>
    <p class="lede">Tall Poppy Studio makes ${live.length} apps and ${OSS.length} open-source developer tools: maps for anglers and hunters, music training, stock valuation, workouts, photo and camera apps, and tools for building apps with AI. All are made by Akos Komuves in Budapest.</p>
  </section>
  <div class="filters" role="group" aria-label="Filter apps">${filters.map(([id, l], i) => `<button type="button" data-filter="${id}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
  <p class="small muted" id="filter-count" aria-live="polite" style="margin:-1rem 0 2rem"></p>
  ${groups}
  <section class="group" aria-labelledby="g-earlier" data-group="earlier">
    <h2 id="g-earlier" class="h3" style="font-size:1.5rem">Earlier</h2>
    <p class="muted">No longer in active development.</p>
    <div class="grid">${archived.map((a) => appCard(a)).join('\n')}</div>
  </section>
  <section class="section" id="support" aria-labelledby="support-h">
    <h2 id="support-h">Need help with an app?</h2>
    <p class="muted" style="margin:.5rem 0 1.5rem">Pick it here. Every app is supported by the person who made it: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    <ul class="list">${supportList}</ul>
  </section>
  <p class="updated">Statuses checked ${UPDATED_HUMAN} against the App Store.</p>
</div>`;
  const js = `<script>
(function(){
  var cards=[].slice.call(document.querySelectorAll('.card[data-slug]'));
  var groups=[].slice.call(document.querySelectorAll('.group'));
  var btns=[].slice.call(document.querySelectorAll('[data-filter]'));
  var count=document.getElementById('filter-count');
  function apply(f){
    btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-filter')===f))});
    var n=0;
    cards.forEach(function(c){
      var ok=f==='all'||(f==='beta'?c.getAttribute('data-status')==='beta':(' '+c.getAttribute('data-platforms')+' ').indexOf(' '+f+' ')>-1);
      c.hidden=!ok; if(ok)n++;
    });
    groups.forEach(function(g){g.hidden=!g.querySelector('.card:not([hidden])')});
    count.textContent=f==='all'?'':n+' shown';
  }
  btns.forEach(function(b){b.addEventListener('click',function(){
    var f=b.getAttribute('data-filter');apply(f);
    try{var u=new URL(location.href);if(f==='all')u.searchParams.delete('platform');else u.searchParams.set('platform',f);history.replaceState(null,'',u)}catch(e){}
  })});
  var q;try{q=new URLSearchParams(location.search)}catch(e){q=null}
  if(q&&q.get('platform')&&document.querySelector('[data-filter="'+q.get('platform').replace(/[^a-z]/g,'')+'"]'))apply(q.get('platform').replace(/[^a-z]/g,''));
})();
</script>`;
  return page({
    path: '/apps/',
    title: 'Apps by Tall Poppy Studio: iPhone, Mac, web and MCP',
    description: `All ${live.length} apps and ${OSS.length} open-source tools from Tall Poppy Studio, with status and platforms: WikiCatch, WikiHunt, NoteHunter, MeritValue, Kufu, Matchframe, Kumano and more.`,
    og: '/og/apps.png',
    current: '/apps/',
    ld: [ORG, breadcrumbs([['Home', '/'], ['Apps', '/apps/']]), {
      '@type': 'ItemList',
      name: 'Apps by Tall Poppy Studio',
      itemListElement: live.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(hubHref(a)), name: a.name })),
    }],
    body,
    extraBody: js,
  });
}

// ---------------------------------------------------------------- /work/
export const PREVIOUSLY = [
  ['Tier', 'Rider app', 'The first iOS app, built from zero and carried from pre-launch to millions of users as the mobility startup became European market leader. Real-time vehicle location and availability over MapKit, and expansion features across more than ten markets under hyper-growth.'],
  ['ABC News', 'Australia’s most-read news app', 'Modernised the app that serves millions of daily readers, delivered with the agency Bilue. A server-driven content layout system let the editorial desk reconfigure the app without shipping a release.'],
  ['Queensland Police Service', 'Officer field app', 'A mission-critical iPad app used daily on the street for infringement recording and person and vehicle searches, delivered with the agency Concentrix Catalyst. High-security and regulated: strict testing, code review and audit standards.'],
  ['Liven', 'Consumer app & merchant POS', 'The whole mobile surface of a hospitality fintech: the consumer app for discovery, deals and payments, plus the merchant iPad point of sale. Backend integration end to end, with offline resilience.'],
];
export const PILLARS = [
  ['Mobile apps', 'Native iOS and Android, from architecture to store release. Subscriptions, offline data, maps, health and connected hardware. Analytics and growth after launch.'],
  ['Web platforms', 'Dashboards, admin tools and the backends behind them. Postgres, authentication and roles, data pipelines, reporting.'],
  ['AI systems', 'Model integration inside real products: document extraction, agent tooling, MCP servers, and the review and planning layer around coding agents. Published open source on npm and GitHub.'],
];
export const CLIENT_CASE = {
  title: 'Pharmacist rewards platform',
  meta: 'Pharmaceutical · under NDA',
  body: 'A sales-incentive product for a pharmaceutical company, built end to end: a pharmacist-facing mobile app that reads invoices with on-device capture and AI extraction to credit reward points, the backend that runs the points, catalogue and redemption logic, and a web dashboard the client uses to run campaigns and watch performance.',
  scope: 'Android · iOS · Backend · Web dashboard · AI document extraction',
};
export const rowsHtml = (rows) => `<div class="rows">${rows.map(([t, m, b, s]) => `<div class="row2 reveal"><div><h3>${esc(t)}</h3><p class="meta">${esc(m)}</p></div><div><p>${esc(b)}</p>${s ? `<p class="scope">${esc(s)}</p>` : ''}</div></div>`).join('')}</div>`;

export function workPage() {
  const body = `<div class="wrap">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Work</li></ol></nav>
    <p class="eyebrow accent">Client work</p>
    <h1>Software for teams, built end to end.</h1>
    <p class="lede">Tall Poppy Studio takes on a small number of client projects: native mobile apps, the web platforms behind them, and AI features that have to work in production. The studio’s own apps are the proof of how it builds.</p>
    <div class="btns" style="margin-top:1.75rem"><a class="btn btn-primary" href="mailto:${EMAIL}?subject=Project%20enquiry">Work with me <span class="arr" aria-hidden="true">→</span></a><a class="btn btn-ghost" href="/apps/">See the apps</a></div>
  </section>
  <section class="section" aria-labelledby="h-what">
    <div class="section-head"><h2 id="h-what">What the studio does</h2></div>
    ${rowsHtml(PILLARS.map(([t, b], i) => [t, String(i + 1).padStart(2, '0'), b]))}
  </section>
  <section class="section" aria-labelledby="h-now">
    <div class="section-head"><h2 id="h-now">Current client work</h2></div>
    ${rowsHtml([[CLIENT_CASE.title, CLIENT_CASE.meta, CLIENT_CASE.body, CLIENT_CASE.scope]])}
  </section>
  <section class="section" aria-labelledby="h-prev">
    <div class="section-head"><h2 id="h-prev">Previously</h2></div>
    <p class="muted" style="margin:-1rem 0 1.5rem">Akos shipped with these teams before the studio.</p>
    ${rowsHtml(PREVIOUSLY)}
  </section>
  <section class="section" aria-labelledby="h-contact">
    <h2 id="h-contact">Start a project</h2>
    <p class="lede" style="margin-top:.75rem">Write to <a href="mailto:${EMAIL}?subject=Project%20enquiry">${EMAIL}</a> with what you want to build and by when. You will hear back from Akos himself.</p>
  </section>
</div>`;
  return page({
    path: '/work/', current: '/work/',
    title: 'Client work: mobile apps, web platforms, AI | Tall Poppy Studio',
    description: 'Tall Poppy Studio builds native mobile apps, web platforms and production AI features for teams. Current work: a pharmacist rewards platform under NDA. Previously: Tier, ABC News, Queensland Police Service, Liven.',
    og: '/og/work.png',
    ld: [ORG, PERSON, breadcrumbs([['Home', '/'], ['Work', '/work/']])],
    body,
  });
}

// ---------------------------------------------------------------- /open-source/
export function ossPage(stats) {
  const items = OSS.map((o) => {
    const s = stats[o.slug] || {};
    const nums = [
      s.downloads ? `${s.downloads.toLocaleString('en-US')} ${s.source} downloads in the last 30 days` : '',
      s.stars ? `${s.stars} GitHub star${s.stars === 1 ? '' : 's'}` : '',
      s.version ? `v${s.version}` : '',
    ].filter(Boolean).join(' · ');
    return `<article class="row2 reveal" id="${o.slug}">
  <div><h3>${esc(o.name)}</h3><p class="meta">${esc(o.platforms[0])} · ${esc(o.lang ? o.lang + ' · ' : '')}${esc(o.license)}</p></div>
  <div><p><strong>${esc(o.tagline)}</strong> ${esc(o.desc)}</p>
  ${o.install ? `<pre><code>${esc(o.install)}</code></pre>` : ''}
  <p class="small">${o.links.map(([l, u]) => `<a href="${esc(u)}">${esc(l)}</a>`).join(' · ')}${nums ? ` <span class="muted">· ${esc(nums)}</span>` : ''}</p></div>
</article>`;
  }).join('');
  const body = `<div class="wrap">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Open source</li></ol></nav>
    <p class="eyebrow accent">Open source</p>
    <h1>Tools for building apps with AI agents.</h1>
    <p class="lede">The studio publishes the tools it builds for its own work: MCP servers that let an AI coding agent talk to App Store Connect and App Store search data, and agent skills for App Store keywords and company valuation. All MIT licensed.</p>
  </section>
  <section class="section" style="padding-top:0"><div class="rows">${items}</div>
  ${Object.values(stats).some((s) => s.downloads || s.stars) ? `<p class="updated" style="margin-top:1.25rem">Download and star counts fetched ${UPDATED_HUMAN} from npm, PyPI Stats and GitHub.</p>` : ''}</section>
</div>`;
  return page({
    path: '/open-source/', current: '/open-source/',
    title: 'Open source: App Store Connect MCP, keyword MCP, agent skills | Tall Poppy Studio',
    description: 'Open-source tools from Tall Poppy Studio: appstoreconnect-mcp (npm), kranked-mcp (PyPI), the aso-cross-localization Claude Code skill and meritvalue-skills. MIT licensed.',
    og: '/og/open-source.png',
    ld: [ORG, breadcrumbs([['Home', '/'], ['Open source', '/open-source/']]), ...OSS.map((o) => ({
      '@type': 'SoftwareSourceCode', name: o.name, description: `${o.tagline} ${o.desc}`,
      codeRepository: (o.links.find(([l]) => l === 'GitHub') || [])[1], license: 'https://opensource.org/licenses/MIT',
      programmingLanguage: o.lang, author: { '@id': `${SITE}/about/#akos` }, publisher: { '@id': `${SITE}/#org` },
    }))],
    body,
  });
}

// ---------------------------------------------------------------- /about/
export function aboutPage() {
  const liveStore = APPS.filter((a) => a.appStoreId && !a.externalStore && a.status !== 'archived').length;
  const body = `<div class="wrap narrow">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">About</li></ol></nav>
    <p class="eyebrow accent">About</p>
    <h1>One engineer, a studio name, and a lot of shipped apps.</h1>
    <p class="lede">Tall Poppy Studio is the independent software studio of Akos Komuves, a software engineer in Budapest, Hungary. It publishes its own apps and builds software for clients.</p>
  </section>
  <section class="prose">
    <h2>Akos</h2>
    <p>Akos has spent about ten years shipping production software, across mobility, news, public safety, hospitality fintech and developer tools. He built the first iOS app at Tier and carried it from pre-launch to millions of users; worked on the ABC News app with the agency Bilue and on a Queensland Police Service field app with Concentrix Catalyst; and built the consumer app and merchant point of sale at Liven. The details are on the <a href="/work/">work page</a>.</p>
    <h2>The studio</h2>
    <p>Today the studio has ${liveStore} apps live on the App Store under Akos’s developer account, a web product in MeritValue, a macOS beta in Kumano, and open-source tools on npm, PyPI and GitHub. Support email for every app goes to <a href="mailto:${EMAIL}">${EMAIL}</a> and is answered by Akos.</p>
    <p>The work runs with AI coding agents every day, which is why some of the products are tools for that way of working: <a href="/kumano/">Kumano</a> plans and reviews agent work in Claude Code, and the <a href="/open-source/">MCP servers</a> let an agent work with App Store Connect and App Store search data.</p>
    <h2>Get in touch</h2>
    <p>For a project, write to <a href="mailto:${EMAIL}?subject=Project%20enquiry">${EMAIL}</a>. For help with an app, <a href="/apps/#support">pick it here</a>. Elsewhere: <a href="https://x.com/AkosKomuves">X</a>, <a href="https://github.com/akoskomuves">GitHub</a>, <a href="https://www.linkedin.com/company/tall-poppy-studio/">LinkedIn</a>.</p>
  </section>
</div>`;
  return page({
    path: '/about/', current: '/about/', ogType: 'profile',
    title: 'About Akos Komuves and Tall Poppy Studio',
    description: 'Tall Poppy Studio is the independent software studio of Akos Komuves, a software engineer in Budapest with about ten years of shipping production software, previously at Tier, ABC News, Queensland Police Service and Liven.',
    og: '/og/about.png',
    ld: [ORG, PERSON, breadcrumbs([['Home', '/'], ['About', '/about/']]), { '@type': 'AboutPage', url: `${SITE}/about/`, mainEntity: { '@id': `${SITE}/about/#akos` } }],
    body,
  });
}

// ---------------------------------------------------------------- /now/
export const NOW = [
  ['The studio’s websites', 'One support address, real screenshots, share cards and the footer badge across every product site, starting with this one.'],
  ['Kumano', 'Features and hardening on the macOS beta: native permission prompts, conversation persistence and a single engine for chat and guided work.'],
  ['Matchframe', 'The first weeks on the App Store after the 25 September launch.'],
  ['Gaiwan', 'Version 1.0 went live on the App Store on 10 October; work on 1.1 has started.'],
  ['WikiCatch, WikiHunt and NoteHunter', 'Growth work: App Store keywords, localisation and search ads.'],
];
export function nowPage() {
  const body = `<div class="wrap narrow">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Now</li></ol></nav>
    <p class="eyebrow accent">Now</p>
    <h1>What I’m working on now.</h1>
    <p class="lede">A short, dated note on the studio’s current focus, in the spirit of <a href="https://nownownow.com/about">nownownow.com</a>.</p>
    <p class="updated" style="margin-top:1rem">Updated <time datetime="${UPDATED}">${UPDATED_HUMAN}</time> in Budapest.</p>
  </section>
  ${rowsHtml(NOW.map(([t, b]) => [t, '', b]))}
</div>`;
  return page({
    path: '/now/', current: '/now/',
    title: `Now: what Tall Poppy Studio is working on (${UPDATED_HUMAN})`,
    description: 'What Akos Komuves and Tall Poppy Studio are working on right now: the studio websites, Kumano, Matchframe, Gaiwan and growth work on WikiCatch, WikiHunt and NoteHunter.',
    og: '/og/now.png',
    ld: [ORG, breadcrumbs([['Home', '/'], ['Now', '/now/']])],
    body,
  });
}

// ---------------------------------------------------------------- /press/
export function pressPage() {
  const icons = APPS.filter((a) => a.status !== 'archived').map((a) =>
    `<li><a class="row" href="/img/apps/${a.slug}.webp" download>${iconImg(a, 40)}<span><span class="t">${esc(a.name)}</span><br><span class="d">App icon, 256 × 256 WebP</span></span></a></li>`).join('');
  const body = `<div class="wrap narrow">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Press</li></ol></nav>
    <p class="eyebrow accent">Press kit</p>
    <h1>Tall Poppy Studio press kit.</h1>
    <p class="lede">Boilerplate, the mark and app icons. For anything else, including screenshots at full size, write to <a href="mailto:${EMAIL}?subject=Press">${EMAIL}</a>.</p>
  </section>
  <section class="prose">
    <h2>Boilerplate</h2>
    <p><strong>Short:</strong> Tall Poppy Studio is an independent software studio in Budapest, run by Akos Komuves. It makes native apps and AI tooling.</p>
    <p><strong>Long:</strong> Tall Poppy Studio is the independent software studio of Akos Komuves, a software engineer in Budapest, Hungary, with about ten years of shipping production software at companies including Tier, ABC News, Queensland Police Service and Liven. The studio publishes its own apps, among them WikiCatch, WikiHunt, NoteHunter, MeritValue, Kufu, Matchframe and Kumano, open-source MCP servers for App Store work, and builds software for clients.</p>
    <h2>Facts</h2>
    <dl class="facts">
      <dt>Name</dt><dd>Tall Poppy Studio (always three words, capitalised)</dd>
      <dt>Founder</dt><dd>Akos Komuves</dd>
      <dt>Based in</dt><dd>Budapest, Hungary</dd>
      <dt>Website</dt><dd><a href="/">tallpoppystudio.com</a></dd>
      <dt>Contact</dt><dd><a href="mailto:${EMAIL}">${EMAIL}</a></dd>
    </dl>
    <h2>The mark</h2>
    <p>A poppy on a tall stem, in poppy vermilion <code>#E5452B</code> on warm paper <code>#FBF6EE</code>.</p>
    <div style="display:flex;gap:2rem;align-items:flex-end;margin:1.25rem 0 1rem">
      ${glyph({ size: 48, title: 'Tall Poppy Studio mark' })}
      <img src="/favicon.svg" alt="The poppy head on its own" width="56" height="56">
    </div>
    <p><a href="/press/tall-poppy-mark.svg" download>Download the mark (SVG)</a> · <a href="/favicon.svg" download>Download the poppy head (SVG)</a> · <a href="/og/home.png">Share card (PNG, 1200 × 630)</a></p>
    <h2>App icons</h2>
  </section>
  <ul class="list">${icons}</ul>
</div>`;
  return page({
    path: '/press/',
    title: 'Press kit | Tall Poppy Studio',
    description: 'Press kit for Tall Poppy Studio: short and long boilerplate, studio facts, the poppy mark as SVG and the app icons.',
    og: '/og/press.png',
    ld: [ORG, breadcrumbs([['Home', '/'], ['Press', '/press/']])],
    body,
  });
}

// ---------------------------------------------------------------- 404
export function notFoundPage() {
  const body = `<div class="wrap narrow">
  <section class="page-hero">
    <p class="eyebrow accent">404</p>
    <h1>This page isn’t here.</h1>
    <p class="lede">The link may be old or mistyped. Most things on this site live in one of these places:</p>
    <div class="btns" style="margin-top:1.75rem"><a class="btn btn-primary" href="/apps/">All apps <span class="arr" aria-hidden="true">→</span></a><a class="btn btn-ghost" href="/apps/#support">App support</a><a class="btn btn-ghost" href="/">Home</a></div>
    <p class="muted" style="margin-top:2rem">Looking for a privacy policy? Each app’s page links to it. Still stuck? <a href="mailto:${EMAIL}">${EMAIL}</a></p>
  </section>
</div>`;
  return page({
    path: '/404.html', noindex: true,
    title: 'Page not found | Tall Poppy Studio',
    description: 'This page does not exist on tallpoppystudio.com.',
    body,
  });
}

// ---------------------------------------------------------------- llms.txt
export function llmsTxt(posts = []) {
  const line = (a) => `- [${a.name}](${abs(hubHref(a))}): ${what(a)}. ${STATUS[a.status]}; ${a.platforms.join(', ')}.${/^https?:/.test(a.url) && a.hub !== 'none' ? ` Website: ${a.url}.` : ''}${a.appStoreId ? ` App Store: https://apps.apple.com/app/id${a.appStoreId}.` : ''}`;
  return `# Tall Poppy Studio

> Tall Poppy Studio is an independent software studio in Budapest, Hungary, run by Akos Komuves. It makes native iOS and Mac apps, web products and open-source AI developer tools, and builds software for clients.

Contact: ${EMAIL}. Website: ${SITE}/. Last updated: ${UPDATED}.

## Key pages

- [Apps](${SITE}/apps/): every app, with status and platforms
- [Client work](${SITE}/work/): services, current client work (under NDA) and previous teams (Tier, ABC News, Queensland Police Service, Liven)
- [Open source](${SITE}/open-source/): MCP servers and agent skills
- [About](${SITE}/about/): Akos Komuves and the studio
- [Now](${SITE}/now/): current focus, dated
- [Press kit](${SITE}/press/): boilerplate, mark, icons
- [Writing](${SITE}/writing/): notes on building and growing apps with AI agents

## Apps

${APPS.filter((a) => a.status !== 'archived').map(line).join('\n')}

## Open source

${OSS.map((o) => `- [${o.name}](${o.links[o.links.length - 1][1]}): ${o.tagline} ${o.license}.${o.install ? ` Install: \`${o.install}\`.` : ''}`).join('\n')}

${posts.length ? `## Writing\n\n${posts.map((p) => `- [${p.title}](${SITE}/writing/${p.slug}/) (${p.date}): ${p.lede}`).join('\n')}\n\n` : ''}## Support

Each app's page on this site links to its support and privacy pages. All support email goes to ${EMAIL} and is answered by Akos.

## Optional

- [Earlier apps](${SITE}/apps/#g-earlier): ${APPS.filter((a) => a.status === 'archived').map((a) => a.name).join(', ')} (no longer in active development)
`;
}

export function robotsTxt() {
  const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot'];
  return `# Search engines and AI assistants are welcome to read and cite this site.
# Pages that should stay out of results carry a noindex meta tag instead of a
# Disallow, so crawlers can read it.
User-agent: *
Allow: /

${bots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
}

// ---------------------------------------------------------------- /badge/
// The footer badge product sites copy: "A Tall Poppy Studio app".
// Inline SVG + text, inherits the product site's text colour; petals stay poppy.
export const badgeSnippet = (slug = 'APP-SLUG') => `<a href="https://tallpoppystudio.com/apps/?ref=${slug}" class="tp-badge" style="display:inline-flex;align-items:center;gap:0.45em;font-size:13px;line-height:1.2;color:inherit;text-decoration:none">
  <svg width="10" height="17" viewBox="0 0 24 40" aria-hidden="true" focusable="false"><path d="M12 38.5V18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="7.5" cy="8.5" r="5.5" fill="#E5452B"/><circle cx="16.5" cy="8.5" r="5.5" fill="#E5452B"/><circle cx="7.5" cy="15.5" r="5.5" fill="#C9371F"/><circle cx="16.5" cy="15.5" r="5.5" fill="#C9371F"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>
  <span>A Tall Poppy Studio app</span>
</a>`;

export function badgeSvg(dark = false) {
  const ink = dark ? '#F2EBE0' : '#1C1814', bg = dark ? '#17130F' : '#FBF6EE', line = dark ? 'rgba(242,235,224,0.22)' : 'rgba(28,24,20,0.18)';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="196" height="32" viewBox="0 0 196 32" role="img" aria-label="A Tall Poppy Studio app">
  <rect x="0.5" y="0.5" width="195" height="31" rx="15.5" fill="${bg}" stroke="${line}"/>
  <g transform="translate(12 5) scale(0.55)"><path d="M12 38.5V18" stroke="${ink}" stroke-width="1.7" stroke-linecap="round"/><circle cx="7.5" cy="8.5" r="5.5" fill="#E5452B"/><circle cx="16.5" cy="8.5" r="5.5" fill="#E5452B"/><circle cx="7.5" cy="15.5" r="5.5" fill="#C9371F"/><circle cx="16.5" cy="15.5" r="5.5" fill="#C9371F"/><circle cx="12" cy="12" r="2.6" fill="${ink}"/></g>
  <text x="32" y="20.5" fill="${ink}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif" font-size="12.5" font-weight="500">A Tall Poppy Studio app</text>
</svg>
`;
}

export function badgePage() {
  const slugs = APPS.filter((a) => a.status !== 'archived').map((a) => a.slug);
  const body = `<div class="wrap narrow">
  <section class="page-hero">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Badge</li></ol></nav>
    <p class="eyebrow accent">Studio badge</p>
    <h1>&ldquo;A Tall Poppy Studio app&rdquo;</h1>
    <p class="lede">A small badge for the footer of every Tall Poppy product site. It links back to the apps page with a <code>?ref=</code> tag, so the studio can see which site sent a visitor, and the apps page greets them by name.</p>
  </section>
  <section class="prose">
    <h2>Preview</h2>
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin:1rem 0 1.5rem">
      <div style="padding:1rem 1.25rem;border-radius:12px;background:#FFFFFF;color:#1C1814;border:1px solid var(--line)">${badgeSnippet('wikicatch')}</div>
      <div style="padding:1rem 1.25rem;border-radius:12px;background:#0B1220;color:#E6EDF7">${badgeSnippet('wikicatch')}</div>
      <div style="padding:1rem 1.25rem;border-radius:12px;background:#F4EFE3;color:#3A2E1F">${badgeSnippet('wikicatch')}</div>
    </div>
    <p>The text and stem take the colour of the surrounding footer text, so the badge sits in each product’s own palette. The petals stay poppy red.</p>
    <h2>HTML snippet</h2>
    <p>Paste it at the end of the footer, after Support · Privacy · Terms. Replace <code>APP-SLUG</code> with the app’s slug.</p>
    <pre><code>${esc(badgeSnippet())}</code></pre>
    <p>Slugs: ${slugs.map((s) => `<code>${s}</code>`).join(' ')}</p>
    <h2>Image version</h2>
    <p>Where HTML can’t be pasted (README files, docs), use the SVG image:</p>
    <div style="display:flex;gap:1rem;flex-wrap:wrap;margin:1rem 0"><img src="/badge/badge.svg" alt="A Tall Poppy Studio app" width="196" height="32"><img src="/badge/badge-dark.svg" alt="A Tall Poppy Studio app, dark" width="196" height="32"></div>
    <pre><code>${esc('<a href="https://tallpoppystudio.com/apps/?ref=APP-SLUG"><img src="https://tallpoppystudio.com/badge/badge.svg" alt="A Tall Poppy Studio app" width="196" height="32"></a>')}</code></pre>
    <p>Markdown: <code>${esc('[![A Tall Poppy Studio app](https://tallpoppystudio.com/badge/badge.svg)](https://tallpoppystudio.com/apps/?ref=APP-SLUG)')}</code></p>
  </section>
</div>`;
  return page({
    path: '/badge/',
    title: 'The “A Tall Poppy Studio app” badge | Tall Poppy Studio',
    description: 'Copy-paste footer badge for Tall Poppy Studio product sites, as HTML with inline SVG or as an SVG image, linking to the studio apps page with a ref tag.',
    og: '/og/badge.png',
    ld: [ORG, breadcrumbs([['Home', '/'], ['Badge', '/badge/']])],
    body,
  });
}

// ---------------------------------------------------------------- homepage
export function homePage(stats) {
  const by = Object.fromEntries(APPS.map((a) => [a.slug, a]));
  const featured = ['wikicatch', 'notehunter', 'meritvalue', 'kufu', 'wikihunt', 'matchframe'].map((s) => by[s]);
  const rest = APPS.filter((a) => !featured.includes(a) && !a.flagship && a.status !== 'archived');
  const kumano = by.kumano;
  const storeCount = APPS.filter((a) => a.appStoreId && !a.externalStore).length;
  const asc = stats['appstoreconnect-mcp'] || {};

  const fcard = (a) => {
    const ext = /^https?:/.test(a.url);
    return `<article class="card fcard reveal" data-slug="${a.slug}">
  <div class="stage">${phone(a)}</div>
  <div class="body">
    <div class="card-top">${iconImg(a, 48)}<div><h3><a href="/${a.slug}/">${esc(a.name)}</a></h3></div></div>
    ${chips(a)}
    <p class="tag">${esc(a.tagline)}</p>
    <p class="links">${ext ? `<a href="${esc(a.url)}">${esc(a.urlLabel)}</a>` : ''}${a.appStoreId ? `<a href="${esc(appStoreUrl(a.appStoreId, 'studio-home'))}">App Store</a>` : ''}<a href="${esc(supportHref(a))}">Support</a>${a.privacy ? `<a href="${esc(a.privacy)}">Privacy</a>` : ''}</p>
  </div>
</article>`;
  };
  const row = (a) => `<li><a class="row" href="/${a.slug}/">${iconImg(a, 40)}<span><span class="t">${esc(a.name)}</span><br><span class="d">${esc(a.tagline)}</span></span>${chips(a)}</a></li>`;

  const proof = [
    [String(storeCount), 'apps live on the App Store'],
    ['6,000+', 'US companies valued nightly by MeritValue'],
    ['0 → millions', 'users on Tier’s first iOS app, built from scratch'],
    asc.downloads ? [asc.downloads.toLocaleString('en-US'), 'npm downloads of appstoreconnect-mcp in the last 30 days'] : null,
  ].filter(Boolean);

  const hero = `<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow accent reveal">Tall Poppy Studio · Budapest</p>
      <h1 class="reveal">Native apps and AI tooling, built by one engineer.</h1>
      <p class="lede reveal">Tall Poppy Studio is the independent software studio of Akos Komuves. It makes iPhone, Mac and web apps, open-source tools for building apps with AI agents, and software for clients.</p>
      <div class="btns reveal" style="margin-top:2rem"><a class="btn btn-primary" href="/apps/">See the apps <span class="arr" aria-hidden="true">→</span></a><a class="btn btn-ghost" href="/work/">Work with me</a></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="phone p1">${by.meritvalue.shot ? `<img src="/img/shots/meritvalue.webp" alt="" width="480" height="1043" decoding="async">` : ''}</div>
      <div class="phone p2"><img src="/img/shots/wikicatch.webp" alt="" width="480" height="1043" fetchpriority="high" decoding="async"></div>
      <div class="phone p3"><img src="/img/shots/notehunter.webp" alt="" width="480" height="1043" decoding="async"></div>
    </div>
  </div>
</section>`;

  const body = `${hero}
<section class="proof" aria-label="The studio in numbers">
  <div class="wrap"><ul class="proof-list">${proof.map(([n, l]) => `<li class="reveal"><span class="n">${esc(n)}</span><span class="l">${esc(l)}</span></li>`).join('')}</ul>
  <p class="updated" style="margin-top:.75rem">As of ${UPDATED_HUMAN}. Sources: App Store, meritvalue.com, npm.</p></div>
</section>

<section class="section" aria-labelledby="h-flagship">
  <div class="wrap">
    <div class="section-head"><h2 id="h-flagship">Flagship: Kumano</h2></div>
    <div class="flagship reveal">
      ${iconImg(kumano, 88)}
      <div>
        ${chips(kumano)}
        <p class="lede" style="margin-top:.875rem;color:var(--ink)"><strong>Kumano is the product-management layer for agentic development.</strong> A team writes down what it wants; Kumano turns it into a committed spec and plan, runs Claude Code through it with a person at every gate, reviews each change and ships it in one click.</p>
        <div class="btns" style="margin-top:1.25rem"><a class="btn btn-primary" href="https://kumano.app">Visit kumano.app <span class="arr" aria-hidden="true">→</span></a><a class="btn btn-ghost" href="/kumano/">About Kumano</a></div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="h-apps">
  <div class="wrap">
    <div class="section-head"><h2 id="h-apps">Apps</h2><a class="more" href="/apps/">All apps →</a></div>
    <div class="featured">${featured.map(fcard).join('\n')}</div>
    <h3 class="eyebrow" style="margin:3rem 0 1rem">More from the studio</h3>
    <ul class="list">${rest.map(row).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="h-work">
  <div class="wrap">
    <div class="section-head"><h2 id="h-work">Client work</h2><a class="more" href="/work/">Work with me →</a></div>
    ${rowsHtml([[CLIENT_CASE.title, CLIENT_CASE.meta, CLIENT_CASE.body, CLIENT_CASE.scope]])}
    <div class="prev reveal"><p class="eyebrow">Previously</p><ul>${PREVIOUSLY.map(([t]) => `<li>${esc(t)}</li>`).join('')}</ul></div>
  </div>
</section>

<section class="section" aria-labelledby="h-oss">
  <div class="wrap">
    <div class="section-head"><h2 id="h-oss">Open source</h2><a class="more" href="/open-source/">All projects →</a></div>
    <div class="grid">${OSS.slice(0, 3).map(ossCard).join('\n')}</div>
  </div>
</section>

<section class="section" aria-labelledby="h-now">
  <div class="wrap two-col">
    <div class="reveal">
      <div class="section-head"><h2 id="h-now">Now</h2></div>
      <ul class="now-list">${NOW.slice(0, 3).map(([t, b]) => `<li><strong>${esc(t)}.</strong> ${esc(b)}</li>`).join('')}</ul>
      <p class="small" style="margin-top:1rem"><a href="/now/">Everything I’m working on</a> · <span class="muted">updated ${UPDATED_HUMAN}</span></p>
    </div>
    <div class="reveal" id="support">
      <div class="section-head"><h2>Need help with an app?</h2></div>
      <p class="muted" style="margin-bottom:1rem">Pick it here. A person answers every email.</p>
      <ul class="support-icons">${APPS.filter((a) => a.status !== 'archived').map((a) => `<li><a href="${esc(supportHref(a))}" title="${esc(a.name)} support">${iconImg(a, 44)}<span class="sr">${esc(a.name)} support</span></a></li>`).join('')}</ul>
    </div>
  </div>
</section>`;

  return page({
    path: '/', current: '/',
    title: 'Tall Poppy Studio — Akos Komuves, independent software studio',
    description: 'Tall Poppy Studio is an independent software studio in Budapest run by Akos Komuves: native iOS and Mac apps, web products and AI tooling, including Kumano, WikiCatch, NoteHunter and MeritValue.',
    og: '/og/home.png',
    ogAlt: 'Tall Poppy Studio: native apps and AI tooling, by Akos Komuves',
    ld: [ORG, PERSON, { '@type': 'WebSite', '@id': `${SITE}/#site`, url: `${SITE}/`, name: 'Tall Poppy Studio', publisher: { '@id': `${SITE}/#org` } }],
    extraHead: '<link rel="preload" as="image" href="/img/shots/wikicatch.webp" type="image/webp">',
    body,
  });
}
