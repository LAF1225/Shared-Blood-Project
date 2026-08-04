import { FileText } from 'lucide-react';
import type { SurveyAggregateDataset } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Methodology & limitations (spec §51/§52/§53/§54/§60). Documents the sampling
 * method accurately (never "random" unless it was, spec §52), the privacy /
 * anonymity terminology matching the real process (spec §54), the limitations,
 * and the public research disclaimer (spec §60). Anchored at #methodology so
 * finding cards can link to it.
 */
export function MethodologySection({
  dataset,
  locale,
  t,
}: {
  dataset: SurveyAggregateDataset | null;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';

  return (
    <section id="methodology" aria-labelledby="methodology-heading" className="space-y-4 scroll-mt-24">
      <h2 id="methodology-heading" className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
        <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('methodology.title')}
      </h2>

      <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
        <Block title={t('methodology.samplingTitle')}>
          {dataset ? dataset.samplingMethod[l] : t('methodology.samplingPending')}
        </Block>
        <Block title={t('methodology.privacyTitle')}>
          {dataset ? dataset.privacyStatement[l] : t('methodology.privacyPending')}
        </Block>
        <Block title={t('methodology.eligibilityTitle')}>{t('methodology.eligibilityBody')}</Block>

        {dataset && dataset.limitations.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-foreground">{t('methodology.limitationsTitle')}</p>
            <ul className="mt-1.5 space-y-1.5">
              {dataset.limitations.map((lim, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <span>{lim[l]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Public research disclaimer (spec §60). */}
      <p className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground/80">
        {t('methodology.disclaimer')}
      </p>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
