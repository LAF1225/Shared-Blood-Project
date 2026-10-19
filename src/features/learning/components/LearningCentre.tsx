'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { PageContainer } from '@/components/layout';
import { Faq } from '@/features/diseases/content/components/Faq';
import { RelatedDiseases } from '@/features/diseases/content/components/RelatedDiseases';
import { DISEASES } from '@/features/diseases';
import {
  getFeaturedResources,
  getResourcesByType,
  getDownloadableResources,
  queryResources,
} from '../data/resources';
import { LEARNING_FAQ } from '../data/faq';
import type { ResourceCategoryFilterId } from '../types';
import { ResourceSearch } from './ResourceSearch';
import { CategoryFilter } from './CategoryFilter';
import { ResourceCard } from './ResourceCard';
import { DownloadCard } from './DownloadCard';

/**
 * Parent Learning Centre homepage (Module 07). Composes the sections defined in
 * spec §4: introduction, resource categories, featured resources, caregiver
 * guides, development resources, FAQ, downloads, and related diseases.
 *
 * Search and category filtering are client-side and reload-free (spec §12).
 * Themed sections show in the default browse state; once the user searches or
 * filters, the view collapses to a single results grid.
 */
export function LearningCentre() {
  const t = useTranslations('Learning');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ResourceCategoryFilterId>('all');

  const isBrowsing = query.trim() === '' && category === 'all';
  const featured = useMemo(() => getFeaturedResources(), []);
  const caregiverGuides = useMemo(() => getResourcesByType('guide'), []);
  const development = useMemo(() => getResourcesByType('development'), []);
  const downloads = useMemo(() => getDownloadableResources(), []);
  const results = useMemo(() => queryResources(category, query), [category, query]);

  const faqItems = LEARNING_FAQ.map((item) => ({
    id: item.id,
    question: item.question[l],
    answer: item.answer[l],
  }));

  return (
    <div className="py-12 sm:py-16">
      <PageContainer className="space-y-14 sm:space-y-16">
        {/* 1. Introduction */}
        <header className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
              {t('kicker')}
            </span>
          </div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </header>

        {/* 2. Resource categories + search */}
        <div className="space-y-4">
          <ResourceSearch value={query} onChange={setQuery} />
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        {isBrowsing ? (
          <>
            {/* 3. Featured resources */}
            <ResourceSection title={t('sections.featured')} items={featured} />
            {/* 4. Caregiver guides */}
            <ResourceSection title={t('sections.caregiverGuides')} items={caregiverGuides} />
            {/* 5. Development resources */}
            <ResourceSection title={t('sections.development')} items={development} />
          </>
        ) : (
          <section aria-live="polite">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                {t('sections.results')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('resultsCount', { count: results.length })}
              </p>
            </div>
            {results.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((resource) => (
                  <li key={resource.id}>
                    <ResourceCard resource={resource} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-14 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <SearchX className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {t('noResultsTitle')}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{t('noResultsBody')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('all');
                  }}
                  className="min-h-11 cursor-pointer rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  {t('clearFilters')}
                </button>
              </div>
            )}
          </section>
        )}

        {/* 6. Frequently asked questions */}
        <section aria-labelledby="learning-faq-heading">
          <h2
            id="learning-faq-heading"
            className="mb-6 font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            {t('sections.faq')}
          </h2>
          <Faq items={faqItems} />
        </section>

        {/* 7. Downloads */}
        <section aria-labelledby="learning-downloads-heading">
          <div className="mb-6">
            <h2
              id="learning-downloads-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('sections.downloads')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('downloadsSubtitle')}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {downloads.map((resource) => (
              // min-w-0 lets the card shrink so a long title wraps instead of
              // pushing the download button off narrow screens.
              <li key={resource.id} className="min-w-0">
                <DownloadCard resource={resource} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Related diseases */}
        <section aria-labelledby="learning-related-heading">
          <div className="mb-6">
            <h2
              id="learning-related-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('sections.relatedDiseases')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('relatedDiseasesSubtitle')}</p>
          </div>
          <RelatedDiseases diseases={[...DISEASES]} />
        </section>
      </PageContainer>
    </div>
  );
}

function ResourceSection({
  title,
  items,
}: {
  title: string;
  items: ReturnType<typeof getFeaturedResources>;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-label={title}>
      <h2 className="mb-6 font-heading text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((resource) => (
          <li key={resource.id}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
}
