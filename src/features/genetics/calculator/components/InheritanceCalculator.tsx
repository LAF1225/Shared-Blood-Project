'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  AlertTriangle,
  Users,
  ShieldCheck,
  RotateCcw,
  Calculator as CalculatorIcon,
  Info,
  ArrowRight,
  Ban,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getCalculatorDiseases, resolveTarget } from '../metadata';
import { calculate } from '../engine';
import {
  STRATEGY_STATUS_OPTIONS,
  type OutcomeKind,
  type ParentStatus,
  type SupportedCalculation,
} from '../strategy';
import { validateSelections, type ValidationCode } from '../validation';
import { PunnettSquare } from '../../punnett';

type ErrorCode = ValidationCode | 'combination-unsupported';

/** Icon + tone per outcome — colour is never the only signal (v2 §34). */
const OUTCOME_VISUAL: Record<OutcomeKind, { Icon: LucideIcon; tone: string; bar: string }> = {
  affected: { Icon: AlertTriangle, tone: 'border-danger/30 bg-danger/5', bar: 'bg-danger' },
  carrier: { Icon: Users, tone: 'border-accent-strong/30 bg-accent/10', bar: 'bg-accent-strong' },
  unaffected: { Icon: ShieldCheck, tone: 'border-secondary/30 bg-secondary/5', bar: 'bg-secondary' },
  'inherits-variant': { Icon: AlertTriangle, tone: 'border-danger/30 bg-danger/5', bar: 'bg-danger' },
  'not-inherited': { Icon: ShieldCheck, tone: 'border-secondary/30 bg-secondary/5', bar: 'bg-secondary' },
};

/**
 * Inheritance Probability Calculator (Module 09 v2). A multi-strategy, fully
 * client-side educational tool: the strategy is resolved from structured disease
 * metadata, inputs adapt to the strategy, and unsupported conditions are refused
 * rather than estimated (v2 §3/§17/§27). All maths lives in the pure, separately
 * tested engines; this component only orchestrates UI + state (v2 §31/§38).
 */
export function InheritanceCalculator({
  initialDiseaseSlug,
}: { initialDiseaseSlug?: string } = {}) {
  const t = useTranslations('InheritanceCalculator');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  const diseases = useMemo(() => getCalculatorDiseases(), []);

  // Educational disease preselection from `?disease=` (Module 24 §46): only a
  // calculator-supported disease preselects; parent statuses are NEVER
  // preselected and disease/subtype changes still clear stale results.
  const [diseaseSlug, setDiseaseSlug] = useState<string | null>(
    initialDiseaseSlug && diseases.some((d) => d.slug === initialDiseaseSlug)
      ? initialDiseaseSlug
      : null,
  );
  const [subtypeId, setSubtypeId] = useState<string | null>(null);
  const [statusOne, setStatusOne] = useState<ParentStatus | null>(null);
  const [statusTwo, setStatusTwo] = useState<ParentStatus | null>(null);
  const [calculation, setCalculation] = useState<SupportedCalculation | null>(null);
  const [error, setError] = useState<ErrorCode | null>(null);

  // Derived, metadata-driven state (v2 §7/§17). No disease-name string matching.
  const selectedDisease = diseases.find((disease) => disease.slug === diseaseSlug) ?? null;
  const requiresSubtype = Boolean(selectedDisease?.calculator?.requiresSubtype);
  const subtypes = selectedDisease?.calculator?.subtypes ?? [];

  const resolution = resolveTarget(diseaseSlug, subtypeId);
  const target = resolution.kind === 'ok' ? resolution.target : null;
  const strategy = target?.strategy ?? null;
  const strategyStatuses = strategy ? STRATEGY_STATUS_OPTIONS[strategy] : [];
  const isUnsupported = strategy === 'unsupported';
  const showParentInputs = Boolean(target) && !isUnsupported;

  const clearResult = () => {
    setCalculation(null);
    setError(null);
  };

  // Changing the disease may change strategy → clear subtype + statuses (v2 §19/§30).
  const changeDisease = (slug: string) => {
    setDiseaseSlug(slug);
    setSubtypeId(null);
    setStatusOne(null);
    setStatusTwo(null);
    clearResult();
  };

  // Changing the subtype changes strategy → clear incompatible statuses (v2 §19/§30).
  const changeSubtype = (id: string) => {
    setSubtypeId(id);
    setStatusOne(null);
    setStatusTwo(null);
    clearResult();
  };

  const handleCalculate = () => {
    const code = validateSelections({ resolution, statusOne, statusTwo, strategyStatuses });
    if (code) {
      setError(code);
      setCalculation(null);
      return;
    }
    const result = calculate(strategy!, statusOne!, statusTwo!);
    if (!result.supported) {
      // e.g. dominant Affected × Affected — not modeled (v2 §16).
      setError('combination-unsupported');
      setCalculation(null);
      return;
    }
    setCalculation(result);
    setError(null);
  };

  const handleReset = () => {
    setDiseaseSlug(null);
    setSubtypeId(null);
    setStatusOne(null);
    setStatusTwo(null);
    setCalculation(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Disclaimer, available before calculation (v2 §16/§34) */}
      <EducationalCallout title={t('disclaimer.title')}>
        {t('disclaimer.body')}
      </EducationalCallout>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          handleCalculate();
        }}
        className="space-y-8"
      >
        {/* Input 1, Condition (v2 §7) */}
        <RadioGroup
          legend={t('disease.legend')}
          help={t('disease.help')}
          name="disease"
          value={diseaseSlug}
          onChange={changeDisease}
          options={diseases.map((disease) => ({
            value: disease.slug,
            label: disease.name[l],
          }))}
        />

        {/* Input 1b, Subtype, when the condition is subtype-driven (v2 §8/§10) */}
        {requiresSubtype && (
          <RadioGroup
            legend={t('subtype.legend')}
            help={t('subtype.help')}
            name="subtype"
            value={subtypeId}
            onChange={changeSubtype}
            options={subtypes.map((subtype) => ({
              value: subtype.id,
              label: subtype.name[l],
            }))}
          />
        )}

        {/* Resolved inheritance pattern (v2 §4/§23) */}
        {target && !isUnsupported && strategy && (
          <p className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
            <span className="font-semibold text-foreground">{t('patternLabel')}:</span>
            <span className="text-muted-foreground">{t(`strategy.${strategy}`)}</span>
          </p>
        )}

        {/* Unsupported condition, intentional scientific state, not an error (v2 §9/§27) */}
        {isUnsupported && target && (
          <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-5">
            <p className="flex items-center gap-2 font-heading font-semibold text-foreground">
              <Ban className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {t('unsupported.heading')}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{target.context[l]}</p>
            {target.limitations && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {target.limitations[l]}
              </p>
            )}
            <ul className="flex flex-wrap gap-2 pt-1">
              {[
                { href: ROUTES.disease(target.diseaseSlug), label: t('unsupported.diseaseInfo') },
                { href: ROUTES.genetics, label: t('unknown.exploreGenetics') },
                { href: `${ROUTES.genetics}/relationship-risk`, label: t('unknown.populationRisk') },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Inputs 2 & 3, Parent statuses, adapted to the strategy (v2 §11/§15/§19) */}
        {showParentInputs && (
          <div className="grid gap-8 lg:grid-cols-2">
            <RadioGroup
              legend={t('parentOne.legend')}
              name="parent-one"
              value={statusOne}
              onChange={(value) => {
                setStatusOne(value);
                clearResult();
              }}
              options={strategyStatuses.map((status) => ({
                value: status,
                label: t(`statuses.${strategy}.${status}.label`),
                description: t(`statuses.${strategy}.${status}.definition`),
              }))}
            />
            <RadioGroup
              legend={t('parentTwo.legend')}
              name="parent-two"
              value={statusTwo}
              onChange={(value) => {
                setStatusTwo(value);
                clearResult();
              }}
              options={strategyStatuses.map((status) => ({
                value: status,
                label: t(`statuses.${strategy}.${status}.label`),
                description: t(`statuses.${strategy}.${status}.definition`),
              }))}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {!isUnsupported && (
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <CalculatorIcon className="h-4 w-4" aria-hidden="true" />
              {t('calculate')}
            </button>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('reset')}
          </button>
        </div>

        {/* Validation / combination message, announced to screen readers (v2 §34) */}
        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t(`errors.${error}`)}</span>
          </p>
        )}
      </form>

      {/* Unknown genetic status pathway (v2 §24) */}
      <details className="group rounded-2xl border border-border bg-surface p-5">
        <summary className="flex cursor-pointer items-center gap-2 font-heading font-semibold text-foreground">
          <Info className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('unknown.title')}
        </summary>
        <div className="mt-3 space-y-3 text-sm text-muted-foreground">
          <p>{t('unknown.body')}</p>
          <ul className="flex flex-wrap gap-2">
            {[
              { href: ROUTES.genetics, label: t('unknown.exploreGenetics') },
              { href: `${ROUTES.genetics}/relationship-risk`, label: t('unknown.populationRisk') },
              { href: ROUTES.diseases, label: t('unknown.diseaseInfo') },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </details>

      {/* Results (v2 §20–§23) */}
      {calculation && target && (
        <section
          aria-live="polite"
          aria-label={t('results.heading')}
          className="space-y-8 border-t border-border pt-8"
        >
          <div>
            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              {t('results.heading')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {/* Retains subtype label, never generic (v2 §23) */}
              {target.label[l]} · {t('results.summary', {
                one: calculation.genotypeOne,
                two: calculation.genotypeTwo,
              })}
            </p>
          </div>

          {/* Strategy-specific probabilities (v2 §20) */}
          <ul className={cn('grid gap-4', calculation.outcomes.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
            {calculation.outcomes.map(({ kind, percent }) => {
              const { Icon, tone, bar } = OUTCOME_VISUAL[kind];
              return (
                <li key={kind} className={cn('rounded-2xl border p-5', tone)}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-foreground/70" aria-hidden="true" />
                    <span className="font-heading font-semibold text-foreground">
                      {t(`outcomes.${kind}.label`)}
                    </span>
                  </div>
                  <p className="tnum mt-3 font-heading text-3xl font-semibold text-foreground">
                    {percent}%
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                    <div className={cn('h-full rounded-full', bar)} style={{ width: `${percent}%` }} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t(`outcomes.${kind}.explanation`)}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Probability interpretation (v2 §21) */}
          <EducationalCallout title={t('results.perPregnancyTitle')}>
            {t('results.perPregnancyBody')}
          </EducationalCallout>

          {/* Inheritance combination visualization (v2 §22) */}
          <div>
            <h4 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t('viz.heading')}
            </h4>
            {/* Shared Punnett renderer (Module 22 §5/§22), the calculator's own
                probability cards above are the "probability display"; the square
                is the visual explanation, so its summary is off (§29). */}
            <PunnettSquare
              calculation={calculation}
              showSummary={false}
              outcomeLabel={(kind) => t(`outcomes.${kind}.label`)}
              parentOneLabel={t('viz.parentOne')}
              parentTwoLabel={t('viz.parentTwo')}
              caption={t('viz.caption')}
              textEquivalentLabel={t('viz.textEquivalent')}
            />
          </div>

          {/* Condition context + link (v2 §23) */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h4 className="font-heading text-lg font-semibold text-foreground">
              {t('context.heading')}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {target.context[l]}
            </p>
            {target.limitations && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {target.limitations[l]}
              </p>
            )}
            <Link
              href={ROUTES.disease(target.diseaseSlug)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {t('context.viewPage', { disease: target.label[l] })}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          {/* Disclaimer remains accessible after results (v2 §16) */}
          <EducationalCallout title={t('disclaimer.title')}>
            {t('disclaimer.body')}
          </EducationalCallout>
        </section>
      )}
    </div>
  );
}

/**
 * Accessible single-select group built on native radios (v2 §34): a
 * fieldset/legend, keyboard arrow-key navigation, a visible focus ring, and a
 * clear checked state. The radio input stays in the DOM (screen-reader and
 * keyboard reachable) while the styled label provides the visual affordance.
 */
function RadioGroup<T extends string>({
  legend,
  help,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  help?: string;
  name: string;
  options: { value: T; label: string; description?: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-base font-semibold text-foreground">
        {legend}
      </legend>
      {help && <p className="mt-1 text-sm text-muted-foreground">{help}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = value === option.value;
          const id = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                'flex cursor-pointer flex-col gap-1 rounded-xl border p-3 transition-colors',
                'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1',
                selected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border bg-surface hover:border-primary/40',
              )}
            >
              <span className="font-medium text-foreground">{option.label}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground">{option.description}</span>
              )}
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
