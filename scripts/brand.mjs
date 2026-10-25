// Brand palette and marks for the studio site, as inline SVG strings.

export const POPPY = '#E5452B';
export const POPPY_DEEP = '#C9371F';
export const INK = '#1C1814';
export const PAPER = '#FBF6EE';

// Letter mark on a rounded poppy-red square: for favicons and small badges.
// Uses system serifs so the SVG stays self-contained and renders everywhere.
export function head({ petal = POPPY, ink = PAPER } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">`
    + `<rect width="24" height="24" rx="5" fill="${petal}"/>`
    + `<text x="12" y="17.5" text-anchor="middle" font-family="'Fraunces','Times New Roman',Georgia,serif" font-size="17" font-weight="600" fill="${ink}">T</text></svg>`;
}

// Studio wordmark as a self-contained SVG: for the downloadable press mark.
export function wordmark({ petal = POPPY, ink = INK } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 60" role="img" aria-label="Tall Poppy Studio">`
    + `<text x="0" y="44" font-family="'Fraunces','Times New Roman',Georgia,serif" font-size="46" font-weight="600" letter-spacing="-0.8" fill="${ink}">Tall Poppy <tspan fill="${petal}">Studio</tspan></text></svg>`;
}
