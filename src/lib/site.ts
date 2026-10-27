import { getCollection } from 'astro:content';

// Rebuilds site.yaml as one object: site.business.engineer, site.contact.phone, ...
export async function getSite() {
  const entries = await getCollection('site');
  return Object.fromEntries(entries.map((e) => [e.id, e.data])) as Record<string, Record<string, any>>;
}

export async function getPublishedWork() {
  return getCollection('work', ({ data }) => data.published && data.permission_recorded);
}

// The four Services sections, in the order set in services.yaml
export async function getServices() {
  const services = await getCollection('services');
  return services.sort((a, b) => a.data.order - b.data.order);
}

// Complete reviews only, with the hand-picked first six ("order") at the front
export async function getReviews() {
  const reviews = await getCollection('reviews', ({ data }) => data.complete);
  return reviews.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}
