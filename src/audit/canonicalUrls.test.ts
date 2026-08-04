import { describe, it, expect } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { PUBLIC_ROUTES, DISALLOWED_PATHS } from '../constants/publicRoutes';
import { routing } from '../i18n/routing';
import { DISEASES } from '../features/diseases';
import { LEARNING_RESOURCES } from '../features/learning';

/**
 * Module 26 §27, canonical URL and discoverability guards.
 *
 * The sitemap is the one place where a wrong NEXT_PUBLIC_SITE_URL becomes
 * publicly visible at scale, and preview routes leaking into it would advertise
 * URLs that are supposed to 404 in production. Both are cheap to assert and
 * expensive to notice by eye.
 */

const entries = sitemap();
const rules = robots();

describe('§27 sitemap', () => {
  it('emits every public route in both locales', () => {
    const expected =
      (PUBLIC_ROUTES.length + DISEASES.length + LEARNING_RESOURCES.length) *
      routing.locales.length;
    expect(entries).toHaveLength(expected);
  });

  it('gives every entry an absolute URL', () => {
    for (const entry of entries) {
      expect(() => new URL(entry.url)).not.toThrow();
    }
  });

  it('never advertises a preview, search or family-tree URL', () => {
    const leaked = entries
      .map((e) => e.url)
      .filter((u) => /\/preview|stories-preview|\/search|family-tree/.test(u));
    expect(leaked).toEqual([]);
  });

  it('declares language alternates on every entry, so EN and UR are not duplicates', () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {};
      expect(Object.keys(languages).sort()).toEqual([...routing.locales].sort());
    }
  });

  it('contains no duplicate URL', () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('prefixes every URL with a supported locale', () => {
    for (const entry of entries) {
      const { pathname } = new URL(entry.url);
      expect(pathname).toMatch(
        new RegExp(`^/(${routing.locales.join('|')})(/|$)`),
      );
    }
  });

  it('does not produce a trailing slash for the homepage', () => {
    const homes = entries.filter((e) => /\/(en|ur)$/.test(new URL(e.url).pathname));
    expect(homes).toHaveLength(routing.locales.length);
  });
});

describe('§27 robots', () => {
  it('allows indexing and points at the sitemap', () => {
    const rule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;
    expect(rule?.allow).toBe('/');
    expect(rules.sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it('disallows the search placeholder and every preview route', () => {
    const rule = Array.isArray(rules.rules) ? rules.rules[0] : rules.rules;
    const disallow = [rule?.disallow ?? []].flat();
    for (const path of DISALLOWED_PATHS) {
      expect(disallow).toContain(path);
    }
  });
});

describe('§27 production origin', () => {
  // A guard against shipping a build whose canonical URLs point at a developer
  // machine. Locally this passes trivially; in CI and production the value is
  // supplied by the environment, and a wrong one fails loudly here.
  const origins = new Set(entries.map((e) => new URL(e.url).origin));

  it('uses exactly one origin across the whole sitemap', () => {
    expect(origins.size).toBe(1);
  });

  it('never emits a preview-host origin', () => {
    for (const origin of origins) {
      expect(origin).not.toMatch(/vercel\.app|netlify\.app|127\.0\.0\.1/);
    }
  });

  it('uses https whenever the origin is not localhost', () => {
    for (const origin of origins) {
      if (!origin.includes('localhost')) {
        expect(origin.startsWith('https://')).toBe(true);
      }
    }
  });
});
