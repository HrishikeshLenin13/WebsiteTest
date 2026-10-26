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

test("shorthand-expands-each-channel-independently", () => {
assert.equal(api.normalizeHex('#a0F'),'#aa00ff');assert.equal(api.normalizeHex('#000'),'#000000');
});

test("normalization-trims-only-outside-the-color", () => {
assert.equal(api.normalizeHex('  #Ab12EF  '),'#ab12ef');assert.throws(()=>api.normalizeHex('#ab 12ef'));
});

test("alpha-shorthand-is-not-an-opaque-color", () => {
for(const value of ['#1234','#12345678'])assert.throws(()=>api.normalizeHex(value));
});

test("css-function-inputs-do-not-enter-hex-math", () => {
for(const value of ['rgb(0 0 0)','hsl(0 0% 0%)'])assert.throws(()=>api.normalizeHex(value));
});

test("non-string-color-values-are-rejected", () => {
for(const value of [0,null,{},undefined])assert.throws(()=>api.normalizeHex(value));
});

test("neutral-ramp-luminance-is-monotone", () => {
let last=-1;for(let i=0;i<256;i++){const hex='#'+i.toString(16).padStart(2,'0').repeat(3);const value=api.luminance(hex);assert.ok(value>last);last=value;}
});

test("contrast-is-symmetric-for-nonneutral-channels", () => {
for(const a of ['#123456','#facade','#abcdef'])assert.equal(api.contrastRatio(a,'#987654'),api.contrastRatio('#987654',a));
});

test("equal-colors-have-unit-contrast", () => {
for(const color of ['#123','#09f','#aabbcc'])assert.equal(api.contrastRatio(color,color),1);
});

test("normal-aa-and-large-aa-can-disagree", () => {
const c=api.contrastChecks('#888','#fff');assert.equal(c.normalAA,false);assert.equal(c.largeAA,true);
});

test("normal-aaa-and-large-aaa-can-disagree", () => {
const c=api.contrastChecks('#666','#fff');assert.equal(c.normalAAA,false);assert.equal(c.largeAAA,true);
});
