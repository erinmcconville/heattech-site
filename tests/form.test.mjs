import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const form = (path) => { const h = page(path); return h.slice(h.indexOf('<form'), h.indexOf('</form>')); };
const ids = (f) => [...f.matchAll(/data-id="([^"]+)"/g)].map((m) => m[1]);

test('job options', () => {
  assert.deepEqual(ids(form('contact/index.html')), [
    'boiler-repairs', 'gas-smell', 'new-boilers', 'heating-upgrades', 'servicing-and-certificates', 'leaks-taps-and-drains', 'not-sure',
  ]);
});

test('property options', () => {
  const f = form('contact/index.html');
  for (const o of ['House', 'Flat, ground floor', 'Flat, first floor', 'Flat, second floor', 'Flat, third floor or higher'])
    assert.ok(f.includes(`>${o}</option>`), o);
});

test('labels', () => {
  const f = form('contact/index.html');
  for (const l of ['>Job<', '>House or flat<', '>Postcode<', '>Boiler make and age', '>Name<', '>Phone<', 'Send enquiry']) assert.ok(f.includes(l), l);
  assert.ok(!f.includes('type="email"'));
});

test('full only on contact', () => {
  const f = form('contact/index.html');
  assert.ok(f.includes('name="message"') && f.includes('name="photo1"'));
});

test('short form on the homepage', () => {
  const f = form('index.html');
  assert.ok(f.includes('name="postcode"'));
  assert.ok(!f.includes('name="message"') && !f.includes('name="photo1"'));
});

test('netlify', () => {
  const f = form('contact/index.html');
  assert.ok(f.includes('data-netlify="true"') && f.includes('netlify-honeypot="bot-field"'));
});
