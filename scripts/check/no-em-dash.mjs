#!/usr/bin/env node
/**
 * Module 25.5 §19 — automated em-dash repository check.
 *
 * Fails (exit 1) if the Unicode em dash (U+2014) appears in active public-facing
 * content. Public copy in this app lives in two places:
 *   1. the message catalogs (messages/en.json, messages/ur.json), and
 *   2. content-data / JSX literals under src/ (disease content, care records,
 *      genetics copy, references, etc.).
 *
 * Out of scope (§19 / §78, internal/non-public): comment lines, test files, and
 * the dev-only implementation records under src/audit/.
 *
 * Usage: `npm run check:emdash` (also enforced by src/audit/emDash.test.ts).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const EM_DASH = '—';
const CATALOGS = ['messages/en.json', 'messages/ur.json'];

function leafEntries(node, path = '') {
  if (typeof node === 'string') return [[path, node]];
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) =>
      leafEntries(v, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

/** A source line that is purely a comment is out of scope. */
function isCommentLine(line) {
  const s = line.trimStart();
  return (
    s.startsWith('//') ||
    s.startsWith('*') ||
    s.startsWith('/*') ||
    s.startsWith('{/*')
  );
}

function isPublicSource(rel) {
  const p = rel.split('\\').join('/');
  if (!/\.(ts|tsx)$/.test(p)) return false;
  if (p.endsWith('.test.ts') || p.endsWith('.test.tsx')) return false;
  if (p.includes('/audit/')) return false;
  return true;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const offenders = [];

// 1. Message catalogs
for (const rel of CATALOGS) {
  const data = JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));
  for (const [path, value] of leafEntries(data)) {
    if (value.includes(EM_DASH)) offenders.push(`${rel} :: ${path}`);
  }
}

// 2. Public-facing source content (skip comment lines)
for (const file of walk(join(ROOT, 'src'))) {
  const rel = relative(ROOT, file);
  if (!isPublicSource(rel)) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (!line.includes(EM_DASH) || isCommentLine(line)) return;
    offenders.push(`${rel.split('\\').join('/')}:${i + 1}`);
  });
}

if (offenders.length) {
  console.error(`\nEm-dash check FAILED: ${offenders.length} public-facing occurrence(s):`);
  for (const o of offenders) console.error(`  - ${o}`);
  console.error(
    `\nReplace with a comma, colon, semicolon, period, parentheses, or a reworded ` +
      `sentence chosen for the grammatical context (Module 25.5 §19).`,
  );
  process.exit(1);
}
console.log('Em-dash check passed: no public-facing em dashes (catalogs + src).');
