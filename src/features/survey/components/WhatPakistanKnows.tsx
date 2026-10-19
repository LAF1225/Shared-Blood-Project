import { PageContainer } from '@/components/layout';
import type { SurveyAggregateDataset, SurveyFindingRecord } from '../types';
import { getRenderableDataset } from '../validate';
import { getRenderableFindings } from '../resolve';
import { SurveyOverview } from './SurveyOverview';
import { FindingCard } from './FindingCard';
import { DiseaseAwarenessSection } from './DiseaseAwarenessSection';
import { AttitudesSection } from './AttitudesSection';
import { CityComparison } from './CityComparison';
import { MethodologySection } from './MethodologySection';
import { SurveyFindingsEmptyState } from './SurveyFindingsEmptyState';
import { TakeTheSurvey } from './TakeTheSurvey';
import type { SurveyFormInfo } from '../data/form';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * "What Pakistan Knows" — the public survey findings page (Module 16, spec §3/§48).
 *
 * Synchronous by design: the route resolves the translator `t` and passes it in,
 * keeping the page out of its own Suspense boundary (the established Module 05
 * pattern). Follows the §48 flow: Overview → Key Findings → Disease Awareness →
 * Attitudes → City Comparison → Methodology. City comparison never dominates.
 *
 * If the dataset is absent/invalid or no approved findings exist, only the
 * overview, the §69 "findings being prepared" state, and the methodology framing
 * render — never draft or invented statistics (spec §44/§69).
 */
export function WhatPakistanKnows({
  dataset,
  findings,
  locale,
  t,
  form,
}: {
  dataset: SurveyAggregateDataset | null;
  findings: readonly SurveyFindingRecord[];
  /** The live survey to invite people to; omitted on the preview route. */
  form?: SurveyFormInfo;
  locale: string;
  t: Translator;
}) {
  const safeDataset = getRenderableDataset(dataset);
  const approved = getRenderableFindings(findings);
  const hasData = safeDataset !== null && approved.length > 0;

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-4xl space-y-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t('kicker')}</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </header>

        {form && <TakeTheSurvey form={form} locale={locale} t={t} />}

        <SurveyOverview dataset={safeDataset} locale={locale} t={t} />

        {hasData ? (
          <>
            <section aria-labelledby="findings-heading" className="space-y-5 scroll-mt-24" id="key-findings">
              <h2 id="findings-heading" className="font-heading text-2xl font-semibold text-foreground">
                {t('findings.title')}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {approved.map((finding) => (
                  <FindingCard key={finding.id} finding={finding} locale={locale} t={t} />
                ))}
              </div>
            </section>

            <DiseaseAwarenessSection dataset={safeDataset!} locale={locale} t={t} />
            <AttitudesSection dataset={safeDataset!} locale={locale} t={t} />
            <CityComparison dataset={safeDataset!} locale={locale} t={t} />
          </>
        ) : (
          <SurveyFindingsEmptyState t={t} />
        )}

        <MethodologySection dataset={safeDataset} locale={locale} t={t} />
      </PageContainer>
    </div>
  );
}
