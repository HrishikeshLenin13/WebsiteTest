import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
import * as hash from '../color-hash.mjs';

test("black-luminance-is-the-srgb-origin", () => {
assert.equal(api.luminance('#000000'),0);assert.equal(api.luminance('#ffffff'),1);
});
