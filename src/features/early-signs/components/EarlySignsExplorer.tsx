'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RotateCcw, Search, ArrowRight, Lightbulb, Sprout } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import { ALL_EARLY_SIGNS, EARLY_SIGN_DISEASE_IDS } from '../data/signs';
import { getValidSigns } from '../validate';
import {
  filterSigns,
  representedAgeContexts,
  representedCategories,
  representedProfessionalTypes,
  DEFAULT_FILTERS,
} from '../filter';
import type { AgeContext, EarlySignDiseaseId, EarlySignFilters, ObservationCategory } from '../types';
import { EarlySignCard } from './EarlySignCard';
import { EmergencyGuidance } from './EmergencyGuidance';
import { ProfessionalTypeList } from './ProfessionalTypeList';
import { AppointmentQuestions } from './AppointmentQuestions';

type Locale = 'en' | 'ur';

/**
 * Early Signs & Care Guidance (Module 13). An educational, DISEASE-FIRST system
 * (spec §19): the user chooses a disease to learn about — the system never
 * identifies a disease, matches symptoms, scores, or predicts (spec §2/§17/§18).
 * All state is local and nothing health-related is persisted (spec §67/§68).
 */
export function EarlySignsExplorer({
  initialDisease = null,
}: {
  initialDisease?: EarlySignDiseaseId | null;
}) {
  const t = useTranslations('EarlySigns');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const signs = useMemo(() => getValidSigns(ALL_EARLY_SIGNS), []);
  const [filters, setFilters] = useState<EarlySignFilters>({
    ...DEFAULT_FILTERS,
    disease: initialDisease,
  });

  const filtered = useMemo(() => filterSigns(signs, filters), [signs, filters]);
  const ages = useMemo(() => representedAgeContexts(signs, filters.disease), [signs, filters.disease]);
  const categories = useMemo(
    () => representedCategories(signs, { disease: filters.disease, age: filters.age }),
    [signs, filters.disease, filters.age],
  );
  const diseaseScopeSigns = useMemo(
    () => (filters.disease ? filterSigns(signs, { ...DEFAULT_FILTERS, disease: filters.disease }) : []),
    [signs, filters.disease],
  );
  const professionalTypes = useMemo(
    () => representedProfessionalTypes(diseaseScopeSigns),
    [diseaseScopeSigns],
  );

  const disease = filters.disease ? getDiseaseBySlug(filters.disease) : null;

  function selectDisease(id: EarlySignDiseaseId) {
    // Changing disease resets the disease-scoped sub-filters (spec §21).
    setFilters({ disease: id, age: 'all', category: 'all', query: '' });
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <div className="space-y-8">
      {/* Framing: educational, NOT a symptom checker (spec §3). */}
      <EducationalCallout title={t('notChecker.title')}>{t('notChecker.body')}</EducationalCallout>

      {/* Pattern education, prominent (spec §52). */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <p className="flex items-center gap-2 font-heading font-semibold text-foreground">
          <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
          {t('patternEducation.title')}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/90">{t('patternEducation.body')}</p>
      </div>

      {/* Shared emergency safety layer (spec §29). */}
      <EmergencyGuidance />

      {/* Disease-first chooser (spec §19/§20). */}
      <section aria-label={t('chooser.legend')}>
        <h2 className="font-heading text-xl font-semibold text-foreground">{t('chooser.legend')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('chooser.help')}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {EARLY_SIGN_DISEASE_IDS.map((id) => {
            const selected = filters.disease === id;
            const d = getDiseaseBySlug(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectDisease(id)}
                aria-pressed={selected}
                className={cn(
                  'rounded-xl border p-4 text-start text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                  selected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-surface hover:border-primary/40',
                )}
              >
                {d?.name[l] ?? id}
              </button>
            );
          })}
        </div>
      </section>

      {!filters.disease ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-10 text-center text-muted-foreground">
          {t('chooser.prompt')}
        </p>
      ) : (
        <section aria-live="polite" className="space-y-8 border-t border-border pt-8">
          {/* Link to the full disease page (spec §20/§23). */}
          {disease && (
            <Link
              href={ROUTES.disease(disease.slug)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {t('viewDiseasePage', { disease: disease.name[l] })}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          )}

          {/* Filters (spec §21/§22/§58). */}
          <div className="grid gap-4 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-3">
            <FilterSelect
              label={t('filters.age')}
              value={filters.age}
              onChange={(value) => setFilters((p) => ({ ...p, age: value as EarlySignFilters['age'] }))}
              options={[
                { value: 'all', label: t('filters.allAges') },
                ...ages.map((age: AgeContext) => ({ value: age, label: t(`ages.${age}`) })),
              ]}
            />
            <FilterSelect
              label={t('filters.category')}
              value={filters.category}
              onChange={(value) => setFilters((p) => ({ ...p, category: value as EarlySignFilters['category'] }))}
              options={[
                { value: 'all', label: t('filters.allCategories') },
                ...categories.map((cat: ObservationCategory) => ({ value: cat, label: t(`categories.${cat}`) })),
              ]}
            />
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">{t('filters.search')}</span>
              <span className="relative block">
                <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <input
                  type="search"
                  value={filters.query}
                  onChange={(event) => setFilters((p) => ({ ...p, query: event.target.value }))}
                  placeholder={t('filters.searchPlaceholder')}
                  className="w-full rounded-lg border border-border bg-surface py-2 ps-9 pe-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">{t('count', { count: filtered.length })}</span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
              {t('filters.reset')}
            </button>
          </div>

          {filtered.length > 0 ? (
            <ul className="space-y-5">
              {filtered.map((sign) => (
                <li key={sign.id}>
                  <EarlySignCard sign={sign} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3 rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center">
              <p className="font-heading font-semibold text-foreground">{t('empty.title')}</p>
              <p className="mx-auto max-w-prose text-sm text-muted-foreground">{t('empty.body')}</p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                {t('empty.reset')}
              </button>
            </div>
          )}

          {/* Developmental variation message (spec §50/§51). */}
          <div className="rounded-2xl border border-border bg-muted/20 p-5">
            <p className="flex items-center gap-2 font-heading font-semibold text-foreground">
              <Sprout className="h-5 w-5 text-primary" aria-hidden="true" />
              {t('devVariation.title')}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{t('devVariation.body')}</p>
          </div>

          {/* Relevant professional types (spec §31), not a directory (§32). */}
          <ProfessionalTypeList types={professionalTypes} />

          {/* Appointment preparation (spec §35/§37). */}
          <AppointmentQuestions />
        </section>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
