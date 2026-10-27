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
  note: z.string().optional(),
  emergency: z.boolean().default(false),
  home: z.boolean().default(false),
});

const services = defineCollection({
  loader: file('src/content/services.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    jobs: z.array(job),
    explainer: z
      .object({
        title: z.string(),
        intro: z.string(),
        points: z.array(
          z.object({ label: z.string(), text: z.string(), link: z.url(), link_text: z.string() }),
        ),
        story: z.string(),
      })
      .optional(),
  }),
});

const reviews = defineCollection({
  loader: file('src/content/reviews.yaml'),
  schema: z.object({
    name: z.string(),
    text: z.string(),
    proves: z.string(),
    link: z.string(),
    featured: z.boolean().default(false),
  }),
});

// Every story uses the same fields (build plan, "Real stories").
// A story only shows when published AND permission_recorded are both true.
const stories = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/stories' }),
  schema: z.object({
    title: z.string(),
    area: z.string(),
    property: z.string(),
    job_type: z.string(),
    problem: z.string(),
    usual_approach: z.string(),
    what_ryan_did: z.string(),
    result: z.string(),
    quotes: z.array(z.object({ text: z.string(), who: z.string() })),
    photos: z.array(z.string()),
    published: z.boolean().default(false),
    permission_recorded: z.boolean().default(false),
    ryan_check: z.string().optional(),
    gas_supply_already_there: z.string().optional(),
  }),
});

export const collections = { site, services, reviews, stories };
