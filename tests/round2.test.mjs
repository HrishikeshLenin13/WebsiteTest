import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as contrast from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
test('hex normalization expands CSS shorthand and rejects alpha or names', () => { assert.equal(contrast.normalizeHex(' #AbC '), '#aabbcc'); assert.equal(contrast.contrastRatio('#000', '#fff'), 21); for (const bad of [null,'red','#ffff','123456']) assert.throws(() => contrast.normalizeHex(bad), TypeError); });
test('structured contrast checks distinguish AA and AAA', () => { assert.deepEqual(contrast.contrastChecks('#000','#fff'), {ratio:21,normalAA:true,largeAA:true,normalAAA:true,largeAAA:true}); assert.equal(contrast.contrastChecks('#777','#fff').normalAAA,false); });
test('swapping a pair is reversible and does not mutate it', () => { const pair={foreground:'#112233',background:'#ffffff'}; assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair); assert.equal(pair.foreground,'#112233'); });
import { colorHash, parseColorHash } from '../color-hash.mjs';
test('shared pair hashes round trip and reject malformed input', () => { const pair={foreground:'#000000',background:'#ffffff'}; assert.deepEqual(parseColorHash(colorHash(pair)),pair); for (const bad of ['', '#fg=red&bg=blue', '#fg=%23fff', 'x'.repeat(513)]) assert.equal(parseColorHash(bad),null); });
test('saved preferences allowlist color fields and handle null', () => { let raw; const storage={setItem:(_,s)=>raw=s}; assert.equal(prefs.saveColors(storage,null),false); assert.equal(prefs.saveColors(storage,{...prefs.DEFAULT_COLORS,extra:'ignored'}),true); assert.deepEqual(Object.keys(JSON.parse(raw)),['foreground','background']); });

test('generated palettes preserve contrast symmetry, bounds and URL round trips', () => {
  const hex = value => '#' + value.toString(16).padStart(6,'0');
  for(let i=0;i<256;i++) {
    const foreground=hex(i*65793), background=hex(0xffffff-i*31001);
    const pair={foreground,background};
    const ratio=contrast.contrastRatio(foreground,background);
    assert.ok(ratio>=1 && ratio<=21);
    assert.equal(ratio,contrast.contrastRatio(background,foreground));
    assert.equal(contrast.contrastRatio(foreground,foreground),1);
    assert.deepEqual(parseColorHash(colorHash(pair)),pair);
    assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);
  }
});
