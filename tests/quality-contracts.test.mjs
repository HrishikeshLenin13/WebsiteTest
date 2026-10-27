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
