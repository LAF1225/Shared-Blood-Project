'use client';

import { useLocale } from 'next-intl';
import { Languages } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LANGUAGES } from '@/constants/languages';
import { performLocaleSwitch } from '@/lib/localeSwitch';
import { cn } from '@/lib/utils';

/**
 * Global language switcher. Preserves the current path while swapping locale.
 * Part of the Module 01 localization framework.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Module 25.7: the transition (route + cache invalidation) lives in
   * `performLocaleSwitch` so it is unit-tested and cannot regress silently.
   */
  const switchTo = (next: string) => {
    // `window.location.search` is read inside the handler rather than via
    // `useSearchParams()` on purpose: the switcher sits in the global header, and
    // subscribing to search params at render time would opt every statically
    // generated page out of static rendering.
    const search =
      typeof window === 'undefined' ? undefined : window.location.search;
    performLocaleSwitch(router, pathname, locale, next, search);
  };

  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      role="group"
      aria-label="Language"
    >
      <Languages className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          lang={lang.code}
          aria-pressed={locale === lang.code}
          onClick={() => switchTo(lang.code)}
          className={cn(
            'min-h-9 cursor-pointer rounded-lg px-2 text-sm font-medium transition-colors',
            locale === lang.code
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
