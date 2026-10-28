import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findPending, nameConfirmed } from '../scripts/launch-check.mjs';

// A throwaway dist folder holding one page
async function distWith(path, html) {
  const dir = await mkdtemp(join(tmpdir(), 'launch-check-'));
  const file = join(dir, path);
  await mkdir(join(file, '..'), { recursive: true });
  await writeFile(file, html);
  return dir;
}

test('finds CONFIRM in page text', async () => {
  const dir = await distWith('a/index.html', '<p>[CONFIRM: x]</p>');
  const found = await findPending(dir);
  assert.equal(found.length, 1);
  assert.ok(found[0].file.endsWith(join('a', 'index.html')));
});

test('finds PLACEHOLDER in JSON-LD', async () => {
  const dir = await distWith('index.html', '<script type="application/ld+json">{"n":"[PLACEHOLDER: y]"}</script>');
  assert.equal((await findPending(dir)).length, 1);
});

test('ignores HTML comments', async () => {
  const dir = await distWith('index.html', '<!-- [PLACEHOLDER: logo] --><p>ok</p>');
  assert.deepEqual(await findPending(dir), []);
});

test('ignores PHOTO', async () => {
  const dir = await distWith('index.html', '<div>[PHOTO: van]</div>');
  assert.deepEqual(await findPending(dir), []);
});

test('skips content-check', async () => {
  const dir = await distWith('content-check/index.html', '<p>[CONFIRM: x]</p>');
  assert.deepEqual(await findPending(dir), []);
});

test('nameConfirmed reads the flag', () => {
  assert.equal(nameConfirmed('  trading_name_confirmed: true'), true);
  assert.equal(nameConfirmed('  trading_name_confirmed: false'), false);
  assert.equal(nameConfirmed('business:\n  trading_name: X'), false);
});
