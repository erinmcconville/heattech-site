import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { page } from './helpers.mjs';

const tradingName = readFileSync('src/content/site.yaml', 'utf8').match(/^\s*trading_name:\s*(.+)$/m)[1].trim();

test('page exists with title and h1', () => {
  const html = page('electric-to-gas/index.html');
  assert.match(html, new RegExp(`<title>Electric heating to gas central heating in Edinburgh \\| ${tradingName}</title>`));
  const h1s = html.match(/<h1[^>]*>[^<]*<\/h1>/g);
  assert.equal(h1s.length, 1);
  assert.match(h1s[0], />Electric heating to gas central heating</);
});

test('links its sources', () => {
  const html = page('electric-to-gas/index.html');
  for (const s of [
    'sgn.co.uk/gas-connections/household-customers/find-out-if-you-have-gas-supply',
    'sgn.co.uk/gas-connections/household-customers/apply-new-gas-connection0',
    'edinburgh.gov.uk/conservation-2/listed-buildings',
    'homeenergyscotland.org/find-funding',
    'mygov.scot/energy-saving-funding/warmer-homes-scotland-scheme',
    'Last checked 27 October 2026',
  ]) assert.ok(html.includes(s), s);
});

test('ask link', () => {
  assert.match(page('electric-to-gas/index.html'), /href="\/contact\/\?job=electric-to-gas"/);
});

test('services links here and the old block is gone', () => {
  const html = page('services/index.html');
  assert.match(html, /href="\/electric-to-gas\/"/);
  assert.doesNotMatch(html, /class="explainer/);
});

test('has a Service record', () => {
  const html = page('electric-to-gas/index.html');
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"name":"Electric heating to gas central heating"/);
});

test('a space sits before each source link', () => {
  const text = page('electric-to-gas/index.html').replace(/<[^>]+>/g, '');
  for (const s of ['free: SGN gas supply check', 'from SGN: SGN new connections', 'applies: City of Edinburgh', 'gas boilers: Home Energy', 'central heating: Warmer Homes'])
    assert.ok(text.includes(s), s);
});
