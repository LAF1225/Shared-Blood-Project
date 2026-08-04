/** Locale-aware date helpers. */
export function formatDate(
  input: string | number | Date,
  locale = 'en',
): string {
  const date = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
