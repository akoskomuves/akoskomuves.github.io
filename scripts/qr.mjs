// Writes img/qr/{slug}.svg: a QR code for each app's App Store link (ct=studio-qr),
// shown next to the App Store badge on desktop. Needs the `qrcode` package, which
// the site itself does not depend on:
//   npm i --no-save qrcode@1.5.4 && node scripts/qr.mjs
import QR from 'qrcode';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPS, appStoreUrl } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(join(ROOT, 'img/qr'), { recursive: true });
for (const a of APPS) {
  if (!a.appStoreId || a.externalStore) continue;
  const svg = await QR.toString(appStoreUrl(a.appStoreId, 'studio-qr'), {
    type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#1C1814', light: '#FFFFFF' },
  });
  writeFileSync(join(ROOT, 'img/qr', `${a.slug}.svg`), svg);
  console.log('img/qr/' + a.slug + '.svg');
}
