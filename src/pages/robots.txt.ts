import type { APIRoute } from 'astro';

// Netlify preview and branch builds ask search engines to stay away; the live site allows everything
const preview = Boolean(process.env.CONTEXT) && process.env.CONTEXT !== 'production';

export const GET: APIRoute = ({ site }) =>
  new Response(
    preview
      ? `User-agent: *\nDisallow: /\n`
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
