import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const files = (dir, ext) =>
  readdirSync(dir, { recursive: true })
    .filter((f) => f.endsWith(ext) && !f.includes('content-check'))
    .map((f) => join(dir, f));

const tradingName = readFileSync('src/content/site.yaml', 'utf8').match(/^\s*trading_name:\s*(.+)$/m)[1].trim();

test('no hard-coded name in templates', () => {
  const offenders = ['src/pages', 'src/components', 'src/layouts']
    .flatMap((d) => files(d, '.astro'))
    .filter((f) => /Heattech Gas Services|HeatTech/.test(readFileSync(f, 'utf8')));
  assert.deepEqual(offenders, []);
});

test('titles use the trading name', () => {
  for (const f of files('dist', 'index.html')) {
    const title = readFileSync(f, 'utf8').match(/<title>([^<]*)<\/title>/)[1];
    assert.ok(title.includes(tradingName), `${f}: ${title}`);
  }
});
