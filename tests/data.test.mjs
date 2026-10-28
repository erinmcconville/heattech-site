import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const servicesYaml = readFileSync('src/content/services.yaml', 'utf8');
const reviewsYaml = readFileSync('src/content/reviews.yaml', 'utf8');
const siteYaml = readFileSync('src/content/site.yaml', 'utf8');

// Top-level records in services.yaml start with "- id: "
const services = servicesYaml.split(/^- id: /m).slice(1).map((block) => ({
  id: block.split('\n')[0].trim(),
  block,
}));

const completeReviews = new Set(
  reviewsYaml.split(/^- id: /m).slice(1)
    .filter((b) => !/complete: false/.test(b))
    .map((b) => b.split('\n')[0].trim()),
);

test('five services in order', () => {
  assert.deepEqual(services.map((s) => s.id), [
    'boiler-repairs', 'new-boilers', 'heating-upgrades', 'servicing-and-certificates', 'leaks-taps-and-drains',
  ]);
});

test('every service has title, line and two reviews', () => {
  for (const s of services) {
    assert.match(s.block, /^ {2}title: \S/m, s.id);
    assert.match(s.block, /^ {2}line: \S/m, s.id);
    const reviews = s.block.match(/^ {2}reviews: \[([^\]]*)\]/m);
    assert.ok(reviews, `${s.id} reviews`);
    assert.equal(reviews[1].split(',').length, 2, s.id);
  }
});

test('service reviews are complete', () => {
  for (const s of services) {
    const ids = s.block.match(/^ {2}reviews: \[([^\]]*)\]/m)[1].split(',').map((x) => x.trim());
    for (const id of ids) assert.ok(completeReviews.has(id), `${s.id}: ${id}`);
  }
});

test('based in Edinburgh', () => {
  assert.match(siteYaml, /^\s*based_in: Edinburgh\s*$/m);
  assert.match(siteYaml, /^\s*colleague_name: Brett Duncan\s*$/m);
});
