'use client';

import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LEARNING_PATHWAY } from '../data/pathway';

/**
 * Learning Path Navigation (spec §7, §11). Renders the suggested learning order
 * as a connected sequence of linked steps. The path is a recommendation, not a
 * gate — every step is a real link and users may jump in anywhere.
 */
export function LearningPathNav() {
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  return (
    <ol className="space-y-3">
      {LEARNING_PATHWAY.map((step, index) => (
        <li key={step.id}>
          <Link
            href={step.href}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="tnum flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="font-heading font-semibold text-foreground">{step.label[l]}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{step.description[l]}</p>
            </div>
            <ArrowRight
              className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary rtl:rotate-180"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
