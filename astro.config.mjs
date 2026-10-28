import { defineConfig } from 'astro/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { findPending, nameConfirmed } from './scripts/launch-check.mjs';

// Live builds only (Netlify sets CONTEXT=production). Previews and local builds are untouched.
const launchCheck = {
  name: 'launch-check',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (process.env.CONTEXT !== 'production') return;
      const pending = await findPending(fileURLToPath(dir));
      const named = nameConfirmed(await readFile('src/content/site.yaml', 'utf8'));
      if (!pending.length && named) return;
      for (const p of pending) console.error(`${p.file}: ${p.match}`);
      if (!named) console.error('site.yaml: trading_name_confirmed is not true');
      throw new Error(`Not ready to go live: ${pending.length + (named ? 0 : 1)} item(s) still to confirm.`);
    },
  },
};

export default defineConfig({
  output: 'static',
  // Used for canonical links, structured data and the sitemap.
  // [CONFIRM: domain] Ryan's email uses heattechgas.co.uk, but ownership isn't confirmed (research/01-plumber.md).
  site: 'https://heattechgas.co.uk',
  integrations: [launchCheck],
});
