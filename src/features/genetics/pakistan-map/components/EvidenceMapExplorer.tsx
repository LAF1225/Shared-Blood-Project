'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RotateCcw, Search, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import {
  ALL_MAP_EVIDENCE,
  DISEASE_COVERAGE,
  PROVINCE_OPTIONS,
} from '../data/evidence';
import { getValidEvidence } from '../validate';
import {
  filterEvidence,
  clusterEvidence,
  representedEvidenceTypes,
  DEFAULT_FILTERS,
} from '../filter';
import type {
  EvidenceType,
  MapDiseaseId,
  MapEvidenceRecord,
  MapFilters,
  ProvinceOrTerritory,
} from '../types';
import { PakistanMap } from './PakistanMap';
import { EvidenceList } from './EvidenceList';
import { EvidenceDetailPanel } from './EvidenceDetailPanel';
import { MapLegend } from './MapLegend';

type Locale = 'en' | 'ur';

const DISEASE_IDS: MapDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

interface Selection {
  clusterId: string | null;
  recordId: string | null;
}

const NO_SELECTION: Selection = { clusterId: null, recordId: null };

/**
 * Pakistan Genetic Disorder Evidence Map (Module 11). An interactive *evidence
 * visualisation* — never a prevalence/epicenter map (spec §2). One filtering
 * pipeline feeds both the map and the accessible Evidence List (spec §35), and
 * all state is local and never persisted (spec §48/§49).
 */
export function EvidenceMapExplorer() {
  const t = useTranslations('PakistanMap');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const evidence = useMemo(() => getValidEvidence(ALL_MAP_EVIDENCE), []);

  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);
  const [selection, setSelection] = useState<Selection>(NO_SELECTION);

  const filtered = useMemo(() => filterEvidence(evidence, filters), [evidence, filters]);
  const clusters = useMemo(() => clusterEvidence(filtered), [filtered]);
  const representedTypes = useMemo(
    () => representedEvidenceTypes(evidence, { disease: filters.disease, province: filters.province }),
    [evidence, filters.disease, filters.province],
  );

  const selectedRecord = selection.recordId
    ? filtered.find((r) => r.id === selection.recordId) ?? null
    : null;
  const selectedCluster = selection.clusterId
    ? clusters.find((c) => c.id === selection.clusterId) ?? null
    : null;

  // Is the *disease layer itself* empty (spec §29) vs. filters excluding all (§52)?
  const diseaseLayerEmpty =
    filters.disease !== 'all' &&
    evidence.every((r) => r.diseaseId !== filters.disease);

  const coverage = filters.disease !== 'all' ? DISEASE_COVERAGE[filters.disease] : null;

  /** Any filter change recomputes the collection and clears the selection (§51). */
  function updateFilters(partial: Partial<MapFilters>) {
    setFilters((prev) => {
      const next = { ...prev, ...partial };
      // Don't keep an evidence-type filter that the new scope no longer offers (§19).
      if ('disease' in partial || 'province' in partial) {
        const represented = representedEvidenceTypes(evidence, {
          disease: next.disease,
          province: next.province,
        });
        if (next.evidenceType !== 'all' && !represented.includes(next.evidenceType)) {
          next.evidenceType = 'all';
        }
      }
      return next;
    });
    setSelection(NO_SELECTION);
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
    setSelection(NO_SELECTION);
  }

  function handleSelectCluster(clusterId: string) {
    const cluster = clusters.find((c) => c.id === clusterId);
    if (!cluster) return;
    setSelection({
      clusterId,
      recordId: cluster.records.length === 1 ? cluster.records[0].id : null,
    });
  }

  function handleSelectRecord(record: MapEvidenceRecord) {
    const cluster = clusters.find((c) => c.records.some((r) => r.id === record.id));
    setSelection({ clusterId: cluster?.id ?? null, recordId: record.id });
  }

  const diseaseName = (id: MapDiseaseId) => getDiseaseBySlug(id)?.name[l] ?? id;

  return (
    <div className="space-y-8">
      {/* Framing: this is an evidence map, not a prevalence map (spec §2/§45). */}
      <EducationalCallout title={t('intro.title')}>{t('intro.body')}</EducationalCallout>
      <p className="sr-only">{t('map.accessibleIntro')}</p>

      {/* Filters (spec §18/§19/§20/§33) */}
      <div className="grid gap-4 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label={t('filters.disease')}
          value={filters.disease}
          onChange={(value) => updateFilters({ disease: value as MapFilters['disease'] })}
          options={[
            { value: 'all', label: t('filters.allEvidence') },
            ...DISEASE_IDS.map((id) => ({ value: id, label: diseaseName(id) })),
          ]}
        />
        <FilterSelect
          label={t('filters.evidenceType')}
          value={filters.evidenceType}
          onChange={(value) => updateFilters({ evidenceType: value as MapFilters['evidenceType'] })}
          options={[
            { value: 'all', label: t('filters.allTypes') },
            ...representedTypes.map((type: EvidenceType) => ({
              value: type,
              label: t(`evidenceTypes.${type}`),
            })),
          ]}
        />
        <FilterSelect
          label={t('filters.province')}
          value={filters.province}
          onChange={(value) => updateFilters({ province: value as MapFilters['province'] })}
          options={[
            { value: 'all', label: t('filters.allProvinces') },
            ...PROVINCE_OPTIONS.map((p: { id: ProvinceOrTerritory; name: { en: string; ur: string } }) => ({
              value: p.id,
              label: p.name[l],
            })),
          ]}
        />
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">{t('filters.search')}</span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => updateFilters({ query: event.target.value })}
              placeholder={t('filters.searchPlaceholder')}
              className="w-full rounded-lg border border-border bg-surface py-2 ps-9 pe-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </span>
        </label>
      </div>

      {/* Evidence count + coverage (spec §21/§31) */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {t('count.records', { count: filtered.length })}
        </span>
        {coverage && (
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            {t('coverage.label')}: {t(`coverage.${coverage}`)}
          </span>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="ms-auto inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <RotateCcw className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('reset')}
        </button>
      </div>
      <p className="text-sm text-muted-foreground">{t('count.explanation')}</p>
      {coverage && <p className="text-xs text-muted-foreground">{t('coverage.explanation')}</p>}

      {filtered.length === 0 ? (
        <EmptyState
          diseaseLayerEmpty={diseaseLayerEmpty}
          onReset={handleReset}
          t={t}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Map + legend */}
          <div className="space-y-4">
            <PakistanMap
              clusters={clusters}
              selectedClusterId={selection.clusterId}
              onSelect={handleSelectCluster}
            />
            <MapLegend />
          </div>

          {/* Detail / cluster reveal (spec §15/§22) */}
          <div className="space-y-4">
            {selectedRecord ? (
              <EvidenceDetailPanel record={selectedRecord} />
            ) : selectedCluster ? (
              <div className="space-y-3 rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {t('cluster.heading', {
                    location: selectedCluster.locationName[l],
                    count: selectedCluster.records.length,
                  })}
                </h3>
                <p className="text-sm text-muted-foreground">{t('cluster.note')}</p>
                <EvidenceList
                  records={selectedCluster.records}
                  selectedRecordId={null}
                  onSelect={handleSelectRecord}
                />
              </div>
            ) : (
              <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm text-muted-foreground">
                {t('detail.hint')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accessible Evidence List, the text equivalent of the map (spec §34) */}
      {filtered.length > 0 && (
        <section aria-label={t('list.title')} className="space-y-3 border-t border-border pt-8">
          <h3 className="font-heading text-lg font-semibold text-foreground">{t('list.title')}</h3>
          <EvidenceList
            records={filtered}
            selectedRecordId={selection.recordId}
            onSelect={handleSelectRecord}
          />
        </section>
      )}

      {/* "Where Is the Data Missing?", data gaps as a feature (spec §30) */}
      <EducationalCallout title={t('dataGaps.title')}>{t('dataGaps.body')}</EducationalCallout>

      {/* Cross-links (spec §59 "may link to Modules 09 and 10") */}
      <nav
        aria-label={t('crossLinks.title')}
        className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
      >
        <CrossLink
          href={`${ROUTES.genetics}/inheritance-calculator`}
          label={t('crossLinks.calculator')}
        />
        <CrossLink
          href={`${ROUTES.genetics}/relationship-risk`}
          label={t('crossLinks.relationship')}
        />
      </nav>
    </div>
  );
}

function EmptyState({
  diseaseLayerEmpty,
  onReset,
  t,
}: {
  diseaseLayerEmpty: boolean;
  onReset: () => void;
  t: (key: string) => string;
}) {
  // Spec §29 (empty disease layer) vs §52 (filters exclude everything) —
  // neither ever implies the disorder is absent from Pakistan.
  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center">
      <p className="font-heading font-semibold text-foreground">
        {t(diseaseLayerEmpty ? 'empty.layerTitle' : 'empty.filterTitle')}
      </p>
      <p className="mx-auto max-w-prose text-sm text-muted-foreground">
        {t(diseaseLayerEmpty ? 'empty.layerBody' : 'empty.filterBody')}
      </p>
      {!diseaseLayerEmpty && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          {t('empty.reset')}
        </button>
      )}
    </div>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-between gap-2 rounded-xl border border-border bg-surface p-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      {label}
      <ArrowRight className="h-4 w-4 text-primary rtl:rotate-180" aria-hidden="true" />
    </Link>
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
