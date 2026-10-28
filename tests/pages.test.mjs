import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { page } from './helpers.mjs';

const main = (path) => { const h = page(path); return h.slice(h.indexOf('<main'), h.indexOf('</main>')); };

test('about', () => {
  const h = main('about/index.html');
  assert.match(h, /<h1[^>]*>About us<\/h1>/);
  for (const s of ['based in Edinburgh, covering Edinburgh and the Lothians', 'Ryan Duncan', 'Brett Duncan', '661231', 'SC690576', 'Insurance', 'Based in', 'We sponsor a local youth football group.', 'Facebook', 'MyBuilder', 'Google'])
    assert.ok(h.includes(s), s);
  assert.ok((h.match(/club photo/g) ?? []).length >= 2);
});

test('contact', () => {
  const h = main('contact/index.html');
  assert.match(h, /<h1[^>]*>Contact<\/h1>/);
  assert.ok(h.includes('href="tel:+447506042175"') && h.includes('href="mailto:info@heattechgas.co.uk"'));
  assert.ok(h.includes('name="photo1"'));
  assert.ok(h.includes("Smell gas? Don't send a form. Call"));
  assert.ok(!/urgent/i.test(h));
});

test('reviews', () => {
  const complete = readFileSync('src/content/reviews.yaml', 'utf8').split(/^- id: /m).slice(1).filter((b) => !/complete: false/.test(b)).length;
  assert.equal((main('reviews/index.html').match(/review on Google/g) ?? []).length, complete);
});

test('thanks', () => {
  const h = main('contact/thanks/index.html');
  assert.ok(!/urgent/i.test(h));
  assert.ok(h.includes('07506 042175'));
});

test('privacy lists the fields the form asks for', () => {
  const h = main('privacy/index.html');
  for (const s of ['house or flat', 'postcode', 'boiler make and age', 'name', 'phone']) assert.ok(h.toLowerCase().includes(s), s);
  assert.ok(!/email address/i.test(h.split('What the form collects')[1]?.split('</ul>')[0] ?? ''));
});
