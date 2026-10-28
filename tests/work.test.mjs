import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { page } from './helpers.mjs';

const job = () => page('work/stockbridge-gas-central-heating/index.html');

test('list shows only live jobs', () => {
  assert.equal((page('work/index.html').match(/class="work-card[" ]/g) ?? []).length, 1);
});

test('job page', () => {
  const html = job();
  assert.match(html, /<h1[^>]*>Gas central heating in a Stockbridge period flat<\/h1>/);
  for (const s of ['Electric to gas', 'No floors lifted', 'About 3 days', '>Before<', '>The challenge<', '>What we did<', '…he knows how Edinburgh flats work.', 'href="/heating-upgrades/"', 'Ask about a job like this', 'href="/contact/?job=heating-upgrades"'])
    assert.ok(html.includes(s), s);
});

test('no page for unpublished jobs', () => {
  assert.ok(!existsSync('dist/work/leith-gas-safety-check/index.html'));
  assert.ok(!existsSync('dist/work/boiler-replacement-flat/index.html'));
});

test('no dates or money', () => {
  const text = job().replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(!text.includes('£'));
  assert.doesNotMatch(text, /\b(19|20)\d\d\b/);
});
