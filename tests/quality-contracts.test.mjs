import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../contrast.mjs';
import * as prefs from '../preferences.mjs';
import * as hash from '../color-hash.mjs';

test("linear-channel-reference-000001", () => {
const rgb=[0, 0, 1];const linear=rgb.map(v=>v/255<=.04045?v/255/12.92:((v/255+.055)/1.055)**2.4);const expected=linear.reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);assert.ok(Math.abs(api.luminance("#000001")-expected)<1e-14);assert.equal(api.normalizeHex("#000001"),"#000001");
});
