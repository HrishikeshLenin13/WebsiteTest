import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_COLORS, loadColors, saveColors, resetColors } from '../preferences.mjs';
function store() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}
test('chosen colors persist and reset to the defaults', () => {
  const storage = store();
  const colors = {foreground:'#000000', background:'#ffffff'};
  assert.deepEqual(loadColors(storage), DEFAULT_COLORS);
  assert.equal(saveColors(storage, colors), true);
  assert.deepEqual(loadColors(storage), colors);
  assert.deepEqual(resetColors(storage), DEFAULT_COLORS);
  assert.deepEqual(loadColors(storage), DEFAULT_COLORS);
});
test('corrupt or inaccessible storage never prevents a preview', () => {
  for (const value of ['null', '[]', '{', '{"foreground":"red","background":"#ffffff"}']) {
    assert.deepEqual(loadColors({getItem: () => value}), DEFAULT_COLORS);
  }
  const blocked = { getItem() {throw Error('blocked');}, setItem() {throw Error('quota');}, removeItem() {throw Error('blocked');} };
  assert.deepEqual(loadColors(blocked), DEFAULT_COLORS);
  assert.equal(saveColors(blocked, DEFAULT_COLORS), false);
  assert.deepEqual(resetColors(blocked), DEFAULT_COLORS);
  assert.equal(saveColors(store(), {foreground:'red', background:'#ffffff'}), false);
});
