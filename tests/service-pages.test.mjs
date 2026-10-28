import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { page, withEdit } from './helpers.mjs';

const tradingName = readFileSync('src/content/site.yaml', 'utf8').match(/^\s*trading_name:\s*(.+)$/m)[1].trim();
const services = {
  'boiler-repairs': 'Boiler repairs',
  'new-boilers': 'New boilers',
  'heating-upgrades': 'Heating upgrades',
  'servicing-and-certificates': 'Servicing and certificates',
  'leaks-taps-and-drains': 'Leaks, taps and drains',
};
const captions = (html) => (html.match(/review on Google/g) ?? []).length;

test('five pages exist', () => {
  for (const [id, title] of Object.entries(services)) {
    const html = page(`${id}/index.html`);
    const h1s = html.match(/<h1[^>]*>([^<]*)<\/h1>/g);
    assert.equal(h1s.length, 1, id);
    assert.ok(h1s[0].includes(`${title} in Edinburgh`), id);
    assert.ok(html.includes(`<title>${title} in Edinburgh | ${tradingName}</title>`), id);
  }
});

test('ask button', () => {
  for (const id of Object.keys(services)) {
    const html = page(`${id}/index.html`);
    assert.equal(html.split(`href="/contact/?job=${id}"`).length - 1, 2, id);
    assert.ok(html.includes('Ask about'), id);
  }
});

test('blocks only when filled', () => {
  const repairs = page('boiler-repairs/index.html');
  assert.ok(!repairs.includes("What's included") && !repairs.includes('What can change the price') && !repairs.includes('class="work-card'));
  const boilers = page('new-boilers/index.html');
  for (const s of ['System flush', 'What can change the price', 'The gas pipe']) assert.ok(boilers.includes(s), s);
});

test('two complete reviews', () => {
  for (const id of Object.keys(services)) assert.equal(captions(page(`${id}/index.html`)), 2, id);
});

test('heating upgrades sources', () => {
  const html = page('heating-upgrades/index.html');
  for (const s of ['find-out-if-you-have-gas-supply', 'apply-new-gas-connection0', 'conservation-2/listed-buildings', 'homeenergyscotland.org/find-funding', 'warmer-homes-scotland-scheme', 'Last checked 27 October 2026'])
    assert.ok(html.includes(s), s);
  assert.ok(html.includes('href="/work/stockbridge-gas-central-heating/"'));
});

test('missing review id skipped', { timeout: 180000 }, async () => {
  await withEdit('src/content/services.yaml', 'reviews: [lena-bruning, dawid-granacki]', 'reviews: [lena-bruning, not-a-review, dawid-granacki]', () => {
    assert.equal(captions(page('boiler-repairs/index.html')), 2);
  });
});

test('service record', () => {
  for (const id of Object.keys(services)) assert.match(page(`${id}/index.html`), /"@type":"Service"/, id);
});
