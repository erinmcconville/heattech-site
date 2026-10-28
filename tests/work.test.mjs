import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { page, withEdit } from './helpers.mjs';

const job = () => page('work/stockbridge-gas-central-heating/index.html');

test('list shows live jobs, then the samples', () => {
  const h = page('work/index.html');
  assert.equal((h.match(/class="work-card[" ]/g) ?? []).length, 4);
  assert.ok(h.indexOf('/work/stockbridge-gas-central-heating/') < h.indexOf('/work/sample-'));
});

test('samples carry a placeholder, so the live site cannot build with them', () => {
  for (const id of ['sample-tenement-boiler', 'sample-short-let-gas-leak', 'sample-your-choice'])
    assert.match(page(`work/${id}/index.html`), /\[PLACEHOLDER:[^\]]+\]/, id);
});

test('cards are short: no bills, no tags', () => {
  const card = page('index.html').match(/<a class="work-card[\s\S]*?<\/a>/)[0];
  assert.ok(!card.includes('Energy bills') && !card.includes('About 3 days'));
  assert.ok(card.includes('See the job'));
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

test('no dates, and money only in the bills feature', () => {
  const text = job().replace(/<script[\s\S]*?<\/script>/g, '').replace(/<section class="bills[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(!text.includes('£'));
  assert.doesNotMatch(text, /\b(19|20)\d\d\b/);
});

const bills = (html) => html.match(/<section class="bills[\s\S]*?<\/section>/)?.[0] ?? '';

test('bills feature on the job page', () => {
  const b = bills(job());
  for (const s of ['Energy bills', 'Before', 'After', 'a month', '£ before', '£ after']) assert.ok(b.includes(s), s);
});

test('no bills, no feature', { timeout: 180000 }, async () => {
  await withEdit('src/content/work/stockbridge-gas-central-heating.md', /bills:\n(  .*\n)+/, '', () => {
    assert.equal(bills(job()), '');
  });
});
