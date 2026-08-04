'use client';

import { useTranslations } from 'next-intl';
import { Library, GraduationCap, ClipboardList, Map, Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';

/**
 * Platform navigation (spec §10). The Explorer must never isolate users from the
 * rest of the platform, so every genetics surface offers links back out to the
 * Disease Library, Parent Learning Centre, Survey, Pakistan Map, and Homepage.
 * Labels resolve from the shared `Nav` namespace.
 */
const LINKS: { id: string; href: string; labelKey: string; icon: LucideIcon }[] = [
  { id: 'diseases', href: ROUTES.diseases, labelKey: 'diseases', icon: Library },
  { id: 'resources', href: ROUTES.resources, labelKey: 'resources', icon: GraduationCap },
  { id: 'survey', href: ROUTES.survey, labelKey: 'survey', icon: ClipboardList },
  { id: 'map', href: ROUTES.map, labelKey: 'map', icon: Map },
  { id: 'home', href: ROUTES.home, labelKey: 'home', icon: Home },
];

export function PlatformLinks() {
  const t = useTranslations('Nav');

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.id}>
            <Link
              href={link.href}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-medium text-foreground">{t(link.labelKey)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
