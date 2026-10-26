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

test("aaa-implies-the-corresponding-aa-check", () => {
for(let i=0;i<255;i++){const c=api.contrastChecks('#'+i.toString(16).padStart(2,'0').repeat(3),'#fff');if(c.normalAAA)assert.ok(c.normalAA);if(c.largeAAA)assert.ok(c.largeAA);}
});

test("target-names-do-not-traverse-object-prototypes", () => {
for(const name of ['constructor','__proto__','missing'])assert.throws(()=>api.meetsContrastTarget('#000','#fff',name));
});

test("selected-target-does-not-change-measured-ratio", () => {
const colors={foreground:'#456789',background:'#fff'};assert.equal(api.contrastReport(colors,'normalAA').checks.ratio,api.contrastReport(colors,'normalAAA').checks.ratio);
});

test("neutral-suggestion-switches-for-dark-backgrounds", () => {
assert.equal(api.readableForeground('#111'),'#ffffff');assert.equal(api.readableForeground('#eee'),'#000000');
});

test("suggestion-does-not-require-an-aa-capable-original-pair", () => {
assert.ok(api.contrastChecks(api.readableForeground('#888'),'#888').normalAA);assert.equal(api.contrastChecks('#888','#888').normalAA,false);
});

test("css-preview-normalizes-uppercase-and-shorthand", () => {
assert.equal(api.colorCss({foreground:'#ABC',background:'#DEF'}),'color: #aabbcc;\nbackground-color: #ddeeff;');
});

test("css-preview-rejects-declaration-injection", () => {
assert.throws(()=>api.colorCss({foreground:'#fff;display:none',background:'#000'}));
});

test("report-json-round-trip-keeps-booleans-and-numbers", () => {
const r=api.contrastReport({foreground:'#000',background:'#fff'});assert.deepEqual(JSON.parse(JSON.stringify(r)),r);assert.equal(typeof r.checks.ratio,'number');
});

test("report-fields-are-detached-from-input-object", () => {
const c={foreground:'#000',background:'#fff'};const r=api.contrastReport(c);c.foreground='#fff';assert.equal(r.foreground,'#000000');
});

test("report-excludes-unrelated-preference-properties", () => {
const r=api.contrastReport({foreground:'#000',background:'#fff',token:'omit'});assert.ok(!JSON.stringify(r).includes('omit'));
});

test("empty-fragments-do-not-override-preferences", () => {
assert.equal(hash.parseColorHash(''),null);assert.equal(hash.parseColorHash('#'),null);
});

test("partial-fragments-are-not-valid-pairs", () => {
assert.equal(hash.parseColorHash('#fg=%23000'),null);assert.equal(hash.parseColorHash('#bg=%23fff'),null);
});

test("duplicate-background-fragments-are-ambiguous", () => {
assert.equal(hash.parseColorHash('#fg=%23000&bg=%23fff&bg=%23000'),null);
});

test("duplicate-foreground-fragments-are-ambiguous", () => {
assert.equal(hash.parseColorHash('#fg=%23000&fg=%23fff&bg=%23fff'),null);
});
