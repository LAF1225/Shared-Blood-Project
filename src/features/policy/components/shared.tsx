import { AlertTriangle, Building2 } from 'lucide-react';
import { resolveReferences } from '../data/references';
import type { PolicyLimitation, PolicyStakeholder } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Required policy limitations that MUST render with an advocacy output (spec §77).
 * A strong recommendation is never shown while its limited intervention evidence
 * is hidden elsewhere. Renders nothing when empty.
 */
export function PolicyLimitationsList({
  limitations,
  locale,
  t,
  heading,
}: {
  limitations: readonly PolicyLimitation[];
  locale: string;
  t: Translator;
  heading?: string;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (limitations.length === 0) return null;
  return (
    <section aria-labelledby="policy-limitations-heading" className="space-y-2">
      <h3 id="policy-limitations-heading" className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        <AlertTriangle className="h-5 w-5 text-accent-strong" aria-hidden="true" />
        {heading ?? t('priority.limitations')}
      </h3>
      <ul className="space-y-2">
        {limitations.map((lim) => (
          <li key={lim.id} className="rounded-xl border border-border bg-surface/60 p-4">
            <p className="text-sm font-semibold text-foreground">
              {lim.title[l]}
              <span className="ms-2 text-xs font-normal uppercase tracking-wide text-muted-foreground">
                {t(`policyLimitationTypes.${lim.limitationType}`)}
              </span>
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/85">{lim.description[l]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Relevant stakeholders (spec §26/§28). Only approved, publicly displayable
 * stakeholders reach this component. They are described as potential
 * implementation partners / relevant audiences by institutional role — never
 * assigned blame, and never implying partnership or endorsement (spec §28/§65).
 */
export function StakeholderList({
  stakeholders,
  locale,
  t,
  heading,
}: {
  stakeholders: readonly PolicyStakeholder[];
  locale: string;
  t: Translator;
  heading?: string;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (stakeholders.length === 0) return null;
  return (
    <section aria-labelledby="stakeholders-heading" className="space-y-2">
      <h3 id="stakeholders-heading" className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
        {heading ?? t('priority.stakeholders')}
      </h3>
      <p className="text-xs text-muted-foreground">{t('priority.stakeholdersNote')}</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {stakeholders.map((s) => (
          <li key={s.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">{s.name[l]}</p>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
              {t(`stakeholderTypes.${s.stakeholderType}`)}
            </p>
            <p className="mt-1 text-sm text-foreground/85">{s.recommendedRole[l]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A resolved reference list (spec §15/§93) — Module 07 ids, de-duplicated, in
 * order. Renders nothing when no references resolve. */
export function PolicyReferencesList({
  referenceIds,
  t,
}: {
  referenceIds: readonly string[];
  t: Translator;
}) {
  const refs = resolveReferences(referenceIds);
  if (refs.length === 0) return null;
  return (
    <section aria-labelledby="policy-references-heading" className="space-y-2">
      <h3 id="policy-references-heading" className="font-heading text-lg font-semibold text-foreground">
        {t('priority.references')}
      </h3>
      <ol className="space-y-1.5 text-sm text-foreground/85">
        {refs.map((ref, index) => (
          <li key={ref.id} className="flex gap-2">
            <span className="text-muted-foreground tabular-nums">{index + 1}.</span>
            <span>
              {ref.title}. <span className="text-muted-foreground">{ref.publication}</span>
              {ref.url && (
                <>
                  {' '}
                  <a href={ref.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    {t('priority.source')}
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
