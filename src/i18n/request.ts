import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing, isValidLocale, type Locale } from './routing';

/**
 * Static catalog map (Module 25.8 §16/§18).
 *
 * Previously this interpolated the locale into a dynamic import path. That was
 * safe, because `isValidLocale` narrows the value to 'en' | 'ur' first, but the
 * safety depended on a reader noticing that the validation happens above. An
 * explicit map makes it structural: only these two modules can ever be loaded,
 * regardless of what any future refactor does to the validation around it.
 */
const MESSAGE_CATALOGS: Record<Locale, () => Promise<{ default: unknown }>> = {
  en: () => import('../../messages/en.json'),
  ur: () => import('../../messages/ur.json'),
};

/**
 * Per-request localization config with automatic fallback to the
 * default locale for unknown/invalid locales.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isValidLocale(requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // A JSON module's literal type does not widen to next-intl's
    // index-signature message type on its own, so assert it here. The catalogs
    // satisfy the shape structurally, and their contents are covered by the
    // localization tests.
    messages: (await MESSAGE_CATALOGS[locale]()).default as AbstractIntlMessages,
  };
});
