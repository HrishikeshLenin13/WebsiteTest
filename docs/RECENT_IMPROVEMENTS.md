# Color contrast and shared palettes

This guide covers implemented behavior. It does not change deployment or account configuration.

## Usage

```js
import { contrastChecks } from './contrast.mjs';
import { colorHash, parseColorHash } from './color-hash.mjs';
console.log(contrastChecks('#000', '#fff').normalAAA); // true
console.log(parseColorHash(colorHash({foreground:'#112233',background:'#ffffff'})));
```

## Contracts and limits

- Hex shorthand is expanded to six lowercase digits. Color names and alpha channels are rejected.
- Swap colors is reversible. AA and AAA checks use the same unrounded contrast ratio.
- Share pair in URL writes a fragment, not a server request. A valid fragment takes precedence over saved preferences. Reset clears the shared pair fragment.
- Preference persistence allowlists foreground and background; blocked browser storage does not stop comparison.

## Source map

- [`contrast.mjs`](../contrast.mjs)
<!-- source: contrast.mjs -->
- [`preferences.mjs`](../preferences.mjs)
<!-- source: preferences.mjs -->
- [`color-hash.mjs`](../color-hash.mjs)
<!-- source: color-hash.mjs -->
- [`app.mjs`](../app.mjs)
<!-- source: app.mjs -->
- [`tests/round2.test.mjs`](../tests/round2.test.mjs)
<!-- source: tests/round2.test.mjs -->

## Regression command

Run from the repository root:

```sh
node --test tests/*.test.mjs
```


## Contrast assistance and exports

The workbench can suggest black/white text, choose normal/large AA or AAA targets, download allowlisted JSON, and preview/copy canonical CSS declarations. Suggestions maximize neutral-text contrast, but do not guarantee AAA for every background. Clipboard failures leave a selectable preview and status message. Shared links reject duplicate fg/bg fields rather than choosing an ambiguous value.
