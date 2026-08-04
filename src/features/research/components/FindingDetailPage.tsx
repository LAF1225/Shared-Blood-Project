import { ArrowLeft, Ban, BarChart3, FlaskConical, Lightbulb, Microscope } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import type { ResearchFinding, ResearchFindingsDataset } from '../types';
import {
  getFindingLimitations,
  getFindingMethodology,
  getFindingVisualizations,
  getRelatedFindings,
  getReportById,
} from '../resolve';
import { ResearchChart } from './ResearchChart';
import { LimitationsList } from './LimitationsList';
import { ReferencesList } from './ReferencesList';

type Lang = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A finding detail page (spec §72). Renders the full structure including the CORE
 * "What This Does Not Show" boundary (spec §73), the observed result separated
 * from the approved interpretation and the optional possible explanation
 * (spec §57/§74), the evidence source and method, the required limitations inline
 * (spec §52), how the finding influenced Shared Blood (spec §58), related findings
 * (which must not imply causation, spec §82), references, and the related report.
 */
export function FindingDetailPage({
  finding,
  dataset,
  locale,
  t,
}: {
  finding: ResearchFinding;
  dataset: ResearchFindingsDataset;
  locale: string;
  t: Translator;
}) {
  const l: Lang = locale === 'ur' ? 'ur' : 'en';
  const limitations = getFindingLimitations(dataset, finding);
  const visualizations = getFindingVisualizations(dataset, finding);
  const related = getRelatedFindings(dataset, finding);
  const methodology = getFindingMethodology(dataset, finding);
  const report = finding.reportId ? getReportById(dataset, finding.reportId) : null;
  const datasetVersion = finding.sourceDatasetIds
    .map((id) => dataset.sourceRegistry.datasetVersions[id])
    .filter(Boolean)[0];
  const internalSource = dataset.internalSources.find((s) => finding.sourceDatasetIds.includes(s.datasetId));

  return (
    <article className="space-y-8">
      <a
        href={ROUTES.research}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t('finding.back')}
      </a>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {t(`evidenceTypes.${finding.evidenceType}`)}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
            {t(`conclusion.${finding.conclusionStatus}`)}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
            {t(`confidence.${finding.confidenceClassification}`)}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
            {t(`scope.${finding.geographicScope}`)}
          </span>
        </div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {finding.title[l]}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{finding.summary[l]}</p>
        {finding.statistic && (
          <p className="font-heading text-4xl font-semibold text-primary">{finding.statistic.displayValue[l]}</p>
        )}
      </header>

      {visualizations.map((viz) => (
        <ResearchChart key={viz.id} viz={viz} locale={locale} t={t} />
      ))}

      <Section icon={<Microscope className="h-5 w-5 text-primary" aria-hidden="true" />} title={t('finding.whatWeStudied')}>
        <p>{finding.calculationMethod[l]}</p>
        {finding.diseaseIds.length > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            {t('finding.topics')}: {finding.diseaseIds.map((id) => getDiseaseBySlug(id)?.name[l] ?? id).join(', ')}
          </p>
        )}
      </Section>

      <Section icon={<FlaskConical className="h-5 w-5 text-primary" aria-hidden="true" />} title={t('finding.evidenceSource')}>
        <p>{t(`evidenceTypes.${finding.evidenceType}`)}</p>
        {internalSource && (
          <p className="mt-1 text-sm text-muted-foreground">
            {internalSource.sourceTitle[l]} · {t('finding.datasetVersion')} {datasetVersion ?? internalSource.datasetVersion} · {t('finding.moduleSource', { id: internalSource.moduleId })}
          </p>
        )}
        {methodology && (
          <p className="mt-1 text-sm">
            <span className="text-muted-foreground">{t('finding.method')}: </span>
            {methodology.title[l]}, {t(`methodTypes.${methodology.methodType}`)}, {t(`sampling.${methodology.samplingMethod}`)}
          </p>
        )}
      </Section>

      <Section icon={<BarChart3 className="h-5 w-5 text-secondary" aria-hidden="true" />} title={t('finding.whatWeFound')}>
        <p>{finding.interpretation.observedResult[l]}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium">{t('finding.context')}: </span>
          {finding.sampleContext[l]}
        </p>
      </Section>

      <Section icon={<Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />} title={t('finding.howWeInterpret')}>
        <p>{finding.interpretation.approvedInterpretation[l]}</p>
        {finding.interpretation.possibleExplanation && (
          <p className="mt-2 rounded-xl border border-border bg-surface/60 p-3 text-sm text-foreground/85">
            <span className="font-medium">{t('finding.possibleExplanation')}: </span>
            {finding.interpretation.possibleExplanation[l]}
          </p>
        )}
      </Section>

      {/* CORE, What This Does Not Show (spec §73). */}
      <section className="space-y-2 rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
          <Ban className="h-5 w-5 text-accent-strong" aria-hidden="true" />
          {t('finding.doesNotShow')}
        </h2>
        <p className="text-sm leading-relaxed text-foreground/90">{finding.interpretation.doesNotShow[l]}</p>
      </section>

      <LimitationsList limitations={limitations} locale={locale} t={t} />

      {finding.interpretation.projectImplication && (
        <Section title={t('finding.howInfluenced')}>
          <p>{finding.interpretation.projectImplication[l]}</p>
        </Section>
      )}

      {related.length > 0 && (
        <section className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-foreground">{t('finding.related')}</h3>
          <p className="text-xs text-muted-foreground">{t('finding.relatedNote')}</p>
          <ul className="space-y-1.5">
            {related.map((rf) => (
              <li key={rf.id}>
                <a
                  href={`${ROUTES.research}?finding=${encodeURIComponent(rf.id)}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {rf.title[l]}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ReferencesList referenceIds={finding.referenceIds} t={t} />

      {report && (
        <p className="text-sm">
          <span className="text-muted-foreground">{t('finding.relatedReport')}: </span>
          <a href={`${ROUTES.research}?report=${encodeURIComponent(report.id)}`} className="font-medium text-primary hover:underline">
            {report.title[l]}
          </a>
        </p>
      )}
    </article>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-1.5">
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        {icon}
        {title}
      </h2>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}
