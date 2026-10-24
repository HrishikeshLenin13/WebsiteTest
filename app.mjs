import { contrastRatio, contrastLabel } from './contrast.mjs';
const foreground = document.querySelector('#foreground');
const background = document.querySelector('#background');
const sample = document.querySelector('#sample');
const result = document.querySelector('#result');
function render() {
  const ratio = contrastRatio(foreground.value, background.value);
  sample.style.color = foreground.value;
  sample.style.backgroundColor = background.value;
  result.textContent = `${ratio.toFixed(2)}:1 — ${contrastLabel(ratio)}`;
}
foreground.addEventListener('input', render);
background.addEventListener('input', render);
render();
