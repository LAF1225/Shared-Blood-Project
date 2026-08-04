/** Supported languages and their display metadata. */
export const LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' as const },
  { code: 'ur', label: 'اردو', dir: 'rtl' as const },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

/** Text direction for a given locale. */
export function getDirection(code: string): 'ltr' | 'rtl' {
  return code === 'ur' ? 'rtl' : 'ltr';
}
