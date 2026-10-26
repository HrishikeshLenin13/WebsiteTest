import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as contrast from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
test('hex normalization expands CSS shorthand and rejects alpha or names', () => { assert.equal(contrast.normalizeHex(' #AbC '), '#aabbcc'); assert.equal(contrast.contrastRatio('#000', '#fff'), 21); for (const bad of [null,'red','#ffff','123456']) assert.throws(() => contrast.normalizeHex(bad), TypeError); });
