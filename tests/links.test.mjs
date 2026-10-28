import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { page } from './helpers.mjs';

test('sitemap', () => {
  const xml = page('sitemap.xml');
  for (const p of ['/', '/boiler-repairs/', '/new-boilers/', '/heating-upgrades/', '/servicing-and-certificates/', '/leaks-taps-and-drains/', '/work/', '/work/stockbridge-gas-central-heating/', '/reviews/', '/about/', '/contact/', '/privacy/'])
    assert.ok(xml.includes(`heattechgas.co.uk${p}</loc>`), p);
  for (const p of ['/services/', '/electric-to-gas/', '/landlords/']) assert.ok(!xml.includes(p), p);
});


test('every ask link matches a form job', () => {
  const known = new Set([...readFileSync('src/content/services.yaml', 'utf8').matchAll(/^\s+- id: ([a-z-]+)$/gm)].map((m) => m[1]));
  known.add('not-sure'); // the form's own "Not sure" option, used by jobs with no service
  const used = readdirSync('dist', { recursive: true })
    .filter((f) => f.endsWith('.html'))
    .flatMap((f) => [...readFileSync(join('dist', f), 'utf8').matchAll(/\?job=([a-z-]+)/g)].map((m) => m[1]));
  assert.ok(used.length > 0);
  assert.deepEqual([...new Set(used)].filter((id) => !known.has(id)), []);
});
