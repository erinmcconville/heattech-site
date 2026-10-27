import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Used for canonical links, structured data and the sitemap.
  // [CONFIRM: domain] Ryan's email uses heattechgas.co.uk, but ownership isn't confirmed (research/01-plumber.md).
  site: 'https://heattechgas.co.uk',
});
