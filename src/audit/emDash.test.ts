import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';
import ur from '../../messages/ur.json';

/**
 * Module 25.5 §19 — em-dash prevention (automated regression guard).
 *
 * The em dash (U+2014) must not appear in active public-facing website copy.
 * Public copy lives in the message catalogs (all leaf strings) and in
 * content-data / JSX literals under src/. Comment lines, test files, and the
 * dev-only records under src/audit/ are out of scope (§19 / §78). Any new
 * public-facing em dash — in either language — will fail this test.
 */

const EM_DASH = '—';
const ROOT = join(__dirname, '..', '..');

function leaves(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (node && typeof node === 'object') return Object.values(node).flatMap(leaves);
  return [];
}

function isCommentLine(line: string): boolean {
  const s = line.trimStart();
  return (
    s.startsWith('//') ||
    s.startsWith('*') ||
    s.startsWith('/*') ||
    s.startsWith('{/*')
  );
}

function isPublicSource(rel: string): boolean {
  const p = rel.split('\\').join('/');
  if (!/\.(ts|tsx)$/.test(p)) return false;
  if (p.endsWith('.test.ts') || p.endsWith('.test.tsx')) return false;
  if (p.includes('/audit/')) return false;
  return true;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

describe('Module 25.5 §19 — no public-facing em dashes', () => {
  it('message catalogs contain no em dash (U+2014)', () => {
    const offenders = [
      ...leaves(en).map((v) => ['en', v] as const),
      ...leaves(ur).map((v) => ['ur', v] as const),
    ].filter(([, v]) => v.includes(EM_DASH));
    expect(offenders.map(([l, v]) => `${l}: ${v.slice(0, 60)}`)).toEqual([]);
  });

  it('public-facing source content contains no em dash (excluding comments)', () => {
    const offenders: string[] = [];
    for (const file of walk(join(ROOT, 'src'))) {
      const rel = relative(ROOT, file);
      if (!isPublicSource(rel)) continue;
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (line.includes(EM_DASH) && !isCommentLine(line)) {
            offenders.push(`${rel.split('\\').join('/')}:${i + 1}`);
          }
        });
    }
    expect(offenders).toEqual([]);
  });
});
