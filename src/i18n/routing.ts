import { defineRouting } from 'next-intl/routing';

/**
 * Localization routing (Module 01: Foundation).
 * Bilingual English / Urdu with locale-prefixed, locale-aware routes.
 * Translation content is added by later modules; only the framework lives here.
 */
export const routing = defineRouting({
  locales: ['en', 'ur'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

/** Type guard for validating an incoming locale segment. */
export function isValidLocale(value: string | undefined): value is Locale {
  return (
    value !== undefined &&
    (routing.locales as readonly string[]).includes(value)
  );
}
