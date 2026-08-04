'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RotateCcw, Search, ArrowRight, HeartHandshake } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import { ALL_CARE_RECORDS, CARE_DISEASE_IDS } from '../data/careRecords';
import { getValidCareRecords } from '../validate';
import {
  filterCareRecords,
  representedCareDomains,
  representedAgeContexts,
  representedAudiences,
  DEFAULT_CARE_FILTERS,
} from '../filter';
import type {
  AgeContext,
  CareDiseaseId,
  CareDomain,
  CareSupportFilters,
  CaregiverAudience,
} from '../types';
import { CareSupportCard } from './CareSupportCard';
import { AppointmentGuide } from './AppointmentGuide';
import { EssentialCareInfo } from './EssentialCareInfo';

type Locale = 'en' | 'ur';

/**
 * Care & Support Resources (Module 14). An educational, DISEASE-FIRST and
 * category-based system (spec §58/§59): the caregiver chooses a disease and a
 * care area — the system never infers care from a narrative, scores, ranks, or
 * generates a care plan (spec §2/§58/§67). All state is local and nothing is
 * persisted (spec §72/§73).
 */
export function CareSupportExplorer({
  initialDisease = null,
}: {
  initialDisease?: CareDiseaseId | null;
}) {
  const t = useTranslations('CareSupport');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const records = useMemo(() => getValidCareRecords(ALL_CARE_RECORDS), []);
  const [filters, setFilters] = useState<CareSupportFilters>({
    ...DEFAULT_CARE_FILTERS,
    disease: initialDisease,
  });

  const filtered = useMemo(() => filterCareRecords(records, filters), [records, filters]);
  const domains = useMemo(() => representedCareDomains(records, filters.disease), [records, filters.disease]);
  const ages = useMemo(() => representedAgeContexts(records, filters.disease), [records, filters.disease]);
  const audiences = useMemo(() => representedAudiences(records, filters.disease), [records, filters.disease]);

  const disease = filters.disease ? getDiseaseBySlug(filters.disease) : null;

  function selectDisease(id: CareDiseaseId) {
    // Changing disease resets the disease-scoped sub-filters (spec §72).
    setFilters({ ...DEFAULT_CARE_FILTERS, disease: id });
  }

  function handleReset() {
    setFilters(DEFAULT_CARE_FILTERS);
  }

  return (
    <div className="space-y-8">
      {/* Framing: care education, NOT a treatment planner (spec §2/§3/§13). */}
      <EducationalCallout title={t('notPlanner.title')}>{t('notPlanner.body')}</EducationalCallout>

      {/* Disease-first chooser (spec §59). */}
      <section aria-label={t('chooser.legend')}>
        <h2 className="font-heading text-xl font-semibold text-foreground">{t('chooser.legend')}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('chooser.help')}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {CARE_DISEASE_IDS.map((id) => {
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
          {disease && (
            <Link
              href={ROUTES.disease(disease.slug)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {t('viewDiseasePage', { disease: disease.name[l] })}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          )}

          {/* Filters (spec §57/§71/§74). */}
          <div className="grid gap-4 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label={t('filters.careArea')}
              value={filters.domain}
              onChange={(value) => setFilters((p) => ({ ...p, domain: value as CareSupportFilters['domain'] }))}
              options={[
                { value: 'all', label: t('filters.allAreas') },
                ...domains.map((domain: CareDomain) => ({ value: domain, label: t(`domains.${domain}`) })),
              ]}
            />
            <FilterSelect
              label={t('filters.age')}
              value={filters.age}
              onChange={(value) => setFilters((p) => ({ ...p, age: value as CareSupportFilters['age'] }))}
              options={[
                { value: 'all', label: t('filters.allAges') },
                ...ages.map((age: AgeContext) => ({ value: age, label: t(`ages.${age}`) })),
              ]}
            />
            <FilterSelect
              label={t('filters.audience')}
              value={filters.audience}
              onChange={(value) => setFilters((p) => ({ ...p, audience: value as CareSupportFilters['audience'] }))}
              options={[
                { value: 'all', label: t('filters.allAudiences') },
                ...audiences.map((audience: CaregiverAudience) => ({
                  value: audience,
                  label: t(`audiences.${audience}`),
                })),
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
              {filtered.map((record) => (
                <li key={record.id}>
                  <CareSupportCard record={record} />
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

          {/* Caregiver-preparation tools, shared across care areas (spec §43/§55). */}
          <div className="space-y-6 border-t border-border pt-8">
            <p className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
              <HeartHandshake className="h-5 w-5 text-primary" aria-hidden="true" />
              {t('toolsHeading')}
            </p>
            <AppointmentGuide />
            <EssentialCareInfo />
          </div>
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
