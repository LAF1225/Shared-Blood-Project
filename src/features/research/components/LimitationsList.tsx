import { AlertTriangle } from 'lucide-react';
import type { ResearchLimitation } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Renders the limitations that MUST appear with a finding or report (spec §52).
 * Required limitations are never hidden on a separate page while conclusions show
 * elsewhere — they render inline here. Sorted by severity upstream. Renders
 * nothing when there are no limitations.
 */
export function LimitationsList({
  limitations,
  locale,
  t,
  heading,
}: {
  limitations: readonly ResearchLimitation[];
  locale: string;
  t: Translator;
  heading?: string;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (limitations.length === 0) return null;

  return (
    <section aria-labelledby="limitations-heading" className="space-y-2">
      <h3 id="limitations-heading" className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        <AlertTriangle className="h-5 w-5 text-accent-strong" aria-hidden="true" />
        {heading ?? t('finding.limitations')}
      </h3>
      <ul className="space-y-2">
        {limitations.map((lim) => (
          <li key={lim.id} className="rounded-xl border border-border bg-surface/60 p-4">
            <p className="text-sm font-semibold text-foreground">
              {lim.title[l]}
              <span className="ms-2 text-xs font-normal uppercase tracking-wide text-muted-foreground">
                {t(`limitationTypes.${lim.limitationType}`)}
              </span>
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/85">{lim.description[l]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
