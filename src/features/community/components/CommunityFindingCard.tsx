import { BarChart3, Lightbulb } from 'lucide-react';
import type { CommunityImpactFinding } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A community impact finding card (spec §43). Presents the statistic and finding,
 * and SEPARATES "What we found" from an optional "What this may suggest"
 * (spec §43/§44) — the two are never merged, and interpretations are never
 * auto-generated. Only approved findings reach this component (resolved upstream).
 */
export function CommunityFindingCard({
  finding,
  locale,
  t,
}: {
  finding: CommunityImpactFinding;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';

  return (
    <article className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
      <p className="font-heading text-2xl font-semibold tracking-tight text-primary">{finding.statistic[l]}</p>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{finding.title[l]}</h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
          {t(`findingTypes.${finding.findingType}`)}
        </p>
      </div>

      <div className="rounded-xl border border-secondary/25 bg-secondary/5 p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <BarChart3 className="h-4 w-4 text-secondary" aria-hidden="true" />
          {t('finding.whatWeFound')}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/90">{finding.findingText[l]}</p>
      </div>

      {finding.interpretation && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Lightbulb className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('finding.whatItMaySuggest')}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{finding.interpretation[l]}</p>
        </div>
      )}

      {finding.limitationNote && (
        <p className="text-xs text-muted-foreground">{finding.limitationNote[l]}</p>
      )}
    </article>
  );
}
