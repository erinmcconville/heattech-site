import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const home = () => page('index.html');
const main = () => { const h = home(); return h.slice(h.indexOf('<main'), h.indexOf('</main>')); };

test('hero', () => {
  const h = main();
  assert.match(h, /<h1[^>]*>Gas, heating and plumbing in Edinburgh<\/h1>/);
  for (const s of ['Heattech Gas Services · Edinburgh and the Lothians', 'Send an enquiry', 'Call 07506 042175', 'data-hero-actions']) assert.ok(h.includes(s), s);
});

test('proof strip', () => {
  const h = main();
  assert.ok(h.includes('5.0 from 74 Google reviews'));
  assert.ok(h.includes('Gas Safe registered'));
});

test('five rows in order', () => {
  const h = main();
  const at = h.indexOf('What we do');
  assert.ok(at > 0);
  let last = at;
  for (const [id, title, line] of [
    ['boiler-repairs', 'Boiler repairs', 'No heating, no hot water, fault codes'],
    ['new-boilers', 'New boilers', 'Replacing an old or broken boiler'],
    ['heating-upgrades', 'Heating upgrades', 'Electric to gas, smart controls, radiators'],
    ['servicing-and-certificates', 'Servicing and certificates', 'Annual service, landlord and pre-sale checks'],
    ['leaks-taps-and-drains', 'Leaks, taps and drains', 'Smaller plumbing jobs'],
  ]) {
    const i = h.indexOf(`href="/${id}/"`, last);
    assert.ok(i > last, id);
    assert.ok(h.indexOf(title, i) > i && h.indexOf(line, i) > i, id);
    last = i;
  }
});

test('examples', () => {
  const h = main();
  assert.ok(h.includes('Examples of our work'));
  assert.equal((h.match(/class="work-card[" ]/g) ?? []).length, 1);
});

test('reviews', () => {
  const h = main();
  assert.ok(h.includes('What customers say'));
  const names = [...h.matchAll(/>([^<>]+), review on Google</g)].map((m) => m[1]);
  assert.deepEqual(names, ['Mayur', 'Stephen', 'Steve']);
  assert.ok(h.includes('Read more reviews') && h.includes('href="/reviews/"'));
});

test('enquiry heading', () => {
  assert.ok(main().includes('>Send an enquiry<'));
});

test('reviews link does not overstate the count', () => {
  assert.ok(!main().includes('Read all 74 reviews'));
  assert.ok(main().includes('Read more reviews'));
});

test('hero footage: muted, inline, still frame first, and the files exist', async () => {
  const h = home();
  assert.match(h, /<video[^>]*\bmuted\b[^>]*\bplaysinline\b[^>]*poster="\/video\/skyline-poster\.jpg"/);
  const { existsSync } = await import('node:fs');
  for (const f of ['skyline-poster.jpg', 'skyline-640.mp4', 'skyline-960.mp4']) assert.ok(existsSync(`dist/video/${f}`), f);
  assert.ok(h.includes('prefers-reduced-motion'));
});

test('first review in full, the review count said once in the section', () => {
  const h = main();
  const section = h.slice(h.indexOf('What customers say'), h.indexOf('Read more reviews'));
  assert.ok(section.includes('Great Job. Had a urgent boiler issues'));
  assert.equal((section.match(/from 74 Google reviews/g) ?? []).length, 1);
});

test('one job shows as a full-width feature', () => {
  assert.equal((main().match(/work-card--feature/g) ?? []).length, 1);
});
