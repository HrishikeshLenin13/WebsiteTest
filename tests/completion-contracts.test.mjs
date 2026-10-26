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

test("unknown-fragment-fields-do-not-leak-into-colors", () => {
assert.deepEqual(hash.parseColorHash('#fg=%23000&bg=%23fff&secret=omit'),{foreground:'#000000',background:'#ffffff'});
});

test("shared-links-normalize-reversed-parameter-order", () => {
assert.deepEqual(hash.parseColorHash('#bg=%23fff&fg=%23000'),{foreground:'#000000',background:'#ffffff'});
});

test("overlong-fragments-are-ignored", () => {
assert.equal(hash.parseColorHash('#'+ 'x'.repeat(513)),null);
});

test("bad-percent-escapes-never-throw-from-url-parsing", () => {
assert.doesNotThrow(()=>hash.parseColorHash('#fg=%ZZ&bg=%23fff'));assert.equal(hash.parseColorHash('#fg=%ZZ&bg=%23fff'),null);
});

test("shared-link-round-trip-preserves-saturated-channels", () => {
const c={foreground:'#ff0088',background:'#00ff11'};assert.deepEqual(hash.parseColorHash(hash.colorHash(c)),c);
});

test("absent-storage-falls-back-to-fresh-defaults", () => {
const a=prefs.loadColors(undefined),b=prefs.loadColors(undefined);a.foreground='#000000';assert.notDeepEqual(a,b);
});

test("storage-get-errors-do-not-break-default-rendering", () => {
assert.deepEqual(prefs.loadColors({getItem(){throw Error('blocked')}}),prefs.DEFAULT_COLORS);
});

test("malformed-json-does-not-propagate-out-of-loading", () => {
assert.deepEqual(prefs.loadColors({getItem:()=>'{'}),prefs.DEFAULT_COLORS);
});

test("partial-saved-pairs-fall-back-atomically", () => {
assert.deepEqual(prefs.loadColors({getItem:()=>JSON.stringify({foreground:'#000000'})}),prefs.DEFAULT_COLORS);
});

test("valid-saved-colors-are-returned-without-extra-fields", () => {
assert.deepEqual(prefs.loadColors({getItem:()=>JSON.stringify({...prefs.DEFAULT_COLORS,secret:'omit'})}),prefs.DEFAULT_COLORS);
});

test("invalid-save-does-not-touch-storage", () => {
let calls=0;assert.equal(prefs.saveColors({setItem(){calls++}},{foreground:'red',background:'#ffffff'}),false);assert.equal(calls,0);
});

test("blocked-save-reports-failure-without-throwing", () => {
assert.equal(prefs.saveColors({setItem(){throw Error('blocked')}},prefs.DEFAULT_COLORS),false);
});

test("saved-pairs-use-the-versioned-application-key", () => {
let key;assert.equal(prefs.saveColors({setItem(k){key=k}},prefs.DEFAULT_COLORS),true);assert.equal(key,'website-test.colors.v1');
});

test("reset-removes-only-the-application-key", () => {
const keys=[];prefs.resetColors({removeItem:k=>keys.push(k)});assert.deepEqual(keys,['website-test.colors.v1']);
});

test("blocked-reset-still-returns-default-colors", () => {
assert.deepEqual(prefs.resetColors({removeItem(){throw Error('blocked')}}),prefs.DEFAULT_COLORS);
});

test("reset-results-do-not-alias-global-defaults", () => {
const c=prefs.resetColors(undefined);c.foreground='#000000';assert.notEqual(c.foreground,prefs.DEFAULT_COLORS.foreground);
});

test("swap-preserves-uppercase-valid-six-digit-colors", () => {
const c={foreground:'#ABCDEF',background:'#123456'};assert.deepEqual(prefs.swapColors(c),{foreground:c.background,background:c.foreground});assert.equal(c.foreground,'#ABCDEF');
});

test("swap-rejects-incomplete-or-nonopaque-pairs", () => {
for(const value of [null,{foreground:'#fff',background:'#000000'},{foreground:'#ffffff'}])assert.throws(()=>prefs.swapColors(value));
});
