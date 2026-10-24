import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contrastRatio, contrastLabel } from '../contrast.mjs';
test('black and white are 21:1 and identical colors are 1:1', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.equal(contrastRatio('#123456', '#123456'), 1);
  assert.equal(contrastRatio('#ffffff', '#000000'), 21);
});
test('thresholds use the unrounded ratio', () => {
  assert.match(contrastLabel(4.5), /normal-text/);
  assert.equal(contrastLabel(4.499), 'Large text only');
  assert.equal(contrastLabel(3), 'Large text only');
  assert.match(contrastLabel(2.999), /Below/);
  assert.throws(() => contrastRatio('red', '#000000'), TypeError);
});
