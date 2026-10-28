import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const services = () => page('services/index.html');
const section = (id) => {
  const html = services();
  const start = html.indexOf(`id="${id}"`);
  return html.slice(start, html.indexOf('</section>', start));
};

test('new boiler list', () => {
  const html = services();
  for (const s of ['Every new boiler includes', 'System flush', 'Magnetic filter', 'Smart heating controls', 'What can add cost', 'gas pipe', 'condensate'])
    assert.ok(html.includes(s), s);
});

test('no warranty length', () => {
  assert.doesNotMatch(section('replacing-upgrading').replace(/<[^>]+>/g, ' '), /\d+[- ]year/);
});

test('servicing note', () => {
  assert.match(section('servicing-safety'), /Servicing keeps most manufacturer warranties valid/);
});

test('landlords link', () => {
  assert.match(services(), /href="\/landlords\/"/);
});
