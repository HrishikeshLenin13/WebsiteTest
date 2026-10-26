import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
import * as hash from '../color-hash.mjs';

test("black-luminance-is-the-srgb-origin", () => {
assert.equal(api.luminance('#000000'),0);assert.equal(api.luminance('#ffffff'),1);
});

test("luminance-uses-channel-specific-weights", () => {
assert.ok(api.luminance('#00ff00')>api.luminance('#ff0000'));assert.ok(api.luminance('#ff0000')>api.luminance('#0000ff'));
});
