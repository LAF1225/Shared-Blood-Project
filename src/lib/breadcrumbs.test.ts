import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';
import ur from '../../messages/ur.json';
import { PUBLIC_ROUTES } from '@/constants/publicRoutes';
import { buildCrumbs } from './nav';

/** Resolves a dotted i18n key against a message catalogue. */
function lookup(catalog: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>(
    (node, part) => (node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined),
    catalog,
  );
}

/**
 * Breadcrumbs fall back to the English, prettified URL slug when a segment has
 * no label key, which left Urdu pages with English crumbs. Every indexable page
 * must therefore end in a crumb whose label exists in both catalogues.
 */
describe('breadcrumb labels', () => {
  const paths = PUBLIC_ROUTES.map((r) => r.path).filter((p) => p !== '/');

  it.each(paths)('%s has a translated breadcrumb in English and Urdu', (path) => {
    const last = buildCrumbs(path).at(-1);
    expect(last?.labelKey, `no label key for ${path}`).toBeTruthy();
    expect(typeof lookup(en, last!.labelKey!)).toBe('string');
    expect(typeof lookup(ur, last!.labelKey!)).toBe('string');
  });
});
