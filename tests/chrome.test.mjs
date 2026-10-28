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
