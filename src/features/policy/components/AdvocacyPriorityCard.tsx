import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { AdvocacyPriority, PolicyLimitation } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * An advocacy priority card (spec §70). Shows the priority title, short summary,
 * policy domain, evidence-type summary, recommended-action summary, and a "View
 * priority" link — plus the key evidence boundary where a position could be
 * overinterpreted. It does NOT reduce complex advocacy to an unsupported slogan
 * (spec §70). Links via a `?priority=` server-side deep-link.
 */
export function AdvocacyPriorityCard({
  priority,
  evidenceTypeLabel,
  limitation,
  locale,
  t,
}: {
  priority: AdvocacyPriority;
  evidenceTypeLabel: string;
  limitation?: PolicyLimitation | null;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const href = `${ROUTES.policy}?priority=${encodeURIComponent(priority.id)}`;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
          {t(`priorityTypes.${priority.priorityType}`)}
        </span>
        {priority.policyDomainIds[0] && (
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
            {t(`domains.${priority.policyDomainIds[0]}`)}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{priority.title[l]}</h3>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-foreground/80">{priority.summary[l]}</p>

      <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
        <div>
          <dt className="inline font-medium">{t('priority.evidence')}: </dt>
          <dd className="inline">{evidenceTypeLabel}</dd>
        </div>
        <div>
          <dt className="inline font-medium">{t('priority.action')}: </dt>
          <dd className="inline line-clamp-1">{priority.recommendedAction[l]}</dd>
        </div>
      </dl>

      {limitation && (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-medium">{t('priority.boundary')}: </span>
          {limitation.title[l]}
        </p>
      )}

      <a href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        {t('priority.view')}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </a>
    </article>
  );
}
