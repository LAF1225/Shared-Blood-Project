import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { ResearchFinding, ResearchLimitation } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A finding card (spec §71). Shows the finding title, primary statistic (if
 * applicable), summary, evidence type, sample/activity context, one relevant
 * limitation, research domain, and a "View finding" link. It NEVER displays a
 * potentially misleading statistic without its context (spec §71) — the sample
 * context and a limitation sit beside every statistic. Links via a `?finding=`
 * server-side deep-link.
 */
export function FindingCard({
  finding,
  limitation,
  locale,
  t,
}: {
  finding: ResearchFinding;
  limitation?: ResearchLimitation | null;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const href = `${ROUTES.research}?finding=${encodeURIComponent(finding.id)}`;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
          {t(`evidenceTypes.${finding.evidenceType}`)}
        </span>
        {finding.researchDomainIds[0] && (
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
            {t(`domains.${finding.researchDomainIds[0]}`)}
          </span>
        )}
        <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
          {t(`conclusion.${finding.conclusionStatus}`)}
        </span>
      </div>

      {finding.statistic && (
        <p className="mt-3 font-heading text-3xl font-semibold tracking-tight text-primary">
          {finding.statistic.displayValue[l]}
        </p>
      )}

      <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{finding.title[l]}</h3>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-foreground/80">{finding.summary[l]}</p>

      <p className="mt-3 text-xs text-muted-foreground">
        <span className="font-medium">{t('finding.context')}: </span>
        {finding.sampleContext[l]}
      </p>
      {limitation && (
        <p className="mt-1 text-xs text-muted-foreground">
          <span className="font-medium">{t('finding.keyLimitation')}: </span>
          {limitation.title[l]}
        </p>
      )}

      <a
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {t('finding.view')}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </a>
    </article>
  );
}
