// Single source of truth for the studio's products. scripts/build.mjs turns
// this into the homepage cards, /apps/, the per-app hub pages, llms.txt,
// sitemap.xml and the JSON-LD. Edit here, then run `node scripts/build.mjs`.
//
// Status must be true on the day it is written. Checked 2026-10-13 against
// the public App Store lookup for developer 1478520249 and App Store Connect.

export const SITE = 'https://tallpoppystudio.com';
export const EMAIL = 'akos@tallpoppystudio.com';
export const PT = '120404971'; // App Store provider token, as in notehunter/campaign.js
export const UPDATED = '2026-10-13';

export const STATUS = {
  live: 'Live',
  beta: 'Beta',
  maintained: 'Maintained',
  archived: 'Archived',
};

export const GROUPS = [
  { id: 'outdoors', name: 'Outdoors maps', blurb: 'Maps for people who go outside to fish and hunt.' },
  { id: 'learn', name: 'Learn & create', blurb: 'Music, sound, photos and video.' },
  { id: 'life', name: 'Health & everyday life', blurb: 'Training, tea, sun care and getting around.' },
  { id: 'money', name: 'Money & work', blurb: 'Valuing companies and recording inventions.' },
  { id: 'dev', name: 'Developer tools', blurb: 'Tools for building and growing apps, many of them open source.' },
];

// kind = the chip shown on the card. platforms use Apple's names.
export const APPS = [
  {
    slug: 'wikicatch', name: 'WikiCatch', group: 'outdoors', kind: 'Outdoors maps',
    status: 'live', platforms: ['iOS'], featured: true,
    tagline: 'A fishing spots map with weather, solunar times and a catch log.',
    desc: 'A worldwide map of fishing spots, filterable by water type, with real-time weather and solunar data, a fish species database and catch logging with photos.',
    url: 'https://wikicatch.app', urlLabel: 'wikicatch.app', appStoreId: '6758548046',
    privacy: 'https://wikicatch.app/privacy', terms: 'https://wikicatch.app/terms',
    shot: 'wikicatch', shotAlt: 'The WikiCatch map: fishing spots around Loch Lomond with a spot card',
    category: 'SportsApplication',
  },
  {
    slug: 'wikihunt', name: 'WikiHunt', group: 'outdoors', kind: 'Outdoors maps',
    status: 'live', platforms: ['iOS'], featured: true,
    tagline: 'GPS hunting maps with land ownership, wind and hunt forecasts.',
    desc: 'Hunting maps with public and private land boundaries, topographic layers, wind and game activity forecasts. Mark stands, trails and cameras, plan hunts and log harvests.',
    url: 'https://wikihunt.app', urlLabel: 'wikihunt.app', appStoreId: '6760655517',
    support: 'https://wikihunt.app/support', privacy: 'https://wikihunt.app/privacy',
    shot: 'wikihunt', shotAlt: 'The WikiHunt map near Bozeman with land ownership shading',
    category: 'NavigationApplication',
  },
  {
    slug: 'notehunter', name: 'NoteHunter', group: 'learn', kind: 'Music',
    status: 'live', platforms: ['iOS', 'iPadOS', 'macOS'], featured: true,
    tagline: 'Ear training and music theory for iPhone, iPad and Mac.',
    desc: 'Ear training for notes, intervals and rhythm, sight reading, and a full music theory course, in one app for iPhone, iPad and Mac.',
    url: '/notehunter/', urlLabel: 'NoteHunter page', appStoreId: '1584522362',
    support: '/notehunter/support/', privacy: '/notehunter/privacy/',
    shot: 'notehunter', shotAlt: 'NoteHunter ear training: a note plays and you pick its name',
    category: 'EducationalApplication', hub: 'existing',
  },
  {
    slug: 'meritvalue', name: 'MeritValue', group: 'money', kind: 'Finance',
    status: 'live', platforms: ['Web', 'iOS', 'MCP'], featured: true,
    tagline: 'Intrinsic stock valuations computed from SEC filings.',
    desc: 'More than 6,000 US-listed companies valued nightly by a deterministic, version-controlled engine, with every figure traceable to the filing it came from. It asks whether a business is worth owning at a fair price, not whether the stock will go up.',
    url: 'https://www.meritvalue.com', urlLabel: 'meritvalue.com', appStoreId: '6795664202',
    price: 'Free download on the App Store; paid plans on the web, see <a href="https://www.meritvalue.com/pricing">meritvalue.com/pricing</a>',
    support: 'https://www.meritvalue.com/support', privacy: 'https://www.meritvalue.com/privacy', terms: 'https://www.meritvalue.com/terms',
    shot: 'meritvalue', shotAlt: 'MeritValue on the web: the Apple Inc. valuation page with figures from the filings',
    category: 'FinanceApplication', web: true,
  },
  {
    slug: 'kufu', name: 'Kufu', group: 'life', kind: 'Health & fitness',
    status: 'live', platforms: ['iOS', 'watchOS'], featured: true,
    tagline: 'Gym and calisthenics training with an on-device coach.',
    desc: 'Strength cycles and calisthenics progressions in one plan, built on Apple Health with an Apple Watch app, nutrition logging from a photo, and a coach that runs on device with Apple Intelligence.',
    url: 'https://kufuapp.com', urlLabel: 'kufuapp.com', appStoreId: '6760716466',
    privacy: 'https://kufuapp.com/privacy',
    shot: 'kufu', shotAlt: 'The Kufu home screen: today’s goal, muscle recovery and the next workout',
    category: 'HealthApplication',
  },
  {
    slug: 'matchframe', name: 'Matchframe', group: 'learn', kind: 'Photo',
    status: 'live', platforms: ['iOS'], featured: true,
    tagline: 'A dating photo coach that scores your photos and fills the gaps.',
    desc: 'Scores your dating photos on lighting, composition, expression and clarity, builds a six-photo strategy for your profile, and generates the photo types you are missing.',
    url: 'https://matchframe.app', urlLabel: 'matchframe.app', appStoreId: '6759290521',
    privacy: 'https://matchframe.app/privacy', terms: 'https://matchframe.app/terms',
    shot: 'matchframe', shotAlt: 'Matchframe’s strategy screen: profile photos scored by category',
    category: 'LifestyleApplication',
  },
  {
    slug: 'kumano', name: 'Kumano', group: 'dev', kind: 'Dev tools',
    status: 'beta', platforms: ['macOS'], flagship: true,
    tagline: 'The product-management layer for agentic development.',
    desc: 'A team writes down what it wants; Kumano turns that into a committed intent, spec and plan, runs Claude Code through them with a person at every gate, reviews each change, and ships it in one click. Prompt review, formerly Promptly, is built in.',
    url: 'https://kumano.app', urlLabel: 'kumano.app',
    price: 'macOS beta, downloaded from kumano.app',
    note: 'Kumano is a macOS beta. Download it from <a href="https://kumano.app">kumano.app</a>.',
    privacy: 'https://kumano.app/privacy', terms: 'https://kumano.app/terms',
    category: 'DeveloperApplication', mac: true,
  },
  {
    slug: 'invention-capture', name: 'Invention Capture', group: 'money', kind: 'Productivity',
    status: 'live', platforms: ['iOS'],
    tagline: 'Talk through an invention; get a structured disclosure, on device.',
    desc: 'Records an invention as it happens, by voice and photos, and turns it into a structured invention disclosure entirely on the iPhone. Exports PDF and JSON.',
    url: '/invention-capture/', urlLabel: 'Invention Capture page', appStoreId: '6778804651',
    privacy: 'https://github.com/akoskomuves/privacy-policies/wiki/Invention-Capture-Privacy-Policy',
    category: 'BusinessApplication', noDomain: true,
  },
  {
    slug: 'kotone', name: 'Kotone', group: 'learn', kind: 'Culture',
    status: 'live', platforms: ['Web'],
    tagline: 'A listening room for traditional music of Japan and China.',
    desc: 'Koto, shakuhachi, gagaku, guqin, erhu and Peking opera. Every recording is public domain or Creative Commons, streamed from the Internet Archive and catalogued by hand with original-script titles, licence and source.',
    url: 'https://kotone.co', urlLabel: 'kotone.co',
    price: 'Free to listen on the web',
    category: 'MusicApplication', web: true,
  },
  {
    slug: 'shrd', name: 'SHRD', group: 'life', kind: 'Travel',
    status: 'live', platforms: ['iOS', 'Android'],
    tagline: 'Share a taxi with riders heading your way and split the fare.',
    desc: 'Find nearby riders going the same direction, chat to coordinate the ride, and get a fair, automatic cost breakdown.',
    url: 'https://www.shrdapp.com', urlLabel: 'shrdapp.com', appStoreId: '6755481627',
    play: 'https://play.google.com/store/apps/details?id=com.akoskomuves.taxibuddyandroid',
    support: 'https://www.shrdapp.com/support.html', privacy: 'https://www.shrdapp.com/privacy.html',
    category: 'TravelApplication',
  },
  {
    slug: 'gaiwan', name: 'Gaiwan', group: 'life', kind: 'Food & drink',
    status: 'live', platforms: ['iOS'],
    tagline: 'A gongfu tea timer and journal for the tea you drink.',
    desc: 'What is in your tea cabinet, how each pot went and where the leaf came from. Data stays on the device, with no account.',
    url: '/gaiwan/', urlLabel: 'Gaiwan page', appStoreId: '6814422371',
    support: '/gaiwan/', privacy: '/gaiwan/privacy/',
    category: 'LifestyleApplication', hub: 'existing',
  },
  {
    slug: 'tuuvi', name: 'Tuuvi', group: 'life', kind: 'Family',
    status: 'maintained', platforms: ['iOS'],
    tagline: 'Sun care for families: UV alerts and SPF reapply reminders.',
    desc: 'Up to eight family profiles with personalised SPF and reapply reminders based on real-time UV, age, skin type and daily routine. No tracking, no ads.',
    url: '/tuuvi/', urlLabel: 'Tuuvi page', appStoreId: '6752693234',
    support: '/tuuvi/', privacy: '/tuuvi/privacy/',
    category: 'HealthApplication', hub: 'existing',
  },
  {
    slug: 'sensorcam', name: 'SensorCam RAW', group: 'learn', kind: 'Photo & video',
    status: 'beta', platforms: ['iOS'],
    tagline: 'Open gate video and 48 MP ProRAW on iPhone.',
    desc: 'A camera app that records full-sensor open gate video to the iPhone itself and shoots 48 MP ProRAW stills, with manual controls, Log and LUTs. In TestFlight beta.',
    url: '/sensorcam/', urlLabel: 'SensorCam RAW page',
    price: 'TestFlight beta; not on the App Store yet',
    note: 'SensorCam RAW is in TestFlight beta and not on the App Store yet. To join the beta, write to <a href="mailto:akos@tallpoppystudio.com?subject=SensorCam%20RAW%20beta">akos@tallpoppystudio.com</a>.',
    support: '/sensorcam/support/', privacy: '/sensorcam/privacy/',
    shot: 'sensorcam', shotAlt: 'The SensorCam RAW viewfinder in photo mode with manual exposure controls',
    category: 'PhotographyApplication', noDomain: true,
  },
  {
    slug: 'kranked', name: 'Kranked', group: 'dev', kind: 'Dev tools',
    status: 'live', platforms: ['iOS'],
    tagline: 'App Store keyword rankings and research for indie developers.',
    desc: 'Check where your app ranks for a keyword, find new keywords and watch competitors, using Apple’s own public data, without an expensive subscription.',
    url: '/kranked/', urlLabel: 'Kranked page', appStoreId: '6755593681',
    privacy: 'https://github.com/akoskomuves/privacy-policies/wiki/Kranked-PP',
    shot: 'kranked', shotAlt: 'The Kranked dashboard: tracked keywords, average rank and fastest climbers',
    category: 'DeveloperApplication', noDomain: true,
  },
  {
    slug: 'wikibubbles', name: 'WikiBubbles', group: 'outdoors', kind: 'Outdoors maps',
    status: 'archived', platforms: ['iOS', 'Android'],
    tagline: 'Dive and snorkel sites worldwide.',
    desc: 'Dive and snorkel sites with marine life and conditions, and a dive log. Still on the App Store and Google Play; no longer in active development here.',
    url: 'https://apps.apple.com/us/app/wikibubbles-snorkeling-spots/id6744599608', urlLabel: 'App Store',
    play: 'https://play.google.com/store/apps/details?id=com.familydog.wikibubbles',
    hub: 'none', category: 'TravelApplication', externalStore: true,
  },
];

export const OSS = [
  {
    slug: 'appstoreconnect-mcp', name: 'appstoreconnect-mcp', group: 'dev', kind: 'Open source',
    status: 'live', platforms: ['MCP'], lang: 'TypeScript', license: 'MIT',
    tagline: 'An MCP server for the App Store Connect API.',
    desc: 'Manage prices (including purchasing-power-parity rebalancing across territories), subscriptions and offers, TestFlight builds and app metadata from an AI coding agent.',
    links: [
      ['npm', 'https://www.npmjs.com/package/@akoskomuves/appstoreconnect-mcp'],
      ['GitHub', 'https://github.com/akoskomuves/appstoreconnect-mcp'],
    ],
    install: 'npx -y @akoskomuves/appstoreconnect-mcp',
    npm: '@akoskomuves/appstoreconnect-mcp',
  },
  {
    slug: 'kranked-mcp', name: 'kranked-mcp', group: 'dev', kind: 'Open source',
    status: 'live', platforms: ['MCP'], lang: 'Python', license: 'MIT',
    tagline: 'App Store keyword research for your AI coding assistant.',
    desc: 'Ask Claude, Cursor or any MCP client how hard a keyword is, how popular it is and where your app ranks. Runs locally on Apple’s public endpoints, no account or API key.',
    links: [
      ['PyPI', 'https://pypi.org/project/kranked-mcp/'],
      ['GitHub', 'https://github.com/akoskomuves/kranked'],
    ],
    install: 'claude mcp add kranked -- uvx kranked-mcp',
    pypi: 'kranked-mcp',
  },
  {
    slug: 'aso-cross-localization', name: 'aso-cross-localization', group: 'dev', kind: 'Open source',
    status: 'live', platforms: ['Claude Code skill'], lang: 'Python', license: 'MIT',
    tagline: 'A Claude Code skill for App Store cross-localization.',
    desc: 'Stack keywords in the secondary localizations each App Store storefront indexes: locale tables, a scoring playbook and a validator for the bundle.',
    links: [['GitHub', 'https://github.com/akoskomuves/aso-cross-localization']],
  },
  {
    slug: 'meritvalue-skills', name: 'meritvalue-skills', group: 'dev', kind: 'Open source',
    status: 'live', platforms: ['Agent skills'], license: 'MIT',
    tagline: 'Skills for valuing public companies like an owner.',
    desc: 'Free frameworks for moats, DCF, reverse DCF and expected return. Connect the MeritValue MCP for reproducible numbers from SEC filings.',
    links: [['GitHub', 'https://github.com/akoskomuves/meritvalue-skills']],
  },
];

export const appStoreUrl = (id, ct) =>
  `https://apps.apple.com/app/apple-store/id${id}?pt=${PT}&ct=${encodeURIComponent(ct)}&mt=8`;
