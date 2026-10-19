/** Global application configuration. */
export const SITE_CONFIG = {
  name: 'Shared Blood',
  tagline:
    'Understanding Genetics. Supporting Families. Building Healthier Futures.',
  description:
    'An educational platform improving awareness of inherited genetic disorders in Pakistan.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locales: ['en', 'ur'] as const,
  defaultLocale: 'en' as const,
} as const;

/** Third-party pages the site links to (opened in a new tab, never embedded). */
export const EXTERNAL_LINKS = {
  /** Shared Blood's awareness survey, hosted on Google Forms. */
  awarenessSurvey: 'https://forms.gle/rAc7vv4CNUJHY3qr7',
} as const;
