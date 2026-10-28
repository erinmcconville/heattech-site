import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// site.yaml: each top-level group (business, contact, ...) becomes one entry.
// The full shape is checked in src/lib/site.ts.
const site = defineCollection({
  loader: file('src/content/site.yaml'),
  schema: z.record(z.string(), z.any()),
});

const job = z.object({
  id: z.string(),
  label: z.string(),
  emergency: z.boolean().default(false),
});

// One record per service page. Optional blocks are left out when they don't apply.
const services = defineCollection({
  loader: file('src/content/services.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    line: z.string(),
    icon: z.string(),
    summary: z.string(),
    includes: z.array(z.string()).optional(),
    includes_check: z.string().optional(),
    price_title: z.string().optional(),
    price_factors: z.array(z.object({ label: z.string(), text: z.string() })).optional(),
    price_check: z.string().optional(),
    notes: z.array(z.string()).optional(),
    sources: z.array(z.object({ text: z.string(), href: z.url() })).optional(),
    last_checked: z.string().optional(),
    reviews: z.array(z.string()),
    example: z.string().optional(),
    jobs: z.array(job),
  }),
});

const reviews = defineCollection({
  loader: file('src/content/reviews.yaml'),
  schema: z.object({
    name: z.string(),
    text: z.string(),
    excerpt: z.string().optional(),
    link: z.url().optional(),
    complete: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

// Recent work: every entry uses the same fields.
// An entry only shows when published AND permission_recorded are both true.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    area: z.string(),
    property: z.string(),
    job_type: z.string(),
    problem: z.string(),
    usual_approach: z.string().optional(),
    what_ryan_did: z.string(),
    result: z.string().optional(),
    quotes: z.array(z.object({ text: z.string(), who: z.string() })).default([]),
    photos: z.array(z.string()),
    published: z.boolean().default(false),
    permission_recorded: z.boolean().default(false),
    ryan_check: z.string().optional(),
    gas_supply_already_there: z.string().optional(),
  }),
});

export const collections = { site, services, reviews, work };
