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
  assert.ok(h.includes('Read all 74 reviews') && h.includes('href="/reviews/"'));
});

test('enquiry heading', () => {
  assert.ok(main().includes('>Send an enquiry<'));
});
