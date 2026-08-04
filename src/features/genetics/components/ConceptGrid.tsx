'use client';

import { useLocale } from 'next-intl';
import { GENETICS_CONCEPTS } from '../data/concepts';
import { resolveGeneticsIcon } from './icons';

/**
 * Educational Introduction (spec §5, §11). A compact grid of core genetics
 * concepts — a plain-language primer before users open the interactive tools.
 * Presentational: content comes from data, only the locale is read here.
 */
export function ConceptGrid() {
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {GENETICS_CONCEPTS.map((concept) => {
        const Icon = resolveGeneticsIcon(concept.icon);
        return (
          <li
            key={concept.id}
            className="flex gap-3 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading font-semibold text-foreground">
                {concept.term[l]}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {concept.definition[l]}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
