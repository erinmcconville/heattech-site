import type { APIRoute } from 'astro';

// Every public page. Leaves out the content check and the form's thank-you page.
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/services/', '/reviews/', '/about/', '/contact/', '/privacy/'];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
