'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { PRIMARY_NAV } from '@/constants/navigation';
import { isCurrentPage, resolveActiveEntryId, resolveActiveHref } from '@/lib/nav';
import { useNavigation } from '@/providers';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { SearchEntry } from '@/components/search/SearchEntry';
import { cn } from '@/lib/utils';

/**
 * Mobile navigation panel (Module 25.6 §9/§10). Renders the SAME canonical
 * hierarchy as the desktop header from PRIMARY_NAV, so both surfaces always
 * expose an identical destination set (§4).
 *
 * Home and Pakistan Map stay direct links; Learn, Genetics, Resources and About
 * become tap-to-expand accordion groups (no hover behaviour on mobile). The
 * group holding the current page starts expanded so the active destination is
 * never hidden behind a collapsed section. Search and the language switch remain
 * available below the groups.
 */
export function MobileNav() {
  const t = useTranslations('Nav');
  const common = useTranslations('Common');
  const { isMobileOpen, closeMobile } = useNavigation();
  const pathname = usePathname();
  const activeEntryId = resolveActiveEntryId(pathname, PRIMARY_NAV);
  const [expandedId, setExpandedId] = useState<string | undefined>(activeEntryId);

  // Close whenever the route changes.
  useEffect(() => {
    closeMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Keep the group containing the current page open.
  useEffect(() => {
    setExpandedId(activeEntryId);
  }, [activeEntryId]);

  if (!isMobileOpen) return null;

  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 z-40 bg-foreground/40"
        aria-hidden="true"
        onClick={closeMobile}
      />
      <nav
        aria-label={t('mobileLabel')}
        className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background p-4 shadow-lg"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
            {t('menu')}
          </span>
          <button
            type="button"
            onClick={closeMobile}
            aria-label={common('closeMenu')}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map((entry) => {
            const entryActive = activeEntryId === entry.id;

            if (!entry.children) {
              return (
                <li key={entry.id}>
                  <Link
                    href={entry.href as string}
                    onClick={closeMobile}
                    aria-current={
                      isCurrentPage(pathname, entry.href as string) ? 'page' : undefined
                    }
                    className={cn(
                      'flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors',
                      entryActive
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-foreground hover:bg-muted',
                    )}
                  >
                    {t(entry.labelKey)}
                  </Link>
                </li>
              );
            }

            const expanded = expandedId === entry.id;
            const panelId = `mobile-nav-${entry.id}`;
            const groupActiveHref = resolveActiveHref(
              pathname,
              entry.children.map((child) => child.href),
            );

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setExpandedId(expanded ? undefined : entry.id)}
                  className={cn(
                    'flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 text-base font-medium transition-colors',
                    entryActive
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-foreground hover:bg-muted',
                  )}
                >
                  <span className="text-start">{t(entry.labelKey)}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 transition-transform duration-200',
                      expanded && 'rotate-180',
                    )}
                    aria-hidden="true"
                  />
                </button>

                <ul
                  id={panelId}
                  hidden={!expanded}
                  className="mt-1 flex flex-col gap-1 border-s border-border ps-3"
                >
                  {entry.children.map((child) => {
                    const childActive = child.href === groupActiveHref;
                    return (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          onClick={closeMobile}
                          aria-current={isCurrentPage(pathname, child.href) ? 'page' : undefined}
                          className={cn(
                            'flex min-h-11 items-center rounded-lg px-3 text-base transition-colors',
                            childActive
                              ? 'bg-primary/10 font-semibold text-primary'
                              : 'text-foreground/90 hover:bg-muted',
                          )}
                        >
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 space-y-4 border-t border-border pt-4">
          <SearchEntry variant="full" />
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
