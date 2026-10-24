import { contrastRatio, contrastLabel } from './contrast.mjs';
import { loadColors, saveColors, resetColors } from './preferences.mjs';
let storage;
try { storage = window.localStorage; } catch { /* Persistence is optional. */ }
const foreground = document.querySelector('#foreground');
const background = document.querySelector('#background');
const sample = document.querySelector('#sample');
const result = document.querySelector('#result');
const initial = loadColors(storage);
foreground.value = initial.foreground;
background.value = initial.background;
function render() {
  const ratio = contrastRatio(foreground.value, background.value);
  sample.style.color = foreground.value;
  sample.style.backgroundColor = background.value;
  result.textContent = `${ratio.toFixed(2)}:1 — ${contrastLabel(ratio)}`;
}
function update() {
  render();
  saveColors(storage, { foreground: foreground.value, background: background.value });
}
foreground.addEventListener('input', update);
background.addEventListener('input', update);
document.querySelector('#reset').addEventListener('click', () => {
  const defaults = resetColors(storage);
  foreground.value = defaults.foreground;
  background.value = defaults.background;
  render();
});
render();
