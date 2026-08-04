'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { buildCrumbs } from '@/lib/nav';
import { PageContainer } from './PageContainer';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb navigation (spec §8). Automatically reflects the current route,
 * always starting at Home and ending at the current page. Self-hides on the
 * homepage. Labels resolve from the same translations used by the nav, so
 * "Disease Library › Beta Thalassemia" stays consistent and localized.
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations();
  const crumbs = buildCrumbs(pathname);

  // No breadcrumbs on the homepage (nothing to orient against).
  if (crumbs.length === 0) return null;

  const label = (key: string | null, fallback: string) =>
    key && t.has(key) ? t(key) : fallback;

  return (
    <nav
      aria-label={t('Nav.breadcrumbLabel')}
      className="border-b border-border/60 bg-surface/60"
    >
      <PageContainer className="py-3">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
          {crumbs.map((crumb, index) => {
            const text = label(crumb.labelKey, crumb.fallback);
            return (
              <li key={crumb.href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-muted-foreground/60 rtl:rotate-180"
                    aria-hidden="true"
                  />
                )}
                {crumb.current ? (
                  <span
                    aria-current="page"
                    className="font-medium text-foreground"
                  >
                    {text}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn(
                      'rounded text-muted-foreground transition-colors hover:text-foreground hover:underline',
                    )}
                  >
                    {text}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </PageContainer>
    </nav>
  );
}
