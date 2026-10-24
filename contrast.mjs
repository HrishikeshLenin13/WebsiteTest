/** Relative luminance for six-digit sRGB colors. */
export function luminance(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new TypeError('Use a six-digit hex color.');
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
