/** Canonical six-digit sRGB; CSS shorthand expands without losing channels. */
export function normalizeHex(value) {
  if (typeof value !== 'string') throw new TypeError('Use a hex color.');
  let hex = value.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(hex)) hex = '#' + [...hex.slice(1)].map(c => c + c).join('');
  if (!/^#[0-9a-f]{6}$/.test(hex)) throw new TypeError('Use three or six hex digits.');
  return hex;
}
/** Relative luminance for an sRGB color. */
export function luminance(hex) {
  hex = normalizeHex(hex);
  const linear = [1, 3, 5].map(offset => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
export function contrastRatio(foreground, background) {
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
export function contrastLabel(ratio) {
  return ratio >= 4.5 ? 'Meets the normal-text contrast threshold' : ratio >= 3 ? 'Large text only' : 'Below the text contrast thresholds';
}

/** Independent AA/AAA decisions use the full, unrounded contrast ratio. */
export function contrastChecks(foreground, background) {
  const ratio = contrastRatio(foreground, background);
  return { ratio, normalAA: ratio >= 4.5, largeAA: ratio >= 3, normalAAA: ratio >= 7, largeAAA: ratio >= 4.5 };
}

/** Pick the higher-contrast neutral foreground, without changing the background. */
export function readableForeground(background) {
  return contrastRatio('#000000',background) >= contrastRatio('#ffffff',background) ? '#000000' : '#ffffff';
}

export const CONTRAST_TARGETS = Object.freeze({normalAA:4.5,largeAA:3,normalAAA:7,largeAAA:4.5});
export function meetsContrastTarget(foreground, background, target='normalAA') {
  if (!Object.hasOwn(CONTRAST_TARGETS,target)) throw new TypeError('Unknown contrast target.');
  return contrastRatio(foreground,background) >= CONTRAST_TARGETS[target];
}
