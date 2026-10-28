import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { page } from './helpers.mjs';

test('sitemap lists the new pages', () => {
  const xml = page('sitemap.xml');
  assert.ok(xml.includes('/electric-to-gas/'));
  assert.ok(xml.includes('/landlords/'));
});

test('footer links', () => {
  const html = page('index.html');
  const footer = html.slice(html.indexOf('<footer'));
  assert.ok(footer.includes('href="/electric-to-gas/"'));
  assert.ok(footer.includes('href="/landlords/"'));
});

test('every ask link matches a form job', () => {
  const known = new Set([...readFileSync('src/content/services.yaml', 'utf8').matchAll(/^\s+- id: ([a-z-]+)$/gm)].map((m) => m[1]));
  const used = readdirSync('dist', { recursive: true })
    .filter((f) => f.endsWith('.html'))
    .flatMap((f) => [...readFileSync(join('dist', f), 'utf8').matchAll(/\?job=([a-z-]+)/g)].map((m) => m[1]));
  assert.ok(used.length > 0);
  assert.deepEqual([...new Set(used)].filter((id) => !known.has(id)), []);
});
