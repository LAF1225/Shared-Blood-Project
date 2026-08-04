import { FileText } from 'lucide-react';
import type { CommunityFieldworkDataset } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Fieldwork methodology & limitations (spec §38). Explains participant counting,
 * training completion, material-distribution counting, assessment/pre-post rules,
 * field-observation boundaries, impact-metric definitions, partner attribution,
 * privacy, and limitations — and acknowledges repeat attendance, estimated
 * attendance, booklets ≠ education, immediate ≠ long-term retention, contextual
 * observations, and that fieldwork locations are not epidemiological samples
 * (spec §38). Anchored at #methodology so the page and findings can link to it.
 */
export function CommunityMethodology({
  dataset,
  locale,
  t,
}: {
  dataset: CommunityFieldworkDataset | null;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';

  const staticLimitations = [
    t('methodology.limitRepeat'),
    t('methodology.limitCounting'),
    t('methodology.limitEstimated'),
    t('methodology.limitBooklets'),
    t('methodology.limitRetention'),
    t('methodology.limitObservations'),
  ];

  return (
    <section id="methodology" aria-labelledby="methodology-heading" className="space-y-4 scroll-mt-24">
      <h2
        id="methodology-heading"
        className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground"
      >
        <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('methodology.title')}
      </h2>

      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm leading-relaxed text-foreground/90">
          {dataset ? dataset.methodology[l] : t('methodology.pending')}
        </p>

        <div>
          <p className="text-sm font-semibold text-foreground">{t('methodology.limitationsTitle')}</p>
          <ul className="mt-1.5 space-y-1.5">
            {(dataset && dataset.methodologyLimitations.length > 0
              ? dataset.methodologyLimitations.map((lim) => lim[l])
              : staticLimitations
            ).map((lim, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fieldwork positioning / ethics framing (spec §5/§26). */}
      <p className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground/80">
        {t('methodology.disclaimer')}
      </p>
    </section>
  );
}
