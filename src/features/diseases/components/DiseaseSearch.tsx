'use client';

import { useTranslations } from 'next-intl';
import { Search as SearchIcon, X } from 'lucide-react';

/**
 * Disease Library search field (spec §9). Controlled + dynamic: every keystroke
 * updates results with no page reload. RTL-aware via logical properties, so the
 * icon and clear button sit correctly in both English and Urdu.
 */
export function DiseaseSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations('DiseaseLibrary');

  return (
    <div className="relative">
      <SearchIcon
        className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t('searchLabel')}
        placeholder={t('searchPlaceholder')}
        className="min-h-12 w-full rounded-xl border border-border bg-surface py-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 ltr:pl-11 ltr:pr-11 rtl:pr-11 rtl:pl-11"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t('clearSearch')}
          className="absolute top-1/2 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground ltr:right-2 rtl:left-2"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
