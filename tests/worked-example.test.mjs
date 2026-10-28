import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page, withEdit } from './helpers.mjs';

test('stockbridge shows on electric to gas', () => {
  const html = page('electric-to-gas/index.html');
  assert.match(html, /id="example"/);
  assert.match(html, /Stockbridge period flat/);
});

test('no money or forecast figures in the example', () => {
  const html = page('electric-to-gas/index.html');
  assert.doesNotMatch(html, /£/);
  assert.doesNotMatch(html, /35–50/);
});

test('unpublished stories never render', () => {
  assert.doesNotMatch(page('landlords/index.html'), /id="example"/);
  assert.doesNotMatch(page('services/index.html'), /id="example"/);
});

test('published without permission stays hidden', { timeout: 180000 }, async () => {
  await withEdit('src/content/work/boiler-replacement-flat.md', 'published: false', 'published: true', () => {
    assert.doesNotMatch(page('services/index.html'), /id="example"/);
  });
});
