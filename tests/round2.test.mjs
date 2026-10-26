import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as contrast from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
test('hex normalization expands CSS shorthand and rejects alpha or names', () => { assert.equal(contrast.normalizeHex(' #AbC '), '#aabbcc'); assert.equal(contrast.contrastRatio('#000', '#fff'), 21); for (const bad of [null,'red','#ffff','123456']) assert.throws(() => contrast.normalizeHex(bad), TypeError); });
test('structured contrast checks distinguish AA and AAA', () => { assert.deepEqual(contrast.contrastChecks('#000','#fff'), {ratio:21,normalAA:true,largeAA:true,normalAAA:true,largeAAA:true}); assert.equal(contrast.contrastChecks('#777','#fff').normalAAA,false); });
test('swapping a pair is reversible and does not mutate it', () => { const pair={foreground:'#112233',background:'#ffffff'}; assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair); assert.equal(pair.foreground,'#112233'); });
