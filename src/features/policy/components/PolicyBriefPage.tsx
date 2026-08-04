import { ArrowLeft, Download } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { PolicyAdvocacyDataset, PolicyBrief } from '../types';
import { getBriefDownloads, getBriefLimitations, getBriefPriorities } from '../resolve';
import { AdvocacyPriorityCard } from './AdvocacyPriorityCard';
import { PolicyLimitationsList, PolicyReferencesList } from './shared';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A policy/advocacy brief page (spec §49). Renders the full public structure with
 * evidence, evidence boundaries, the Shared Blood position, recommendations,
 * limitations, and references visible inline — never behind an account wall. The
 * executive summary only summarizes approved content and introduces no new policy
 * demands (spec §50). Downloads are approved, version-matched PDFs with no private
 * data (spec §83/§84).
 */
export function PolicyBriefPage({
  brief,
  dataset,
  locale,
  t,
}: {
  brief: PolicyBrief;
  dataset: PolicyAdvocacyDataset;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const priorities = getBriefPriorities(dataset, brief);
  const limitations = getBriefLimitations(dataset, brief);
  const downloads = getBriefDownloads(dataset, brief);

  return (
    <article className="space-y-8">
      <a href={ROUTES.policy} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t('brief.back')}
      </a>

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t(`briefTypes.${brief.briefType}`)}</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{brief.title[l]}</h1>
        <p className="text-lg text-muted-foreground">{brief.subtitle[l]}</p>
        <p className="text-sm text-muted-foreground">
          {t('brief.published')} {brief.publicationDate} · {t('brief.version')} {brief.version}
        </p>
      </header>

      <Block title={t('brief.executiveSummary')}>{brief.executiveSummary[l]}</Block>
      <Block title={t('brief.issue')}>{brief.issueOverview[l]}</Block>
      <Block title={t('brief.evidence')}>{brief.evidenceSummary[l]}</Block>
      <Block title={t('brief.policyContext')}>{brief.policyContext[l]}</Block>

      {priorities.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">{t('brief.position')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {priorities.map((p) => (
              <AdvocacyPriorityCard key={p.id} priority={p} evidenceTypeLabel={t('brief.reviewedEvidence')} locale={locale} t={t} />
            ))}
          </div>
        </section>
      )}

      <Block title={t('brief.recommendations')}>{brief.recommendationsSummary[l]}</Block>
      <Block title={t('brief.implementation')}>{brief.implementationConsiderations[l]}</Block>
      <Block title={t('brief.ethics')}>{brief.ethicalConsiderations[l]}</Block>

      <PolicyLimitationsList
        limitations={limitations}
        locale={locale}
        t={t}
        heading={t('brief.limitations')}
      />
      <p className="text-sm leading-relaxed text-foreground/90">{brief.limitationsSummary[l]}</p>

      <Block title={t('brief.conclusion')}>{brief.conclusion[l]}</Block>

      <PolicyReferencesList referenceIds={brief.referenceIds} t={t} />

      {downloads.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('brief.download')}</h2>
          <ul className="space-y-1.5">
            {downloads.map((d) => (
              <li key={d.id}>
                <a href={d.fileReference} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t('brief.downloadPdf', { lang: d.language.toUpperCase() })} ({Math.round(d.fileSize / 1024)} KB)
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm leading-relaxed text-foreground/90">{children}</p>
    </section>
  );
}
