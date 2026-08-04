'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RotateCcw, ArrowRight, Sigma, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import {
  listRelationshipProfiles,
  getRelationshipProfile,
  getPopulationEvidence,
  getDiseaseContext,
  listDiseaseContexts,
  getProfileReferences,
  getRelationshipReference,
} from '../resolve';
import type { RelationshipReference } from '../types';
import { PunnettScenarioExplorer } from '../../punnett';
import { Pedigree } from './Pedigree';

/**
 * Relationship & Recessive Risk Explorer (Module 10). A scientifically-bounded
 * educational tool: it explains why shared ancestry can raise the chance of two
 * parents sharing a recessive variant, but it NEVER produces an individualized
 * disease-risk percentage, risk score, gauge, or classification (spec §18/§46).
 *
 * All state is local and nothing is persisted (spec §30/§31).
 */
export function RelationshipExplorer() {
  const t = useTranslations('RelationshipExplorer');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  const relationships = useMemo(() => listRelationshipProfiles(), []);
  const diseaseContexts = useMemo(() => listDiseaseContexts(), []);

  const [relationshipId, setRelationshipId] = useState<string | null>(null);
  const [diseaseSlug, setDiseaseSlug] = useState<string | null>(null);

  const profile = getRelationshipProfile(relationshipId);
  const evidence = getPopulationEvidence(relationshipId);
  const diseaseContext = getDiseaseContext(diseaseSlug);
  const disease = diseaseSlug ? getDiseaseBySlug(diseaseSlug) : null;

  const references = useMemo<RelationshipReference[]>(() => {
    if (!profile) return [];
    const list = getProfileReferences(profile);
    if (evidence) {
      const evidenceRef = getRelationshipReference(evidence.reference);
      if (evidenceRef && !list.some((r) => r.id === evidenceRef.id)) list.push(evidenceRef);
    }
    return list;
  }, [profile, evidence]);

  const handleReset = () => {
    setRelationshipId(null);
    setDiseaseSlug(null);
  };

  const pedigreeTextEquivalent = profile
    ? `${profile.pedigreeDefinition[l]} ${t('pedigree.hypotheticalNote')}`
    : '';

  return (
    <div className="space-y-8">
      {/* Disclaimer + neutral framing (spec §16/§24) */}
      <EducationalCallout title={t('disclaimer.title')}>
        {t('disclaimer.body')}
      </EducationalCallout>

      {/* Relationship selector (spec §7) */}
      <RadioGroup
        legend={t('relationship.legend')}
        help={t('relationship.help')}
        name="relationship"
        value={relationshipId}
        onChange={setRelationshipId}
        options={relationships.map((r) => ({ value: r.id, label: r.label[l] }))}
      />

      {!profile ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-10 text-center text-muted-foreground">
          {t('emptyState')}
        </p>
      ) : (
        <section aria-live="polite" className="space-y-8 border-t border-border pt-8">
          {/* Title, a profile, not a "risk result" (spec §15) */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
              {t('profileHeading')}
            </p>
            <h3 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-foreground">
              {profile.label[l]}
            </h3>
          </div>

          {/* Pedigree (spec §13/§14) */}
          <Block heading={t('sections.pedigree')}>
            <Pedigree
              shared={profile.coefficient !== null}
              textEquivalent={pedigreeTextEquivalent}
              labels={{
                title: t('sections.pedigree'),
                sharedAncestor: t('pedigree.sharedAncestor'),
                ancestorLine: t('pedigree.ancestorLine'),
                parentOne: t('pedigree.parentOne'),
                parentTwo: t('pedigree.parentTwo'),
                child: t('pedigree.child'),
                variantPath: t('pedigree.variantPath'),
                hypotheticalNote: t('pedigree.hypotheticalNote'),
                alleleLegend: t('pedigree.alleleLegend'),
              }}
            />
          </Block>

          {/* How you are related (spec §15) */}
          <Block heading={t('sections.howRelated')}>
            <p className="leading-relaxed text-foreground/90">{profile.description[l]}</p>
          </Block>

          {/* Shared ancestry (spec §15) */}
          <Block heading={t('sections.sharedAncestry')}>
            <p className="leading-relaxed text-foreground/90">{profile.sharedAncestorContext[l]}</p>
          </Block>

          {/* Expected pedigree coefficient (spec §9/§10/§11) */}
          <Block heading={t('sections.coefficient')}>
            {profile.coefficient ? (
              <div className="space-y-3">
                <p className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
                  <Sigma className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="tnum">F = {profile.coefficient.fraction}</span>
                </p>
                <p className="leading-relaxed text-foreground/90">{t('coefficient.meaning')}</p>
                <p className="rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  {t('coefficient.complexLimit')}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-heading font-semibold text-foreground">
                  {t('coefficient.unrelatedTitle')}
                </p>
                <p className="leading-relaxed text-foreground/90">{t('coefficient.unrelatedBody')}</p>
              </div>
            )}
          </Block>

          {/* How recessive variants can be shared (spec §12/§15) */}
          <Block heading={t('sections.recessiveSharing')}>
            <p className="leading-relaxed text-foreground/90">{profile.recessiveRiskExplanation[l]}</p>
          </Block>

          {/* Population-level context, only when configured (spec §16/§17/§40) */}
          <Block heading={t('sections.populationContext')}>
            {evidence ? (
              <div className="space-y-3 rounded-2xl border border-border bg-surface p-5">
                <p className="leading-relaxed text-foreground/90">{evidence.claim[l]}</p>
                <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <Field label={t('evidence.population')} value={evidence.population[l]} />
                  <Field label={t('evidence.outcome')} value={evidence.outcomeMeasured[l]} />
                  <Field label={t('evidence.estimate')} value={evidence.estimate[l]} />
                  <Field label={t('evidence.estimateType')} value={evidence.estimateType[l]} />
                </dl>
                <p className="rounded-xl border border-accent-strong/20 bg-accent/5 p-3 text-sm text-muted-foreground">
                  {evidence.limitations[l]}
                </p>
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border bg-surface/60 p-4 text-sm text-muted-foreground">
                {t('evidence.notConfigured')}
              </p>
            )}
          </Block>

          {/* Optional disease context (spec §19) */}
          <Block heading={t('sections.diseaseContext')}>
            <RadioGroup
              legend={t('disease.legend')}
              help={t('disease.help')}
              name="disease-context"
              value={diseaseSlug}
              onChange={setDiseaseSlug}
              options={diseaseContexts.map((context) => ({
                value: context.id,
                label: getDiseaseBySlug(context.id)?.name[l] ?? context.id,
              }))}
            />
            {diseaseContext && (
              <div className="mt-4 space-y-3 rounded-2xl border border-border bg-surface p-5">
                <p className="leading-relaxed text-foreground/90">{diseaseContext.context[l]}</p>
                {diseaseContext.pathway && (
                  <p className="text-sm text-muted-foreground">{diseaseContext.pathway[l]}</p>
                )}
                {disease && (
                  <Link
                    href={ROUTES.disease(disease.slug)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {t('disease.viewPage', { disease: disease.name[l] })}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}
          </Block>

          {/* What this cannot tell you (spec §26) */}
          <EducationalCallout title={t('sections.cannotTell')}>
            {t('cannotTell.body')}
          </EducationalCallout>

          {/* What gives more specific information (spec §27) */}
          <Block heading={t('sections.moreSpecific')}>
            <ol className="space-y-2">
              {['relationship', 'familyHistory', 'testing', 'knownStatus'].map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                  <span className="tnum flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{t(`moreSpecific.${step}.label`)}</p>
                    <p className="text-sm text-muted-foreground">{t(`moreSpecific.${step}.detail`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          {/* Educational inheritance scenario → shared Punnett (Module 22 §34–§38).
              Governance-critical: relationship type never determines genotype; the
              scenario is an EXPLICIT hypothetical resolved by the canonical engine ,
              no carrier/affected status is inferred from the relationship. */}
          <Block heading={t('sections.scenario')}>
            <div className="space-y-4">
              <EducationalCallout title={t('scenario.notGenotypeTitle')}>
                {t('scenario.notGenotypeBody')}
              </EducationalCallout>
              <p className="leading-relaxed text-foreground/90">{t('scenario.intro')}</p>
              <PunnettScenarioExplorer />
            </div>
          </Block>

          {/* Navigation to Module 09, no relationship data transferred (spec §28) */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="font-heading font-semibold text-foreground">{t('module09.title')}</p>
            <Link
              href={`${ROUTES.genetics}/inheritance-calculator`}
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t('module09.cta')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          {/* References (spec §33) */}
          {references.length > 0 && (
            <Block heading={t('sections.references')}>
              <ol className="space-y-3">
                {references.map((reference, index) => (
                  <li key={reference.id} className="flex gap-3 text-sm">
                    <span className="tnum shrink-0 font-medium text-muted-foreground">{index + 1}.</span>
                    <div>
                      <p className="font-medium text-foreground">{reference.title[l]}</p>
                      <p className="text-muted-foreground">
                        {reference.publication[l]} · {reference.year}
                      </p>
                      {reference.url && (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <span>{t('viewSource')}</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('reset')}
          </button>
        </section>
      )}
    </div>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section aria-label={heading}>
      <h4 className="mb-3 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        {heading}
      </h4>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd className="text-muted-foreground">{value}</dd>
    </div>
  );
}

/**
 * Accessible single-select group on native radios (spec §35): fieldset/legend,
 * keyboard navigation, a visible focus ring, and a clear checked state.
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
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-base font-semibold text-foreground">{legend}</legend>
      {help && <p className="mt-1 text-sm text-muted-foreground">{help}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
