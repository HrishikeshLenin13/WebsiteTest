import { normalizeHex } from './contrast.mjs';
export function colorHash(colors) {
  return '#' + new URLSearchParams({fg:normalizeHex(colors.foreground),bg:normalizeHex(colors.background)}).toString();
}
export function parseColorHash(hash) {
  if (typeof hash !== 'string' || hash.length > 512) return null;
  try {
    const values = new URLSearchParams(hash.replace(/^#/, ''));
    if (values.getAll('fg').length !== 1 || values.getAll('bg').length !== 1) return null;
    return {foreground:normalizeHex(values.get('fg')),background:normalizeHex(values.get('bg'))};
  } catch { return null; }
}
