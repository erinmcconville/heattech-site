import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { page, withEdit } from './helpers.mjs';

const tradingName = readFileSync('src/content/site.yaml', 'utf8').match(/^\s*trading_name:\s*(.+)$/m)[1].trim();
const landlords = () => page('landlords/index.html');

test('title and h1', () => {
  const html = landlords();
  assert.match(html, new RegExp(`<title>Gas safety and heating for landlords and short-lets in Edinburgh \\| ${tradingName}</title>`));
  assert.match(html, /<h1[^>]*>Landlords, letting agents and short-let hosts<\/h1>/);
});

test('services with ask links', () => {
  const html = landlords();
  for (const id of ['landlord-certificate', 'boiler-service', 'no-heating', 'controls', 'several-properties'])
    assert.ok(html.includes(`?job=${id}`), id);
});

test('HSE source', () => {
  const html = landlords();
  assert.ok(html.includes('hse.gov.uk/gas/landlords/safetycheckswhocan.htm'));
  assert.ok(html.includes('Last checked 27 October 2026'));
});

test('proof', () => {
  const html = landlords();
  assert.ok(html.includes('Gregor, review on Google'));
  assert.ok(html.includes('I feel so much more in control with renting out my property'));
  assert.ok(html.includes('href="/electric-to-gas/#example"'));
});

test('cut-off reviews stay hidden', () => {
  const html = landlords();
  for (const n of ['Anya', 'ailsa', 'Atelier Twenty Three']) assert.ok(!html.includes(`${n}, review on Google`), n);
});

test('a completed review appears without code changes', { timeout: 180000 }, async () => {
  await withEdit('src/content/reviews.yaml', 'name: Anya\n  complete: false', 'name: Anya\n  complete: true', () => {
    assert.ok(landlords().includes('Anya, review on Google'));
  });
});

test('has a Service record', () => {
  assert.match(landlords(), /"@type":"Service"/);
});
