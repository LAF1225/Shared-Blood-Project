'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

/**
 * Global search entry point (spec §12). Opens a lightweight search interface,
 * accepts a query, and redirects to the search results route. Actual search
 * (indexing, results) is an explicit exclusion for this module (spec §21) and
 * arrives in a future module — this only provides the entry point.
 */
export function SearchEntry({
  className,
  variant = 'icon',
}: {
  className?: string;
  /** `icon` for the header, `full` for the mobile menu (labelled row). */
  variant?: 'icon' | 'full';
}) {
  const t = useTranslations('Search');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();

  // Focus the input when the dialog opens; restore scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    setOpen(false);
    router.push(
      trimmed
        ? `${ROUTES.search}?q=${encodeURIComponent(trimmed)}`
        : ROUTES.search,
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t('open')}
        className={cn(
          variant === 'icon'
            ? 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-foreground hover:bg-muted'
            : 'flex min-h-11 w-full items-center gap-3 rounded-lg border border-border px-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
          'cursor-pointer transition-colors',
          className,
        )}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
        {variant === 'full' && <span>{t('open')}</span>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${dialogId}-title`}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl rounded-2xl border border-border bg-surface p-5 shadow-card-hover">
            <div className="mb-3 flex items-center justify-between">
              <h2
                id={`${dialogId}-title`}
                className="font-heading text-lg font-semibold text-foreground"
              >
                {t('title')}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('close')}
                className="inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={submit} role="search">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-primary/50">
                <Search
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('placeholder')}
                  aria-label={t('title')}
                  className="min-h-11 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{t('hint')}</p>
                <button
                  type="submit"
                  className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
