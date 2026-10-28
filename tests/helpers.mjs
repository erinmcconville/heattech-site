import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

export const page = (path) => readFileSync(`dist/${path}`, 'utf8');

const build = () => execSync('npx astro build', { stdio: 'ignore' });

// Edits a content file, rebuilds, runs fn, then always puts the file back and rebuilds
export async function withEdit(file, from, to, fn) {
  const original = readFileSync(file, 'utf8');
  // from: exact text, or a RegExp
  const found = typeof from === 'string' ? original.includes(from) : from.test(original);
  if (!found) throw new Error(`${file}: "${from}" not found`);
  try {
    writeFileSync(file, original.replace(from, to));
    build();
    await fn();
  } finally {
    writeFileSync(file, original);
    build();
  }
}
