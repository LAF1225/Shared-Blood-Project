import { CalendarClock, Database, Scale } from 'lucide-react';
import type { AdvocacyTimelineEvent, EvidenceSourceType } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * "Evidence Behind Our Advocacy" (spec §73). Lists the evidence types actually
 * used by approved priorities. Each type retains its Module 18 interpretation
 * boundary (survey ≠ national, fieldwork = project activity, literature =
 * external), stated here so a reader understands what each evidence type can and
 * cannot support.
 */
export function EvidenceBehind({
  evidenceTypes,
  t,
}: {
  evidenceTypes: readonly EvidenceSourceType[];
  t: Translator;
}) {
  if (evidenceTypes.length === 0) return null;
  return (
    <section aria-labelledby="evidence-behind-heading" className="space-y-3 scroll-mt-24">
      <h2 id="evidence-behind-heading" className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
        <Database className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('evidenceBehind.title')}
      </h2>
      <p className="max-w-prose text-sm text-muted-foreground">{t('evidenceBehind.intro')}</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {evidenceTypes.map((e) => (
          <li key={e} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">{t(`evidenceSourceTypes.${e}`)}</p>
            <p className="mt-0.5 text-sm text-foreground/85">{t(`evidenceBehind.${e}`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * A lightweight advocacy timeline (spec §66). Describes Shared Blood activity — it
 * does NOT prove policy influence (spec §67), and includes only approved,
 * publicly-displayable events. Renders nothing when empty.
 */
export function AdvocacyTimelineView({
  events,
  locale,
  t,
}: {
  events: readonly AdvocacyTimelineEvent[];
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (events.length === 0) return null;
  return (
    <section id="timeline" aria-labelledby="timeline-heading" className="space-y-3 scroll-mt-24">
      <h2 id="timeline-heading" className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
        <CalendarClock className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('timeline.title')}
      </h2>
      <p className="max-w-prose text-xs text-muted-foreground">{t('timeline.note')}</p>
      <ol className="space-y-2 border-s border-border ps-4">
        {events.map((e) => (
          <li key={e.id} className="relative">
            <span aria-hidden="true" className="absolute -start-[1.35rem] top-1.5 h-2 w-2 rounded-full bg-primary" />
            <p className="text-xs text-muted-foreground">{e.date} · {t(`timelineTypes.${e.eventType}`)}</p>
            <p className="text-sm font-medium text-foreground">{e.title[l]}</p>
            <p className="text-sm text-foreground/85">{e.description[l]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Empty state (spec §112). Shown when no approved priorities exist. Never generates
 * placeholder positions — this is the correct output until real, approved advocacy
 * has been produced from approved Module 18 evidence.
 */
export function PolicyEmptyState({ t }: { t: Translator }) {
  return (
    <section aria-labelledby="policy-pending-heading" className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center">
      <Scale className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
      <h2 id="policy-pending-heading" className="mt-3 font-heading text-xl font-semibold text-foreground">
        {t('empty.prioritiesTitle')}
      </h2>
      <p className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{t('empty.prioritiesBody')}</p>
    </section>
  );
}
