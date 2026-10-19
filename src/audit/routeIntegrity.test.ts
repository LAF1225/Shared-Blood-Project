import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';
import ur from '../../messages/ur.json';
import {
  PRIMARY_NAV,
  PRIMARY_DESTINATIONS,
  FOOTER_NAV,
  FOOTER_GOVERNANCE_LINKS,
  NAV_ENTRY_IDS,
} from '@/constants/navigation';
import { resolveActiveEntryId, resolveActiveHref, isCurrentPage } from '@/lib/nav';

/**
 * Module 25.6 §15 — route-integrity tests for the canonical navigation.
 *
 * Every expectation is derived from PRIMARY_NAV itself rather than a hand-copied
 * list, so the tests cannot silently drift from the shipped navigation. A route
 * is considered valid when a matching App Router page file exists under
 * src/app/[locale]/, which also proves the destination is directly loadable
 * (not only reachable through client-side navigation).
 */

const APP_DIR = join(__dirname, '..', 'app', '[locale]');
const navMessages = (en as { Nav: Record<string, string> }).Nav;
const navMessagesUr = (ur as { Nav: Record<string, string> }).Nav;

/** True when `src/app/[locale]/<route>/page.tsx` exists (or the locale root). */
function routeHasPage(route: string): boolean {
  const segments = route.split('/').filter(Boolean);
  const dir = segments.length ? join(APP_DIR, ...segments) : APP_DIR;
  return existsSync(join(dir, 'page.tsx'));
}

describe('Module 25.6 §3 — six primary entry points', () => {
  it('exposes exactly six primary entries in the locked order', () => {
    expect(PRIMARY_NAV.map((e) => e.id)).toEqual([
      'home',
      'learn',
      'genetics',
      'map',
      'resources',
      'about',
    ]);
    expect(PRIMARY_NAV.length).toBeLessThanOrEqual(6);
    expect([...NAV_ENTRY_IDS]).toEqual(PRIMARY_NAV.map((e) => e.id));
  });

  it('each entry is either a direct destination or a group, never both', () => {
    for (const entry of PRIMARY_NAV) {
      const isDirect = typeof entry.href === 'string';
      const isGroup = Array.isArray(entry.children) && entry.children.length > 0;
      expect(isDirect !== isGroup, `entry ${entry.id}`).toBe(true);
    }
  });

  it('keeps Home and Pakistan Map as direct destinations (§2)', () => {
    const direct = PRIMARY_NAV.filter((e) => e.href).map((e) => e.id);
    expect(direct).toEqual(['home', 'map']);
  });

  it('groups Learn, Genetics, Resources and About (§2)', () => {
    const groups = PRIMARY_NAV.filter((e) => e.children).map((e) => e.id);
    expect(groups).toEqual(['learn', 'genetics', 'resources', 'about']);
  });
});

describe('Module 25.6 §15 — every navigation destination has a valid route', () => {
  it('no destination has an empty, undefined, or placeholder href', () => {
    for (const item of PRIMARY_DESTINATIONS) {
      expect(typeof item.href, item.id).toBe('string');
      expect(item.href.length, item.id).toBeGreaterThan(0);
      expect(item.href.startsWith('/'), item.id).toBe(true);
      expect(item.href, item.id).not.toBe('#');
      expect(item.href, item.id).not.toContain('#');
      expect(item.href, item.id).not.toContain('undefined');
    }
  });

  it('every primary destination resolves to a real App Router page', () => {
    for (const item of PRIMARY_DESTINATIONS) {
      expect(routeHasPage(item.href), `${item.id} -> ${item.href}`).toBe(true);
    }
  });

  it('every footer and governance destination resolves to a real page', () => {
    for (const item of [...FOOTER_NAV, ...FOOTER_GOVERNANCE_LINKS]) {
      expect(routeHasPage(item.href), `${item.id} -> ${item.href}`).toBe(true);
    }
  });

  it('no destination points at the retired Family Tree (§23)', () => {
    for (const item of [
      ...PRIMARY_DESTINATIONS,
      ...FOOTER_NAV,
      ...FOOTER_GOVERNANCE_LINKS,
    ]) {
      expect(item.href).not.toMatch(/family-tree/);
    }
    expect(existsSync(join(APP_DIR, 'genetics', 'family-tree-explorer'))).toBe(false);
  });

  it('links no unintended placeholder route (Hospitals, Downloads) (§22)', () => {
    const hrefs = PRIMARY_DESTINATIONS.map((i) => i.href);
    expect(hrefs).not.toContain('/hospitals');
    expect(hrefs).not.toContain('/downloads');
  });

  it('contains no duplicate destinations', () => {
    const hrefs = PRIMARY_DESTINATIONS.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe('Module 25.6 §4 — canonical source drives desktop and mobile alike', () => {
  it('the flattened destination set matches the tree', () => {
    const fromTree = PRIMARY_NAV.flatMap((e) =>
      e.children ? e.children.map((c) => c.href) : e.href ? [e.href] : [],
    );
    expect(PRIMARY_DESTINATIONS.map((i) => i.href)).toEqual(fromTree);
  });

  it('covers every section that used to sit in the flat header', () => {
    const hrefs = PRIMARY_DESTINATIONS.map((i) => i.href);
    for (const route of [
      '/',
      '/diseases',
      '/early-signs',
      '/care-support',
      '/genetic-testing',
      '/genetics',
      '/genetics/pakistan-map',
      '/resources',
      '/survey',
      '/community',
      '/policy',
      '/about',
    ]) {
      expect(hrefs, `lost destination ${route}`).toContain(route);
    }
  });

  it('exposes all five genetics tools under the Genetics group (§21)', () => {
    const genetics = PRIMARY_NAV.find((e) => e.id === 'genetics');
    expect(genetics?.children?.map((c) => c.href)).toEqual([
      '/genetics',
      '/genetics/inheritance-calculator',
      '/genetics/dna-explorer',
      '/genetics/punnett-square',
      '/genetics/relationship-risk',
    ]);
  });

  it('lists About, Community and Policy under About, with no Research link anywhere', () => {
    const about = PRIMARY_NAV.find((e) => e.id === 'about');
    expect(about?.children?.map((c) => c.href)).toEqual(['/about', '/community', '/policy']);
    expect(FOOTER_NAV.map((i) => i.href)).not.toContain('/research');
  });
});

describe('Module 25.6 §8 — parent active states', () => {
  const cases: Array<[string, string]> = [
    ['/', 'home'],
    ['/diseases', 'learn'],
    ['/diseases/beta-thalassemia', 'learn'],
    ['/early-signs', 'learn'],
    ['/care-support', 'learn'],
    ['/genetic-testing', 'learn'],
    ['/genetics', 'genetics'],
    ['/genetics/inheritance-calculator', 'genetics'],
    ['/genetics/dna-explorer', 'genetics'],
    ['/genetics/punnett-square', 'genetics'],
    ['/genetics/relationship-risk', 'genetics'],
    // The nested direct entry must win over the shallower Genetics group.
    ['/genetics/pakistan-map', 'map'],
    ['/resources', 'resources'],
    ['/resources/early-symptoms-guide', 'resources'],
    ['/survey', 'resources'],
    ['/about', 'about'],
    ['/community', 'about'],
    ['/policy', 'about'],
  ];

  for (const [pathname, expected] of cases) {
    it(`${pathname} activates "${expected}"`, () => {
      expect(resolveActiveEntryId(pathname, PRIMARY_NAV)).toBe(expected);
    });
  }

  it('returns undefined for routes outside the primary navigation', () => {
    expect(resolveActiveEntryId('/contact', PRIMARY_NAV)).toBeUndefined();
    expect(resolveActiveEntryId('/privacy', PRIMARY_NAV)).toBeUndefined();
    // Research was removed from the About menu; its page is unlinked.
    expect(resolveActiveEntryId('/research', PRIMARY_NAV)).toBeUndefined();
  });
});

describe('Module 25.6 §8 — exactly one active item, one aria-current', () => {
  const geneticsHrefs =
    PRIMARY_NAV.find((e) => e.id === 'genetics')!.children!.map((c) => c.href);

  it('highlights only the most specific child within a group', () => {
    // Both /genetics and /genetics/punnett-square match this route; the deeper
    // one must win so the menu never shows two active items.
    expect(resolveActiveHref('/genetics/punnett-square', geneticsHrefs)).toBe(
      '/genetics/punnett-square',
    );
    expect(resolveActiveHref('/genetics', geneticsHrefs)).toBe('/genetics');
  });

  it('marks aria-current="page" only on the page actually being viewed', () => {
    // Ancestor section links are highlighted but never announced as current.
    expect(isCurrentPage('/genetics/punnett-square', '/genetics')).toBe(false);
    expect(isCurrentPage('/genetics/punnett-square', '/genetics/punnett-square')).toBe(true);
    expect(isCurrentPage('/diseases/beta-thalassemia', '/diseases')).toBe(false);
  });

  it('never yields more than one current page across all destinations', () => {
    for (const route of PRIMARY_DESTINATIONS.map((i) => i.href)) {
      const current = PRIMARY_DESTINATIONS.filter((i) => isCurrentPage(route, i.href));
      expect(current.length, `route ${route}`).toBe(1);
    }
  });
});

describe('Module 25.6 — navigation labels exist in both locales', () => {
  const keys = [
    ...PRIMARY_NAV.map((e) => e.labelKey),
    ...PRIMARY_DESTINATIONS.map((i) => i.labelKey),
  ];

  it('every label key resolves in English and Urdu', () => {
    for (const key of new Set(keys)) {
      expect(navMessages[key], `en Nav.${key}`).toBeTruthy();
      expect(navMessagesUr[key], `ur Nav.${key}`).toBeTruthy();
    }
  });

  it('navigation copy contains no em dash (Module 25.5 §19 / 25.6 §25)', () => {
    for (const key of new Set(keys)) {
      expect(navMessages[key]).not.toContain('—');
      expect(navMessagesUr[key]).not.toContain('—');
    }
  });
});

describe('Module 25.6 §17 — destinations are directly loadable', () => {
  it('every primary destination directory contains a page entry point', () => {
    // Guards against a route that only works via client-side navigation.
    for (const item of PRIMARY_DESTINATIONS) {
      const segments = item.href.split('/').filter(Boolean);
      const dir = segments.length ? join(APP_DIR, ...segments) : APP_DIR;
      expect(existsSync(dir), `${item.href} directory`).toBe(true);
      expect(readdirSync(dir)).toContain('page.tsx');
    }
  });
});
