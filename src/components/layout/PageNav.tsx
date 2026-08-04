'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export interface PageNavSection {
  /** Must match the `id` of the section heading it links to. */
  id: string;
  label: string;
}

/**
 * Internal / in-page navigation framework (spec §10). A reusable "on this page"
 * jump list that long pages (disease pages, parent resources, learning
 * booklets, future reports) mount to let users move between major sections.
 *
 * Content modules pass their own section list; this component owns the
 * scroll-spy active state and accessible markup. It is deliberately
 * content-agnostic so it works everywhere without redesign (spec §19).
 */
export function PageNav({
  sections,
  title,
  className,
}: {
  sections: PageNavSection[];
  title?: string;
  className?: string;
}) {
  const t = useTranslations('Nav');
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null,
  );

  useEffect(() => {
    if (sections.length === 0) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias toward the heading area so the active item tracks the section the
      // reader is actually looking at, not one scrolled off the top.
      { rootMargin: '-96px 0px -66% 0px', threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label={title ?? t('menu')}
      className={cn('text-sm', className)}
    >
      {title && (
        <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-kicker text-accent-strong">
          {title}
        </p>
      )}
      <ul className="space-y-1 border-s border-border ps-3">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'block rounded py-1 transition-colors',
                  active
                    ? 'font-medium text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
