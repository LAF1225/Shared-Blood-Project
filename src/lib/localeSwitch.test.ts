import { describe, it, expect, vi } from 'vitest';
import {
  performLocaleSwitch,
  buildLocaleSwitchPath,
  type LocaleSwitchRouter,
} from './localeSwitch';

/**
 * Module 25.7 §8/§23 — stale-locale regression guard.
 *
 * The original defect: switching language updated the URL, `dir`, metadata and
 * navigation, but the page BODY stayed in the previous language because Next's
 * client Router Cache replayed the previously cached page segment. The server
 * payload was correct for both locales, so the repair is cache invalidation.
 *
 * These tests pin that contract. If the cache invalidation is removed, or the
 * navigation stops preserving the equivalent route, they fail, which is exactly
 * the condition under which the original bug returns.
 */

function makeRouter() {
  const calls: string[] = [];
  const router: LocaleSwitchRouter = {
    replace: vi.fn((pathname, options) => {
      calls.push(`replace:${pathname}:${options.locale}:${options.scroll}`);
    }),
    refresh: vi.fn(() => {
      calls.push('refresh');
    }),
  };
  return { router, calls };
}

describe('buildLocaleSwitchPath', () => {
  it('returns the bare pathname when there is no query', () => {
    expect(buildLocaleSwitchPath('/about', undefined)).toBe('/about');
    expect(buildLocaleSwitchPath('/about', '')).toBe('/about');
  });

  it('keeps only the approved disease context', () => {
    expect(
      buildLocaleSwitchPath('/genetics/dna-explorer', '?disease=beta-thalassemia'),
    ).toBe('/genetics/dna-explorer?disease=beta-thalassemia');
  });

  it('drops every non-allowlisted parameter', () => {
    for (const param of [
      'genotype=Aa',
      'carrier=true',
      'parent1=carrier',
      'parent2=affected',
      'probability=25',
      'risk=high',
      'relationship=first-cousin',
      'result=affected',
    ]) {
      expect(buildLocaleSwitchPath('/genetics/punnett-square', `?${param}`)).toBe(
        '/genetics/punnett-square',
      );
    }
  });

  it('ignores an empty disease value rather than emitting a dangling query', () => {
    expect(buildLocaleSwitchPath('/genetics/dna-explorer', '?disease=')).toBe(
      '/genetics/dna-explorer',
    );
  });
});

describe('performLocaleSwitch', () => {
  it('does nothing when the requested locale is already active', () => {
    const { router } = makeRouter();
    expect(performLocaleSwitch(router, '/about', 'en', 'en')).toBe(false);
    expect(router.replace).not.toHaveBeenCalled();
    expect(router.refresh).not.toHaveBeenCalled();
  });

  it('navigates to the equivalent route in the new locale (EN to UR)', () => {
    const { router } = makeRouter();
    expect(performLocaleSwitch(router, '/about', 'en', 'ur')).toBe(true);
    expect(router.replace).toHaveBeenCalledWith('/about', {
      locale: 'ur',
      scroll: false,
    });
  });

  it('navigates to the equivalent route in the new locale (UR to EN)', () => {
    const { router } = makeRouter();
    expect(performLocaleSwitch(router, '/about', 'ur', 'en')).toBe(true);
    expect(router.replace).toHaveBeenCalledWith('/about', {
      locale: 'en',
      scroll: false,
    });
  });

  it('invalidates the client Router Cache so the page body is re-rendered', () => {
    // This is the assertion that fails if the stale-locale bug is reintroduced.
    const { router } = makeRouter();
    performLocaleSwitch(router, '/about', 'en', 'ur');
    expect(router.refresh).toHaveBeenCalledTimes(1);
  });

  it('invalidates the cache AFTER navigating, so the new route is refreshed', () => {
    const { router, calls } = makeRouter();
    performLocaleSwitch(router, '/genetics/dna-explorer', 'en', 'ur');
    expect(calls).toEqual([
      'replace:/genetics/dna-explorer:ur:false',
      'refresh',
    ]);
  });

  it('preserves deep genetics routes rather than sending the user home', () => {
    const { router } = makeRouter();
    for (const path of [
      '/genetics/inheritance-calculator',
      '/genetics/dna-explorer',
      '/genetics/punnett-square',
      '/genetics/relationship-risk',
      '/genetics/pakistan-map',
      '/diseases/beta-thalassemia',
    ]) {
      performLocaleSwitch(router, path, 'en', 'ur');
      expect(router.replace).toHaveBeenLastCalledWith(path, {
        locale: 'ur',
        scroll: false,
      });
    }
  });

  it('never scrolls the user to the top on a language change', () => {
    const { router } = makeRouter();
    performLocaleSwitch(router, '/research', 'en', 'ur');
    expect(router.replace).toHaveBeenCalledWith(
      '/research',
      expect.objectContaining({ scroll: false }),
    );
  });

  it('preserves an approved ?disease= context across the switch (§14)', () => {
    const { router } = makeRouter();
    performLocaleSwitch(
      router,
      '/genetics/dna-explorer',
      'en',
      'ur',
      '?disease=ehlers-danlos-syndrome',
    );
    expect(router.replace).toHaveBeenCalledWith(
      '/genetics/dna-explorer?disease=ehlers-danlos-syndrome',
      { locale: 'ur', scroll: false },
    );
  });

  it('never carries sensitive genetics state across the switch (§14)', () => {
    const { router } = makeRouter();
    performLocaleSwitch(
      router,
      '/genetics/inheritance-calculator',
      'en',
      'ur',
      '?disease=cystic-fibrosis&genotype=Aa&parent1=carrier&parent2=affected&probability=25&risk=high&relationship=cousin&carrier=true',
    );
    // Only the educational disease context survives.
    expect(router.replace).toHaveBeenCalledWith(
      '/genetics/inheritance-calculator?disease=cystic-fibrosis',
      { locale: 'ur', scroll: false },
    );
  });

  it('switches cleanly and repeatedly in both directions', () => {
    const { router, calls } = makeRouter();
    performLocaleSwitch(router, '/about', 'en', 'ur');
    performLocaleSwitch(router, '/about', 'ur', 'en');
    performLocaleSwitch(router, '/about', 'en', 'ur');
    // One navigation + one invalidation per switch: no accumulation, no loops.
    expect(calls.filter((c) => c === 'refresh')).toHaveLength(3);
    expect(calls.filter((c) => c.startsWith('replace'))).toHaveLength(3);
  });
});
