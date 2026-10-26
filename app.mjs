import { contrastRatio, contrastLabel, contrastChecks, readableForeground, meetsContrastTarget, contrastReport, colorCss } from './contrast.mjs';
import { loadColors, saveColors, resetColors, swapColors } from './preferences.mjs';
import { colorHash, parseColorHash } from './color-hash.mjs';
let storage;
try { storage = window.localStorage; } catch { /* Persistence is optional. */ }
const foreground = document.querySelector('#foreground');
const background = document.querySelector('#background');
const sample = document.querySelector('#sample');
const result = document.querySelector('#result');
const target = document.querySelector('#target');
const initial = parseColorHash(location.hash) ?? loadColors(storage);
foreground.value = initial.foreground;
background.value = initial.background;
function render() {
  const ratio = contrastRatio(foreground.value, background.value);
  sample.style.color = foreground.value;
  sample.style.backgroundColor = background.value;
  const checks = contrastChecks(foreground.value, background.value);
  document.querySelector("#css-preview").textContent = colorCss({foreground:foreground.value,background:background.value});
  result.textContent = `${ratio.toFixed(2)}:1 — ${contrastLabel(ratio)}. AAA normal text: ${checks.normalAAA ? "pass" : "below threshold"}. Selected ${target.selectedOptions[0].text}: ${meetsContrastTarget(foreground.value,background.value,target.value) ? "pass" : "below threshold"}.`;
}
function update() {
  render();
  if (parseColorHash(location.hash)) history.replaceState(null, "", colorHash({foreground:foreground.value,background:background.value}));
  saveColors(storage, { foreground: foreground.value, background: background.value });
}
foreground.addEventListener('input', update);
background.addEventListener('input', update);
document.querySelector('#share').addEventListener('click', () => {
  history.replaceState(null, '', colorHash({foreground:foreground.value,background:background.value}));
});
document.querySelector('#swap').addEventListener('click', () => {
  const next = swapColors({ foreground: foreground.value, background: background.value });
  foreground.value = next.foreground; background.value = next.background; update();
});
document.querySelector('#reset').addEventListener('click', () => {
  const defaults = resetColors(storage);
  history.replaceState(null, "", location.pathname + location.search);
  foreground.value = defaults.foreground;
  background.value = defaults.background;
  render();
});
render();

// Fragment-only navigation does not reload this module. Honor shared links on
// same-document navigation and browser back/forward as well as initial load.
window.addEventListener('hashchange', () => {
  const pair = parseColorHash(location.hash);
  if (!pair) return;
  foreground.value = pair.foreground;
  background.value = pair.background;
  render();
  saveColors(storage, pair);
});

document.querySelector('#suggest').addEventListener('click', () => { foreground.value = readableForeground(background.value); update(); });
target.addEventListener('change', render);

document.querySelector('#download').addEventListener('click', () => {
  const report=contrastReport({foreground:foreground.value,background:background.value},target.value);
  const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)+'\n'],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download='contrast-report.json';document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
});

document.querySelector('#copy-css').addEventListener('click', async () => {
  const status=document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(colorCss({foreground:foreground.value,background:background.value})); status.textContent='CSS copied.'; }
  catch { status.textContent='Copy was unavailable. Select the CSS preview to copy it manually.'; }
});
