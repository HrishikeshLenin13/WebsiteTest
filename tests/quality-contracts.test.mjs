import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
import * as hash from '../color-hash.mjs';

test("linear-channel-reference-000001", () => {
const rgb=[0, 0, 1];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#000001")-expected)<1e-14);assert.equal(api.normalizeHex("#000001"),"#000001");
});

test("linear-channel-reference-010000", () => {
const rgb=[1, 0, 0];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#010000")-expected)<1e-14);assert.equal(api.normalizeHex("#010000"),"#010000");
});

test("linear-channel-reference-000100", () => {
const rgb=[0, 1, 0];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#000100")-expected)<1e-14);assert.equal(api.normalizeHex("#000100"),"#000100");
});

test("linear-channel-reference-0a0a0a", () => {
const rgb=[10, 10, 10];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#0a0a0a")-expected)<1e-14);assert.equal(api.normalizeHex("#0A0A0A"),"#0a0a0a");
});

test("linear-channel-reference-0b0b0b", () => {
const rgb=[11, 11, 11];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#0b0b0b")-expected)<1e-14);assert.equal(api.normalizeHex("#0B0B0B"),"#0b0b0b");
});

test("linear-channel-reference-abcdef", () => {
const rgb=[171, 205, 239];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#abcdef")-expected)<1e-14);assert.equal(api.normalizeHex("#ABCDEF"),"#abcdef");
});

test("linear-channel-reference-fedcba", () => {
const rgb=[254, 220, 186];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#fedcba")-expected)<1e-14);assert.equal(api.normalizeHex("#FEDCBA"),"#fedcba");
});

test("linear-channel-reference-123456", () => {
const rgb=[18, 52, 86];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#123456")-expected)<1e-14);assert.equal(api.normalizeHex("#123456"),"#123456");
});

test("linear-channel-reference-654321", () => {
const rgb=[101, 67, 33];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#654321")-expected)<1e-14);assert.equal(api.normalizeHex("#654321"),"#654321");
});

test("linear-channel-reference-808080", () => {
const rgb=[128, 128, 128];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#808080")-expected)<1e-14);assert.equal(api.normalizeHex("#808080"),"#808080");
});

test("linear-channel-reference-ff0000", () => {
const rgb=[255, 0, 0];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#ff0000")-expected)<1e-14);assert.equal(api.normalizeHex("#FF0000"),"#ff0000");
});

test("linear-channel-reference-00ff00", () => {
const rgb=[0, 255, 0];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#00ff00")-expected)<1e-14);assert.equal(api.normalizeHex("#00FF00"),"#00ff00");
});

test("linear-channel-reference-0000ff", () => {
const rgb=[0, 0, 255];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#0000ff")-expected)<1e-14);assert.equal(api.normalizeHex("#0000FF"),"#0000ff");
});

test("linear-channel-reference-ffff00", () => {
const rgb=[255, 255, 0];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#ffff00")-expected)<1e-14);assert.equal(api.normalizeHex("#FFFF00"),"#ffff00");
});

test("linear-channel-reference-00ffff", () => {
const rgb=[0, 255, 255];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#00ffff")-expected)<1e-14);assert.equal(api.normalizeHex("#00FFFF"),"#00ffff");
});

test("color-share-roundtrip-000001", () => {
const pair={foreground:"#000001",background:"#00ffff"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #000001;\nbackground-color: #00ffff;");
});

test("color-share-roundtrip-010000", () => {
const pair={foreground:"#010000",background:"#ffff00"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #010000;\nbackground-color: #ffff00;");
});

test("color-share-roundtrip-000100", () => {
const pair={foreground:"#000100",background:"#0000ff"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #000100;\nbackground-color: #0000ff;");
});

test("color-share-roundtrip-0a0a0a", () => {
const pair={foreground:"#0a0a0a",background:"#00ff00"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #0a0a0a;\nbackground-color: #00ff00;");
});

test("color-share-roundtrip-0b0b0b", () => {
const pair={foreground:"#0b0b0b",background:"#ff0000"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #0b0b0b;\nbackground-color: #ff0000;");
});

test("color-share-roundtrip-abcdef", () => {
const pair={foreground:"#abcdef",background:"#808080"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #abcdef;\nbackground-color: #808080;");
});

test("color-share-roundtrip-fedcba", () => {
const pair={foreground:"#fedcba",background:"#654321"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #fedcba;\nbackground-color: #654321;");
});

test("color-share-roundtrip-123456", () => {
const pair={foreground:"#123456",background:"#123456"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #123456;\nbackground-color: #123456;");
});

test("color-share-roundtrip-654321", () => {
const pair={foreground:"#654321",background:"#fedcba"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #654321;\nbackground-color: #fedcba;");
});

test("color-share-roundtrip-808080", () => {
const pair={foreground:"#808080",background:"#abcdef"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #808080;\nbackground-color: #abcdef;");
});

test("color-share-roundtrip-ff0000", () => {
const pair={foreground:"#ff0000",background:"#0b0b0b"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #ff0000;\nbackground-color: #0b0b0b;");
});

test("color-share-roundtrip-00ff00", () => {
const pair={foreground:"#00ff00",background:"#0a0a0a"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #00ff00;\nbackground-color: #0a0a0a;");
});

test("color-share-roundtrip-0000ff", () => {
const pair={foreground:"#0000ff",background:"#000100"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #0000ff;\nbackground-color: #000100;");
});

test("color-share-roundtrip-ffff00", () => {
const pair={foreground:"#ffff00",background:"#010000"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #ffff00;\nbackground-color: #010000;");
});

test("color-share-roundtrip-00ffff", () => {
const pair={foreground:"#00ffff",background:"#000001"};const encoded=hash.colorHash(pair);assert.deepEqual(hash.parseColorHash(encoded),pair);assert.deepEqual(hash.parseColorHash(encoded+'&unrelated=value'),pair);assert.deepEqual(prefs.swapColors(prefs.swapColors(pair)),pair);assert.equal(api.colorCss(pair),"color: #00ffff;\nbackground-color: #000001;");
});

test("contrast-report-invariants-000001", () => {
const pair={foreground:api.readableForeground("#000001"),background:"#000001"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-010000", () => {
const pair={foreground:api.readableForeground("#010000"),background:"#010000"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-000100", () => {
const pair={foreground:api.readableForeground("#000100"),background:"#000100"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-0a0a0a", () => {
const pair={foreground:api.readableForeground("#0a0a0a"),background:"#0a0a0a"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-0b0b0b", () => {
const pair={foreground:api.readableForeground("#0b0b0b"),background:"#0b0b0b"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-abcdef", () => {
const pair={foreground:api.readableForeground("#abcdef"),background:"#abcdef"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-fedcba", () => {
const pair={foreground:api.readableForeground("#fedcba"),background:"#fedcba"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-123456", () => {
const pair={foreground:api.readableForeground("#123456"),background:"#123456"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-654321", () => {
const pair={foreground:api.readableForeground("#654321"),background:"#654321"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-808080", () => {
const pair={foreground:api.readableForeground("#808080"),background:"#808080"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-ff0000", () => {
const pair={foreground:api.readableForeground("#ff0000"),background:"#ff0000"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-00ff00", () => {
const pair={foreground:api.readableForeground("#00ff00"),background:"#00ff00"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-0000ff", () => {
const pair={foreground:api.readableForeground("#0000ff"),background:"#0000ff"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-ffff00", () => {
const pair={foreground:api.readableForeground("#ffff00"),background:"#ffff00"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("contrast-report-invariants-00ffff", () => {
const pair={foreground:api.readableForeground("#00ffff"),background:"#00ffff"};for(const [target,threshold] of Object.entries(api.CONTRAST_TARGETS)){const report=api.contrastReport(pair,target);assert.equal(report.checks.ratio,api.contrastRatio(pair.background,pair.foreground));assert.equal(report.passes,report.checks.ratio>=threshold);assert.ok(report.checks.ratio>=4.5);assert.equal(report.schemaVersion,1);}
});

test("invalid-color-shape-1", () => {
assert.throws(()=>api.normalizeHex(""),TypeError);assert.equal(hash.parseColorHash('#fg='+encodeURIComponent("")+'&bg=%23ffffff'),null);assert.equal(prefs.saveColors({setItem(){throw Error('must not write');}},{foreground:"",background:'#ffffff'}),false);
});

test("invalid-color-shape-2", () => {
assert.throws(()=>api.normalizeHex("fff"),TypeError);assert.equal(hash.parseColorHash('#fg='+encodeURIComponent("fff")+'&bg=%23ffffff'),null);assert.equal(prefs.saveColors({setItem(){throw Error('must not write');}},{foreground:"fff",background:'#ffffff'}),false);
});

test("invalid-color-shape-3", () => {
assert.throws(()=>api.normalizeHex("#12"),TypeError);assert.equal(hash.parseColorHash('#fg='+encodeURIComponent("#12")+'&bg=%23ffffff'),null);assert.equal(prefs.saveColors({setItem(){throw Error('must not write');}},{foreground:"#12",background:'#ffffff'}),false);
});

test("invalid-color-shape-4", () => {
assert.throws(()=>api.normalizeHex("#1234"),TypeError);assert.equal(hash.parseColorHash('#fg='+encodeURIComponent("#1234")+'&bg=%23ffffff'),null);assert.equal(prefs.saveColors({setItem(){throw Error('must not write');}},{foreground:"#1234",background:'#ffffff'}),false);
});

test("invalid-color-shape-5", () => {
assert.throws(()=>api.normalizeHex("#12345"),TypeError);assert.equal(hash.parseColorHash('#fg='+encodeURIComponent("#12345")+'&bg=%23ffffff'),null);assert.equal(prefs.saveColors({setItem(){throw Error('must not write');}},{foreground:"#12345",background:'#ffffff'}),false);
});
