export const DEFAULT_COLORS = Object.freeze({ foreground: '#193c47', background: '#f2f7f5' });
const KEY = 'website-test.colors.v1';
const valid = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
export function loadColors(storage) {
  try {
    const saved = JSON.parse(storage.getItem(KEY));
    if (saved && valid(saved.foreground) && valid(saved.background)) {
      return { foreground: saved.foreground, background: saved.background };
    }
  } catch { /* A blocked or corrupt store leaves the workbench usable. */ }
  return { ...DEFAULT_COLORS };
}
export function saveColors(storage, colors) {
  if (!colors || !valid(colors.foreground) || !valid(colors.background)) return false;
  try { storage.setItem(KEY, JSON.stringify({foreground:colors.foreground, background:colors.background})); return true; } catch { return false; }
}
export function resetColors(storage) {
  try { storage.removeItem(KEY); } catch { /* Storage is optional. */ }
  return { ...DEFAULT_COLORS };
}

export function swapColors(colors) {
  if (!colors || !valid(colors.foreground) || !valid(colors.background)) throw new TypeError('Use two six-digit colors.');
  return { foreground: colors.background, background: colors.foreground };
}
