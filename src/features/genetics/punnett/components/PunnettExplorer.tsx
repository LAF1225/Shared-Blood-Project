'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Calculator, GitBranch } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { PunnettScenarioExplorer } from './PunnettScenarioExplorer';

/**
 * Standalone Punnett Square educational entry point (Module 22 §33).
 *
 * The former placeholder becomes an educational entry: introduction → choose an
 * exploration path → explore through the Inheritance Calculator OR explore an
 * educational scenario. Both paths reuse the canonical inheritance strategies and
 * the shared renderer — this route has NO independent calculation logic (§33).
 */
export function PunnettExplorer() {
  const t = useTranslations('PunnettSquare');

  return (
    <div className="space-y-8">
      <EducationalCallout title={t('intro.title')}>{t('intro.body')}</EducationalCallout>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Path A, through the calculator (§33) */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
          <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 className="font-heading text-lg font-semibold text-foreground">{t('path.calculator.title')}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{t('path.calculator.body')}</p>
          <Link
            href={`${ROUTES.genetics}/inheritance-calculator`}
            className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('path.calculator.cta')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        {/* Path B, an educational scenario (§33/§38) */}
        <div className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <GitBranch className="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 className="font-heading text-lg font-semibold text-foreground">{t('path.scenario.title')}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{t('path.scenario.body')}</p>
        </div>
      </div>

      {/* Educational scenario path (§33/§38) */}
      <PunnettScenarioExplorer />
    </div>
  );
}
