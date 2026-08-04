/** Shared primitive types used across features. */
export type Locale = 'en' | 'ur';

export interface LocalizedText {
  en: string;
  ur: string;
}

/** Generic service response envelope (placeholder for future API layer). */
export interface ServiceResult<T> {
  data: T;
  error: string | null;
}

export type ID = string;
