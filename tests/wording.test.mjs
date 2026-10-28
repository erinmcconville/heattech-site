import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Built page text without customers' own words (quotes stay word for word), scripts or comments
const pages = readdirSync('dist', { recursive: true })
  .filter((f) => f.endsWith('.html') && !f.includes('content-check'))
  .map((f) => ({
    f,
    text: readFileSync(join('dist', f), 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<blockquote[\s\S]*?<\/blockquote>/g, '')
      .replace(/<figure class="review[\s\S]*?<\/figure>/g, '')
      .replace(/<[^>]+>/g, ' '),
  }));

const banned = [
  'portobello', 'recent', 'urgent',
  'no job too small', 'peace of mind', 'look no further', 'your trusted local', 'passionate about',
  'second to none', 'we pride ourselves', 'hassle-free', 'one-stop shop', 'you can count on us',
  "we'll keep you updated", 'your satisfaction', 'extra mile', "don't hesitate to",
];

test('banned words outside quotes', () => {
  const found = pages.flatMap(({ f, text }) => banned.filter((b) => text.toLowerCase().includes(b)).map((b) => `${f}: ${b}`));
  assert.deepEqual(found, []);
});

test('quotes with banned words are kept', () => {
  // Mayur's review says "urgent"; it must still appear on the reviews page, word for word
  assert.ok(readFileSync('dist/reviews/index.html', 'utf8').includes('Had a urgent boiler issues'));
});
