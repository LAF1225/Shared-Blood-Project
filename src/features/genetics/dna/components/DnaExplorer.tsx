'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Microscope,
  Info,
  ExternalLink,
  Ban,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { resolveDnaEducation, listDnaDiseases } from '../resolver';
import { DnaVisual } from './DnaVisual';

/**
 * Disease-Linked DNA Explorer (Module 22 §6–§21). A fully client-side, lightweight
 * educational tool: select a disease (and subtype where required) and step through
 * its disease-specific molecular story — gene context → genetic change → function
 * effect → biological consequence → disease connection (§7/§8).
 *
 * All maths-free content comes from the pure resolver + data; this component only
 * orchestrates local, transient state (§8/§40). Nothing is persisted and no
 * genetic-interest profile is created (§40). Hypermobile EDS resolves to an
 * educational limitation state — never a fabricated mechanism (§15).
 */
export function DnaExplorer({ initialDiseaseId }: { initialDiseaseId?: string } = {}) {
  const t = useTranslations('DnaExplorer');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  const diseases = useMemo(() => listDnaDiseases(), []);

  // Educational preselection (Module 24 §45): a disease may be preselected from
  // `?disease=`, but the SUBTYPE gate is never bypassed (subtype stays null) and
  // the selection remains fully editable.
  const [diseaseId, setDiseaseId] = useState<string | null>(
    initialDiseaseId && diseases.some((d) => d.id === initialDiseaseId) ? initialDiseaseId : null,
  );
  const [subtypeId, setSubtypeId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const resolution = resolveDnaEducation(diseaseId, subtypeId);
  const record = 'record' in resolution ? resolution.record : null;
  const subtypes = record?.subtypes ?? [];

  const changeDisease = (id: string) => {
    setDiseaseId(id);
    setSubtypeId(null);
    setActiveStep(0);
  };
  const changeSubtype = (id: string) => {
    setSubtypeId(id);
    setActiveStep(0);
  };
  const reset = () => {
    setDiseaseId(null);
    setSubtypeId(null);
    setActiveStep(0);
  };

  return (
    <div className="space-y-8">
      <EducationalCallout title={t('disclaimer.title')}>{t('disclaimer.body')}</EducationalCallout>

      {/* Step 1, Select disease (§8/§9) */}
      <RadioGroup
        legend={t('disease.legend')}
        help={t('disease.help')}
        name="dna-disease"
        value={diseaseId}
        onChange={changeDisease}
        options={diseases.map((d) => ({ value: d.id, label: d.name[l] }))}
      />

      {!diseaseId && (
        <p className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-10 text-center text-muted-foreground">
          {t('intro')}
        </p>
      )}

      {/* Subtype selection where required (§14/§15) */}
      {record?.requiresSubtype && subtypes.length > 0 && (
        <RadioGroup
          legend={t('subtype.legend')}
          help={t('subtype.help')}
          name="dna-subtype"
          value={subtypeId}
          onChange={changeSubtype}
          options={subtypes.map((s) => ({ value: s.id, label: s.name[l] }))}
        />
      )}

      {/* Overview once a disease is chosen */}
      {record && (
        <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {record.overview[l]}
        </p>
      )}

      {/* Subtype-required prompt (§14) */}
      {resolution.state === 'SUBTYPE_REQUIRED' && (
        <p className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <Info className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('chooseSubtype')}
        </p>
      )}

      {/* Limited-mechanism state, hypermobile EDS (§15). No stepper, no mechanism. */}
      {resolution.state === 'LIMITED_MECHANISM' && (
        <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-5">
          <p className="flex items-center gap-2 font-heading font-semibold text-foreground">
            <Ban className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            {resolution.limitation.title[l]}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resolution.limitation.explanation[l]}
          </p>
          <DnaVisual type="LIMITATION" className="mt-2 max-w-sm" />
        </div>
      )}

      {/* Supported mechanism, the stepper (§8/§16–§21) */}
      {resolution.state === 'SUPPORTED' && (
        <Stepper
          key={`${diseaseId}:${subtypeId}`}
          steps={resolution.steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          geneSymbol={resolution.mechanism.geneSymbol}
          l={l}
          labels={{
            stepOf: (a, b) => t('steps.stepOf', { current: a, total: b }),
            previous: t('controls.previous'),
            next: t('controls.next'),
            restart: t('controls.restart'),
            goToStep: t('controls.goToStep'),
            exampleNote: t('exampleNote'),
          }}
          references={resolution.references.map((r) => ({
            id: r.id,
            title: r.title[l],
            publication: r.publication?.[l],
            url: r.url,
          }))}
          referencesLabel={t('referencesLabel')}
          viewSourceLabel={t('viewSource')}
        />
      )}

      {diseaseId && (
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('controls.reset')}
        </button>
      )}
    </div>
  );
}

type L = 'en' | 'ur';

interface RefItem {
  id: string;
  title: string;
  publication?: string;
  url?: string;
}

function Stepper({
  steps,
  activeStep,
  setActiveStep,
  geneSymbol,
  l,
  labels,
  references,
  referencesLabel,
  viewSourceLabel,
}: {
  steps: import('../types').DnaMechanismStep[];
  activeStep: number;
  setActiveStep: (n: number) => void;
  geneSymbol?: string;
  l: L;
  labels: {
    stepOf: (current: number, total: number) => string;
    previous: string;
    next: string;
    restart: string;
    goToStep: string;
    exampleNote: string;
  };
  references: RefItem[];
  referencesLabel: string;
  viewSourceLabel: string;
}) {
  const total = steps.length;
  const index = Math.min(Math.max(activeStep, 0), total - 1);
  const step = steps[index];

  return (
    <section aria-label={labels.stepOf(index + 1, total)} className="space-y-6 border-t border-border pt-8">
      {/* Step indicators, clickable navigation to any step (§8/§21/§46) */}
      <ol className="flex flex-wrap gap-2" role="list">
        {steps.map((s, i) => {
          const current = i === index;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActiveStep(i)}
                aria-current={current ? 'step' : undefined}
                aria-label={`${labels.goToStep}: ${s.title[l]}`}
                className={cn(
                  'flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition-colors',
                  current
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                <span className="tnum">{i + 1}</span>
                <span className="hidden sm:inline">{s.title[l]}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Active step content (announced) */}
      <div aria-live="polite" className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
          {labels.stepOf(index + 1, total)}
        </p>
        <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          {step.title[l]}
        </h3>
        <DnaVisual type={step.visualType} label={geneSymbol} className="max-w-lg" />
        <p className="leading-relaxed text-foreground/90">{step.explanation[l]}</p>
        {step.callout && (
          <p className="flex items-start gap-2 rounded-xl border border-accent-strong/20 bg-accent/5 p-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
            <span>
              <span className="font-medium text-foreground">{labels.exampleNote}</span> {step.callout[l]}
            </span>
          </p>
        )}
      </div>

      {/* Controls (§21, keyboard operable, not hover-only) */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveStep(index - 1)}
          disabled={index === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {labels.previous}
        </button>
        <button
          type="button"
          onClick={() => setActiveStep(index + 1)}
          disabled={index === total - 1}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {labels.next}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setActiveStep(0)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
          {labels.restart}
        </button>
      </div>

      {/* References (§21) */}
      {references.length > 0 && (
        <div className="border-t border-border pt-5">
          <h4 className="mb-3 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
            <Microscope className="h-4 w-4 text-primary" aria-hidden="true" />
            {referencesLabel}
          </h4>
          <ol className="space-y-2">
            {references.map((r, i) => (
              <li key={r.id} className="flex gap-3 text-sm">
                <span className="tnum shrink-0 font-medium text-muted-foreground">{i + 1}.</span>
                <div>
                  <p className="font-medium text-foreground">{r.title}</p>
                  {r.publication && <p className="text-muted-foreground">{r.publication}</p>}
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <span>{viewSourceLabel}</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

/** Accessible single-select group on native radios (§45/§46). */
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
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-base font-semibold text-foreground">{legend}</legend>
      {help && <p className="mt-1 text-sm text-muted-foreground">{help}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((option) => {
          const selected = value === option.value;
          const id = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                'flex cursor-pointer items-center rounded-xl border p-3 text-sm transition-colors',
                'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1',
                selected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border bg-surface hover:border-primary/40',
              )}
            >
              <span className="font-medium text-foreground">{option.label}</span>
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
