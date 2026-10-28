import { getCollection } from 'astro:content';

// Rebuilds site.yaml as one object: site.business.engineer, site.contact.phone, ...
export async function getSite() {
  const entries = await getCollection('site');
  return Object.fromEntries(entries.map((e) => [e.id, e.data])) as Record<string, Record<string, any>>;
}

// Jobs shown on the site: published, with the customer's permission recorded, plus any samples
export async function getLiveWork() {
  // Real jobs first, then lorem ipsum samples (which block the live build until replaced)
  const work = await getCollection('work', ({ data }) => (data.published && data.permission_recorded) || data.sample);
  return work.sort((a, b) => Number(a.data.sample) - Number(b.data.sample));
}

// Complete reviews by id, in the order given. Unknown or cut-off reviews are skipped.
export async function getReviewsByIds(ids: string[]) {
  const reviews = await getReviews();
  return ids.map((id) => reviews.find((r) => r.id === id)).filter((r) => r !== undefined);
}

// The four Services sections, in the order set in services.yaml
export async function getServices() {
  const services = await getCollection('services');
  return services.sort((a, b) => a.data.order - b.data.order);
}

// Complete reviews only, with the hand-picked first six ("order") at the front.
// Stops the build if an excerpt isn't the customer's exact words.
export async function getReviews() {
  const reviews = await getCollection('reviews', ({ data }) => data.complete);
  for (const r of reviews) {
    const parts = (r.data.excerpt ?? '').split('…').map((p) => p.trim()).filter(Boolean);
    const missing = parts.find((p) => !r.data.text.includes(p));
    if (missing) throw new Error(`Review excerpt for "${r.id}" isn't word for word: "${missing}"`);
  }
  return reviews.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}
