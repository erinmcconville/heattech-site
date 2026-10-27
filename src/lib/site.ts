import { getCollection } from 'astro:content';

// Rebuilds site.yaml as one object: site.business.engineer, site.contact.phone, ...
export async function getSite() {
  const entries = await getCollection('site');
  return Object.fromEntries(entries.map((e) => [e.id, e.data])) as Record<string, Record<string, any>>;
}

export async function getPublishedStories() {
  return getCollection('stories', ({ data }) => data.published && data.permission_recorded);
}
