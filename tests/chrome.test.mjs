import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const header = () => { const h = page('about/index.html'); return h.slice(h.indexOf('<header'), h.indexOf('</header>')); };
const footer = () => { const h = page('about/index.html'); return h.slice(h.indexOf('<footer'), h.indexOf('</footer>')); };

test('menu works without JavaScript', () => {
  const h = header();
  assert.match(h, /<details/);
  for (const url of ['/boiler-repairs/', '/new-boilers/', '/heating-upgrades/', '/servicing-and-certificates/', '/leaks-taps-and-drains/', '/work/', '/reviews/', '/about/', '/contact/'])
    assert.ok(h.includes(`href="${url}"`), url);
});

test('header call button', () => {
  assert.ok(header().includes('href="tel:+447506042175"'));
});

test('footer facts', () => {
  const f = footer();
  for (const s of ['0800 111 999', 'Gas Safe', '661231', 'SC690576', '6 Hoffmann Place', 'href="/privacy/"']) assert.ok(f.includes(s), s);
  assert.ok(!f.includes('Portobello'));
  assert.ok(!f.includes('/electric-to-gas/') && !f.includes('/landlords/'));
});

test('phone bar uses the page wording', () => {
  const h = page('about/index.html');
  const bar = h.slice(h.indexOf('data-mobile-bar'), h.indexOf('</nav>', h.indexOf('data-mobile-bar')));
  assert.ok(bar.includes('>Send an enquiry<') && !bar.includes('>Enquire<'));
});

test('gas emergency line shown once on Contact', () => {
  assert.equal((page('contact/index.html').match(/Smell gas\?/g) ?? []).length, 1);
});

test('no spaced-capital labels or arrows on links', () => {
  for (const p of ['index.html', 'new-boilers/index.html', 'work/stockbridge-gas-central-heating/index.html']) {
    const h = page(p);
    assert.ok(!h.includes('class="eyebrow"'), p);
    assert.ok(!/See the job[^<]*<span aria-hidden="true">→|Read more reviews <span/.test(h), p);
  }
});
