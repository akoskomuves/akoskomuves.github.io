// The poppy glyph and wordmark, as inline SVG strings.
// Petals use --poppy / --poppy-deep, the centre and stem use currentColor,
// so the mark follows the page's ink colour in light and dark mode.

export const POPPY = '#E5452B';
export const POPPY_DEEP = '#C9371F';
export const INK = '#1C1814';
export const PAPER = '#FBF6EE';

// Tall version (flower on a stem): 24 x 40.
export function glyph({ size = 28, title = '', petal = 'var(--poppy, #E5452B)', deep = 'var(--poppy-deep, #C9371F)', ink = 'currentColor', cls = 'poppy' } = {}) {
  const h = Math.round(size * 40 / 24);
  const a11y = title ? `role="img" aria-label="${title}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="${cls}" ${a11y} width="${size}" height="${h}" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">`
    + `<path d="M12 38.5V18" stroke="${ink}" stroke-width="1.7" stroke-linecap="round"/>`
    + `<path d="M12 30.5c2.6-.6 4.6-2.4 5.3-5" stroke="${ink}" stroke-width="1.4" stroke-linecap="round" fill="none"/>`
    + `<circle cx="7.5" cy="8.5" r="5.5" fill="${petal}"/><circle cx="16.5" cy="8.5" r="5.5" fill="${petal}"/>`
    + `<circle cx="7.5" cy="15.5" r="5.5" fill="${deep}"/><circle cx="16.5" cy="15.5" r="5.5" fill="${deep}"/>`
    + `<circle cx="12" cy="12" r="2.6" fill="${ink}"/></svg>`;
}

// Head only, square: for favicons and small badges.
export function head({ petal = POPPY, deep = POPPY_DEEP, ink = INK } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 2 22 20">`
    + `<circle cx="7.5" cy="8.5" r="5.5" fill="${petal}"/><circle cx="16.5" cy="8.5" r="5.5" fill="${petal}"/>`
    + `<circle cx="7.5" cy="15.5" r="5.5" fill="${deep}"/><circle cx="16.5" cy="15.5" r="5.5" fill="${deep}"/>`
    + `<circle cx="12" cy="12" r="2.6" fill="${ink}"/></svg>`;
}
