/**
 * Client-side locale transition (Module 25.7).
 *
 * Extracted from the LanguageSwitcher so the behaviour that fixes the
 * stale-locale bug is unit-testable and cannot be quietly removed.
 *
 * Background: `replace` alone updates the URL and re-renders the locale layout
 * (lang, dir, metadata, navigation), but Next's client Router Cache replays the
 * previously cached page segment for the same logical route, so the page BODY
 * stayed in the old language until a manual reload. The server payload is
 * correct for both locales, so the cache is the only stale layer, and
 * invalidating it completes the transition.
 */

/** The subset of the next-intl router this transition needs. */
export interface LocaleSwitchRouter {
  replace(
    pathname: string,
    options: { locale: string; scroll?: boolean },
  ): void;
  refresh(): void;
}

/**
 * Query parameters allowed to survive a locale switch (Module 25.7 §14).
 *
 * ONLY the educational disease context travels. Genotype, carrier or parent
 * status, probability, relationship results and any other personal or derived
 * genetics state are never carried across, matching the Module 24 context
 * allowlist. Anything not listed here is dropped; the destination route also
 * re-validates `disease` and safely ignores unknown values.
 */
export const PRESERVED_QUERY_PARAMS = ['disease'] as const;

/**
 * Rebuilds the destination path, keeping only allowlisted query parameters.
 * `usePathname()` from next-intl excludes the query string, so without this a
 * language switch silently dropped an active `?disease=` context.
 */
export function buildLocaleSwitchPath(
  pathname: string,
  search: string | undefined,
): string {
  if (!search) return pathname;

  const incoming = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const key of PRESERVED_QUERY_PARAMS) {
    const value = incoming.get(key);
    if (value) kept.set(key, value);
  }

  const query = kept.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/**
 * Switches locale while preserving the equivalent route and scroll position.
 * Returns `false` (and performs no navigation) when the locale is unchanged.
 */
export function performLocaleSwitch(
  router: LocaleSwitchRouter,
  pathname: string,
  currentLocale: string,
  nextLocale: string,
  search?: string,
): boolean {
  if (nextLocale === currentLocale) return false;

  // Equivalent route + approved query context + scroll preserved: a language
  // change must never bounce the user to the top, to the homepage, or lose an
  // active disease context.
  router.replace(buildLocaleSwitchPath(pathname, search), {
    locale: nextLocale,
    scroll: false,
  });

  // Invalidate the stale client Router Cache entry so the destination locale's
  // body content is rendered from the server. Without this the page body keeps
  // the previous language until a manual reload.
  router.refresh();

  return true;
}
