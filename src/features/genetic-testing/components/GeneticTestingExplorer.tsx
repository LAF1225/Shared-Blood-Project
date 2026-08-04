'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RotateCcw, Search, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import { ALL_TESTING_TOPICS } from '../data/topics';
import { getValidTopics } from '../validate';
import {
  filterTopics,
  representedCategories,
  representedLifeStages,
  representedAudiences,
  representedDiseases,
  DEFAULT_TESTING_FILTERS,
} from '../filter';
import type {
  AudienceContext,
  GeneticTestingDiseaseId,
  GeneticTestingFilters,
  LifeStageContext,
  TestingCategory,
} from '../types';
import { TestingTopicCard } from './TestingTopicCard';
import { ScreeningVsDiagnostic } from './ScreeningVsDiagnostic';
import { CarrierJourney } from './CarrierJourney';
import { ResultConcepts } from './ResultConcepts';
import { GeneticCounsellingCard } from './GeneticCounsellingCard';
import { QuestionsChecklist } from './QuestionsChecklist';
import { FamilyHistoryGuide } from './FamilyHistoryGuide';
import { PrivacyEthicsNotice } from './PrivacyEthicsNotice';

type Locale = 'en' | 'ur';

/**
 * Genetic Testing & Counselling Education (Module 15). An education LIBRARY —
 * context- and category-based (spec §16/§77), NOT a personal assessment.
 * Selecting a context never infers risk or carrier status (spec §17), and the
 * module never approves/rejects couples or makes reproductive decisions
 * (spec §2/§32/§34). All state is local and nothing is persisted (spec §78/§79).
 */
export function GeneticTestingExplorer({
  initialContext = null,
  initialDisease = null,
  initialCategory = null,
}: {
  initialContext?: LifeStageContext | null;
  initialDisease?: GeneticTestingDiseaseId | null;
  initialCategory?: TestingCategory | null;
}) {
  const t = useTranslations('GeneticTesting');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const topics = useMemo(() => getValidTopics(ALL_TESTING_TOPICS), []);
  const [filters, setFilters] = useState<GeneticTestingFilters>({
    ...DEFAULT_TESTING_FILTERS,
    lifeStage: initialContext ?? 'all',
    disease: initialDisease ?? 'all',
    category: initialCategory ?? 'all',
  });

  const filtered = useMemo(() => filterTopics(topics, filters), [topics, filters]);
  const lifeStages = useMemo(() => representedLifeStages(topics), [topics]);
  const audiences = useMemo(() => representedAudiences(topics), [topics]);
  const categories = useMemo(() => representedCategories(topics), [topics]);
  const diseases = useMemo(() => representedDiseases(topics), [topics]);

  function handleReset() {
    setFilters(DEFAULT_TESTING_FILTERS);
  }

  return (
    <div className="space-y-10">
      {/* Framing: prevention as education, NOT "stop cousin marriage" or a
          compatibility system (spec §3/§4/§33). */}
      <EducationalCallout title={t('notCompatibility.title')}>{t('notCompatibility.body')}</EducationalCallout>

      {/* Educational foundations. */}
      <ScreeningVsDiagnostic />
      <CarrierJourney />

      {/* Testing-topic library with context/category filters (spec §16/§77). */}
      <section aria-label={t('library.title')} className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">{t('library.title')}</h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('library.intro')}</p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label={t('filters.context')}
            value={filters.lifeStage}
            onChange={(value) => setFilters((p) => ({ ...p, lifeStage: value as GeneticTestingFilters['lifeStage'] }))}
            options={[
              { value: 'all', label: t('filters.allContexts') },
              ...lifeStages.map((s: LifeStageContext) => ({ value: s, label: t(`lifeStages.${s}`) })),
            ]}
          />
          <FilterSelect
            label={t('filters.audience')}
            value={filters.audience}
            onChange={(value) => setFilters((p) => ({ ...p, audience: value as GeneticTestingFilters['audience'] }))}
            options={[
              { value: 'all', label: t('filters.allAudiences') },
              ...audiences.map((a: AudienceContext) => ({ value: a, label: t(`audiences.${a}`) })),
            ]}
          />
          <FilterSelect
            label={t('filters.category')}
            value={filters.category}
            onChange={(value) => setFilters((p) => ({ ...p, category: value as GeneticTestingFilters['category'] }))}
            options={[
              { value: 'all', label: t('filters.allCategories') },
              ...categories.map((c: TestingCategory) => ({ value: c, label: t(`categories.${c}`) })),
            ]}
          />
          <FilterSelect
            label={t('filters.disease')}
            value={filters.disease}
            onChange={(value) => setFilters((p) => ({ ...p, disease: value as GeneticTestingFilters['disease'] }))}
            options={[
              { value: 'all', label: t('filters.allDiseases') },
              ...diseases.map((d: GeneticTestingDiseaseId) => ({
                value: d,
                label: getDiseaseBySlug(d)?.name[l] ?? d,
              })),
            ]}
          />
        </div>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">{t('filters.search')}</span>
          <span className="relative block max-w-md">
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
            {filtered.map((topic) => (
              <li key={topic.id}>
                <TestingTopicCard topic={topic} />
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
      </section>

      {/* Understanding results (spec §25–§28). */}
      <ResultConcepts />

      {/* Genetic counselling, non-directive (spec §31/§32/§66). */}
      <GeneticCounsellingCard />

      {/* Questions to prepare (spec §47/§48/§54). */}
      <QuestionsChecklist />

      {/* Family-history preparation, generic, private, printable (spec §44/§45). */}
      <FamilyHistoryGuide />

      {/* Privacy, stigma, gender-blame, ethical context (spec §33/§52/§61/§62). */}
      <PrivacyEthicsNotice />

      {/* Optional cross-link to inheritance education, carries NO selections (spec §7). */}
      <Link
        href={ROUTES.genetics}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {t('learnInheritance')}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </Link>
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
