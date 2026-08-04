'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { PUNNETT_SCENARIOS, resolvePunnettScenario } from '../scenarios';
import { PunnettSquare } from '../PunnettSquare';

/**
 * Educational Punnett scenario explorer (Module 22 §33/§38).
 *
 * Shared by the standalone Punnett route and the Relationship Explorer's
 * educational transition. The user picks an EXPLICIT hypothetical parent pairing;
 * it resolves through the canonical inheritance engine and renders the shared
 * `PunnettSquare`. It never infers genotype from anything (§34/§38) and offers no
 * hypermobile-EDS scenario (§32/§38). All state is local and transient (§40).
 */
export function PunnettScenarioExplorer() {
  const t = useTranslations('PunnettSquare');
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const resolved = resolvePunnettScenario(scenarioId);

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="font-heading text-base font-semibold text-foreground">
          {t('scenario.legend')}
        </legend>
        <p className="mt-1 text-sm text-muted-foreground">{t('scenario.help')}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {PUNNETT_SCENARIOS.map((scenario) => {
            const selected = scenarioId === scenario.id;
            const id = `scenario-${scenario.id}`;
            return (
              <label
                key={scenario.id}
                htmlFor={id}
                className={cn(
                  'flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm transition-colors',
                  'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1',
                  selected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-surface hover:border-primary/40',
                )}
              >
                <span className="font-medium text-foreground">
                  {t(`scenarios.${scenario.labelKey}.label`)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t(`scenarios.${scenario.labelKey}.description`)}
                </span>
                <input
                  id={id}
                  type="radio"
                  name="punnett-scenario"
                  value={scenario.id}
                  checked={selected}
                  onChange={() => setScenarioId(scenario.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      {resolved && (
        <section aria-live="polite" className="space-y-4 rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
            {t('scenario.hypotheticalNote')}
          </p>
          <PunnettSquare
            calculation={resolved.calculation}
            outcomeLabel={(kind) => t(`outcomes.${kind}.label`)}
            outcomeExplanation={(kind) => t(`outcomes.${kind}.explanation`)}
            summaryHeading={t('summaryHeading')}
            parentOneLabel={t('viz.parentOne')}
            parentTwoLabel={t('viz.parentTwo')}
            caption={t('viz.caption')}
            textEquivalentLabel={t('viz.textEquivalent')}
          />
          <p className="rounded-xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
            {t('scenario.disclaimer')}
          </p>
        </section>
      )}
    </div>
  );
}
