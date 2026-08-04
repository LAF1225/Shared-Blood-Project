import { Info } from 'lucide-react';
import { PageContainer } from '@/components/layout';
import type {
  EvidenceType,
  ResearchDomain,
  ResearchFindingsDataset,
} from '../types';
import { getRenderableDataset } from '../validate';
import {
  availableDomains,
  availableEvidenceTypes,
  availableFindingYears,
  filterFindings,
  getFeaturedFindings,
  getFindingById,
  getFindingLimitations,
  getRenderableFindings,
  getRenderableProjectLearnings,
  getRenderableQuestions,
  getRenderableReports,
  getReportById,
  getReportDownloads,
} from '../resolve';
import { FindingCard } from './FindingCard';
import { FindingDetailPage } from './FindingDetailPage';
import { ResearchReportCard } from './ResearchReportCard';
import { ResearchReportPage } from './ResearchReportPage';
import { ResearchArchive } from './ResearchArchive';
import { LimitationsList } from './LimitationsList';
import { ProjectLearningsList, ResearchEmptyState, ResearchQuestionsList } from './ResearchAux';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

const EVIDENCE_TYPES: EvidenceType[] = [
  'SURVEY_DATA',
  'FIELDWORK_METRIC',
  'FIELD_OBSERVATION',
  'TRAINING_ASSESSMENT',
  'LITERATURE_SOURCE',
  'MIXED_EVIDENCE',
];

/**
 * "Research & Findings" — the public research page (Module 18, spec §69).
 * Synchronous by design: the route resolves `t` and passes it in, keeping the
 * page out of its own Suspense boundary (Module 05 pattern). A `?finding=` or
 * `?report=` deep-link renders that detail page (spec §72/§55); otherwise it
 * renders the §69 overview flow. `?domain/evidence/year=` drive the archive.
 *
 * With no valid dataset or no approved findings, it renders the §110 empty states
 * (plus the disclaimer and methodology framing) — never placeholder findings.
 */
export function ResearchAndFindings({
  dataset,
  locale,
  t,
  selectedFindingId,
  selectedReportId,
  filters,
}: {
  dataset: ResearchFindingsDataset | null;
  locale: string;
  t: Translator;
  selectedFindingId?: string | null;
  selectedReportId?: string | null;
  filters?: { domain: ResearchDomain | 'all'; evidenceType: EvidenceType | 'all'; year: string | 'all' };
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const safe = getRenderableDataset(dataset);

  // Detail deep-links (spec §72/§55) — fully server-rendered, no client state.
  if (safe && selectedFindingId) {
    const finding = getFindingById(safe, selectedFindingId);
    if (finding) {
      return (
        <Shell>
          <FindingDetailPage finding={finding} dataset={safe} locale={locale} t={t} />
        </Shell>
      );
    }
  }
  if (safe && selectedReportId) {
    const report = getReportById(safe, selectedReportId);
    if (report) {
      return (
        <Shell>
          <ResearchReportPage report={report} dataset={safe} locale={locale} t={t} />
        </Shell>
      );
    }
  }

  const findings = safe ? getRenderableFindings(safe) : [];
  const hasData = findings.length > 0;
  const featured = safe ? getFeaturedFindings(safe) : [];
  const questions = safe ? getRenderableQuestions(safe) : [];
  const learnings = safe ? getRenderableProjectLearnings(safe) : [];
  const reports = safe ? getRenderableReports(safe) : [];

  const current = filters ?? { domain: 'all' as const, evidenceType: 'all' as const, year: 'all' as const };
  const filtered = filterFindings(findings, current);
  const options = {
    domains: availableDomains(findings),
    evidenceTypes: availableEvidenceTypes(findings),
    years: availableFindingYears(findings),
  };
  const requiredLimitations = safe
    ? safe.limitations.filter((lim) => lim.reviewStatus === 'APPROVED_FOR_PUBLICATION' && lim.publicDisplayRequired)
    : [];

  return (
    <Shell wide>
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t('kicker')}</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t('title')}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
      </header>

      {/* Introduction + public research disclaimer (spec §69/§90). */}
      <section aria-labelledby="intro-heading" id="overview" className="space-y-3 scroll-mt-24">
        <h2 id="intro-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('intro.title')}
        </h2>
        <p className="max-w-prose leading-relaxed text-foreground/90">{t('intro.body')}</p>
        <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground/80">
            {safe ? safe.publicDisclaimer[l] : t('intro.disclaimer')}
          </p>
        </div>
        {/* Evidence types explainer (transparency, spec §89). */}
        <ul className="flex flex-wrap gap-2">
          {EVIDENCE_TYPES.map((e) => (
            <li key={e} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              {t(`evidenceTypes.${e}`)}
            </li>
          ))}
        </ul>
      </section>

      <ResearchQuestionsList questions={questions} locale={locale} t={t} />

      {hasData ? (
        <>
          {featured.length > 0 && (
            <section aria-labelledby="featured-heading" id="featured" className="space-y-5 scroll-mt-24">
              <h2 id="featured-heading" className="font-heading text-2xl font-semibold text-foreground">
                {t('featured.title')}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {featured.map((f) => (
                  <FindingCard
                    key={f.id}
                    finding={f}
                    limitation={getFindingLimitations(safe!, f)[0] ?? null}
                    locale={locale}
                    t={t}
                  />
                ))}
              </div>
            </section>
          )}

          <ResearchArchive
            findings={filtered}
            options={options}
            current={current}
            locale={locale}
            t={t}
          />
        </>
      ) : (
        <ResearchEmptyState t={t} />
      )}

      <ProjectLearningsList learnings={learnings} locale={locale} t={t} />

      {/* Research reports (spec §69/§83). */}
      <section aria-labelledby="reports-heading" id="reports" className="space-y-5 scroll-mt-24">
        <h2 id="reports-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('reports.title')}
        </h2>
        {reports.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {reports.map((r) => (
              <ResearchReportCard
                key={r.id}
                report={r}
                hasDownload={getReportDownloads(safe!, r).length > 0}
                locale={locale}
                t={t}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm text-muted-foreground">
            {t('empty.reports')}
          </p>
        )}
      </section>

      {/* Methodology framing + required limitations (spec §88/§51/§52). */}
      {safe && safe.methodologies.length > 0 && (
        <section id="methodology" aria-labelledby="methodology-heading" className="space-y-3 scroll-mt-24">
          <h2 id="methodology-heading" className="font-heading text-2xl font-semibold text-foreground">
            {t('methodology.title')}
          </h2>
          <ul className="space-y-2">
            {safe.methodologies.map((m) => (
              <li key={m.id} className="rounded-xl border border-border bg-surface p-4 text-sm">
                <p className="font-semibold text-foreground">{m.title[l]}</p>
                <p className="mt-0.5 text-muted-foreground">
                  {t(`methodTypes.${m.methodType}`)} · {t(`sampling.${m.samplingMethod}`)}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{t('methodology.representativeNote')}</p>
        </section>
      )}

      {requiredLimitations.length > 0 && (
        <LimitationsList
          limitations={requiredLimitations}
          locale={locale}
          t={t}
          heading={t('methodology.limitationsTitle')}
        />
      )}
    </Shell>
  );
}

function Shell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="py-10 sm:py-14">
      <PageContainer className={wide ? 'max-w-4xl space-y-12' : 'max-w-4xl'}>{children}</PageContainer>
    </div>
  );
}
