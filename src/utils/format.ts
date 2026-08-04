/**
 * Formatting helpers (locale-aware). General utilities only —
 * feature-specific formatting lives with its feature.
 */
export function formatNumber(value: number, locale = 'en'): string {
  return new Intl.NumberFormat(locale === 'ur' ? 'ur-PK' : 'en-US').format(
    value,
  );
}

export function formatPercent(value: number, locale = 'en'): string {
  return new Intl.NumberFormat(locale === 'ur' ? 'ur-PK' : 'en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value);
}
