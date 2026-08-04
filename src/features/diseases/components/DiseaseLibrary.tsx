'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { PageContainer } from '@/components/layout';
import { Alert } from '@/components/ui/Alert';
import { DISEASES, getFeaturedDiseases, queryDiseases } from '../data/diseases';
import type { CategoryFilterId } from '../data/categories';
import { DiseaseSearch } from './DiseaseSearch';
import { CategoryFilter } from './CategoryFilter';
import { DiseaseDirectoryItem } from './DiseaseDirectoryItem';
import { RelatedResources } from './RelatedResources';

/**
 * Disease Library (Module 04). Central discovery surface: introduction, search,
 * category filters, featured diseases, the full catalogue, an educational
 * disclaimer, and related resources — in the order defined by spec §6.
 *
 * Search and filtering are client-side and reload-free (spec §9). The Featured
 * band only appears in the default browse state; once the user is actively
 * searching or filtering, the catalogue collapses to just the matching results.
 */
export function DiseaseLibrary() {
  const t = useTranslations('DiseaseLibrary');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilterId>('all');

  const isBrowsing = query.trim() === '' && category === 'all';
  const featured = useMemo(() => getFeaturedDiseases(), []);
  const results = useMemo(
    () => queryDiseases(category, query),
    [category, query],
  );

  return (
    <div className="py-12 sm:py-16">
      <PageContainer className="space-y-12 sm:space-y-16">
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

        {/* 2. Search + 3. Category filters */}
        <div className="space-y-4">
          <DiseaseSearch value={query} onChange={setQuery} />
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        {/* 4. Featured diseases, default browse state only */}
        {isBrowsing && (
          <section aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="mb-6 font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('featuredTitle')}
            </h2>
            <ul className="border-t border-border/70 divide-y divide-border/70">
              {featured.map((disease) => (
                <li key={disease.id}>
                  <DiseaseDirectoryItem disease={disease} featured />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 5. All diseases / results */}
        <section aria-labelledby="all-diseases-heading" aria-live="polite">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="all-diseases-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {isBrowsing ? t('allTitle') : t('resultsTitle')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('resultsCount', { count: results.length })}
            </p>
          </div>

          {results.length > 0 ? (
            <ul className="border-t border-border/70 divide-y divide-border/70">
              {results.map((disease) => (
                <li key={disease.id}>
                  <DiseaseDirectoryItem disease={disease} />
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
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('noResultsBody')}
                </p>
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

        {/* 6. Educational disclaimer */}
        <Alert tone="info">{t('disclaimer')}</Alert>

        {/* 7. Related resources */}
        <RelatedResources />
      </PageContainer>
    </div>
  );
}

/** Total number of diseases in the library — handy for tests/metadata. */
export const DISEASE_COUNT = DISEASES.length;
