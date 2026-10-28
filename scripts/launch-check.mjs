// Launch check: the live site doesn't build while unconfirmed copy remains.
// [PHOTO: …] slots are allowed (decisions.md, 27 Oct 2026); HTML comments and /content-check/ are ignored.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const PENDING = /\[(PLACEHOLDER|CONFIRM)[^\]]*\]/g;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => join(e.parentPath, e.name))
    .filter((f) => !f.includes('content-check'));
}

export async function findPending(distDir) {
  const found = [];
  for (const file of await htmlFiles(distDir)) {
    const html = (await readFile(file, 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
    for (const m of html.matchAll(PENDING)) found.push({ file, match: m[0] });
  }
  return found;
}

// Ryan picks "Heattech" or "HeatTech"; site.yaml records when he has
export function nameConfirmed(siteYamlText) {
  return /^\s*trading_name_confirmed:\s*true\s*$/m.test(siteYamlText);
}
