import { ArrowRight, Download, FileText } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { ResearchReport } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A research report card (spec §83). Shows the report title, type, publication
 * date, version, short summary, research domains, "View report", and a download
 * hint. It uses only accurate publication labels — it NEVER shows "Peer Reviewed"
 * or "Scientific Publication" without a real supporting process (spec §83/§84).
 */
export function ResearchReportCard({
  report,
  hasDownload,
  locale,
  t,
}: {
  report: ResearchReport;
  hasDownload: boolean;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const href = `${ROUTES.research}?report=${encodeURIComponent(report.id)}`;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2 text-xs">
        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="font-medium text-primary">{t(`reportTypes.${report.reportType}`)}</span>
      </div>
      <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{report.title[l]}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{report.subtitle[l]}</p>

      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <div>
          <dt className="inline font-medium">{t('report.published')}: </dt>
          <dd className="inline">{report.publicationDate}</dd>
        </div>
        <div>
          <dt className="inline font-medium">{t('report.version')}: </dt>
          <dd className="inline">{report.reportVersion}</dd>
        </div>
      </dl>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/80">{report.executiveSummary[l]}</p>

      <div className="mt-4 flex items-center gap-4">
        <a href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          {t('report.view')}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </a>
        {hasDownload && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            {t('report.pdfAvailable')}
          </span>
        )}
      </div>
    </article>
  );
}
