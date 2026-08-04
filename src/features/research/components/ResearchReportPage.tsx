import { ArrowLeft, Download } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { ResearchFindingsDataset, ResearchReport } from '../types';
import {
  getReportDownloads,
  getReportFindings,
  getReportLimitations,
  getReportMethodologies,
} from '../resolve';
import { FindingCard } from './FindingCard';
import { LimitationsList } from './LimitationsList';
import { ReferencesList } from './ReferencesList';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A research report page (spec §55). Renders the full public structure with
 * methodology and limitations visible inline — NEVER behind an account wall
 * (spec §55). The executive summary only summarizes approved findings and adds no
 * new statistics (spec §56); the discussion distinguishes findings from possible
 * explanations (spec §57). Downloads are approved, version-matched PDFs only, and
 * never expose raw private data (spec §67/§68).
 */
export function ResearchReportPage({
  report,
  dataset,
  locale,
  t,
}: {
  report: ResearchReport;
  dataset: ResearchFindingsDataset;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const findings = getReportFindings(dataset, report);
  const limitations = getReportLimitations(dataset, report);
  const methodologies = getReportMethodologies(dataset, report);
  const downloads = getReportDownloads(dataset, report);

  return (
    <article className="space-y-8">
      <a href={ROUTES.research} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t('report.back')}
      </a>

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t(`reportTypes.${report.reportType}`)}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {report.title[l]}
        </h1>
        <p className="text-lg text-muted-foreground">{report.subtitle[l]}</p>
        <p className="text-sm text-muted-foreground">
          {t('report.published')} {report.publicationDate} · {t('report.version')} {report.reportVersion}
        </p>
      </header>

      <Block title={t('report.executiveSummary')}>{report.executiveSummary[l]}</Block>
      <Block title={t('report.background')}>{report.background[l]}</Block>

      {report.objectives.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('report.objectives')}</h2>
          <ul className="list-disc space-y-1 ps-5 text-sm text-foreground/90">
            {report.objectives.map((obj, i) => (
              <li key={i}>{obj[l]}</li>
            ))}
          </ul>
        </section>
      )}

      {methodologies.map((m) => (
        <Block key={m.id} title={t('report.methodology')}>
          <span className="font-medium">{m.title[l]}</span>, {t(`methodTypes.${m.methodType}`)},{' '}
          {t(`sampling.${m.samplingMethod}`)}. {m.sampleDescription[l]} {m.analysisMethod[l]}
        </Block>
      ))}

      {findings.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">{t('report.keyFindings')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {findings.map((f) => (
              <FindingCard key={f.id} finding={f} locale={locale} t={t} />
            ))}
          </div>
        </section>
      )}

      <Block title={t('report.discussion')}>{report.discussion[l]}</Block>

      <LimitationsList limitations={limitations} locale={locale} t={t} heading={t('report.limitations')} />

      <Block title={t('report.projectImplications')}>{report.projectImplications[l]}</Block>
      <Block title={t('report.conclusion')}>{report.conclusion[l]}</Block>

      <ReferencesList referenceIds={report.referenceIds} t={t} />

      {downloads.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('report.download')}</h2>
          <ul className="space-y-1.5">
            {downloads.map((d) => (
              <li key={d.id}>
                <a href={d.fileReference} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t('report.downloadPdf', { lang: d.language.toUpperCase() })} ({Math.round(d.fileSize / 1024)} KB)
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
