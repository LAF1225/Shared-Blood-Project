'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { PRIMARY_NAV } from '@/constants/navigation';
import { isCurrentPage, resolveActiveEntryId } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { NavDropdown } from './NavDropdown';

/**
 * Desktop primary navigation (Module 25.6 §2/§3). Renders exactly the six
 * canonical entry points from PRIMARY_NAV:
 *
 *   Home | Learn | Genetics | Pakistan Map | Resources | About
 *
 * Home and Pakistan Map are direct destinations; Learn, Genetics, Resources and
 * About open accessible dropdowns. Active state is resolved from the same
 * canonical config, so a child page highlights its parent group (§8) using
 * weight plus background rather than colour alone.
 *
 * Shown at `lg`+; smaller viewports use the mobile accordion, which renders from
 * the same config so both expose an identical destination set (§4).
 */
export function Navigation() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const activeEntryId = resolveActiveEntryId(pathname, PRIMARY_NAV);

  return (
    <nav aria-label={t('primaryLabel')} className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {PRIMARY_NAV.map((entry) => {
          const active = activeEntryId === entry.id;

          if (entry.children) {
            return (
              <li key={entry.id}>
                <NavDropdown
                  label={t(entry.labelKey)}
                  active={active}
                  items={entry.children.map((child) => ({
                    id: child.id,
                    href: child.href,
                    label: t(child.labelKey),
                  }))}
                />
              </li>
            );
          }

          return (
            <li key={entry.id}>
              <Link
                href={entry.href as string}
                aria-current={
                  isCurrentPage(pathname, entry.href as string) ? 'page' : undefined
                }
                className={cn(
                  'inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                )}
              >
                {t(entry.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
