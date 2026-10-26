import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../contrast.mjs';
test('neutral suggestions choose maximum contrast and always meet normal AA',()=>{for(let i=0;i<256;i++){const bg='#'+i.toString(16).padStart(2,'0').repeat(3);const fg=api.readableForeground(bg);assert.ok(api.contrastRatio(fg,bg)>=4.5);assert.ok(api.contrastRatio(fg,bg)>=api.contrastRatio(fg==='#000000'?'#ffffff':'#000000',bg));}});
