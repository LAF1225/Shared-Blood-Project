import type {
  EvidenceCluster,
  EvidenceType,
  MapEvidenceRecord,
  MapFilters,
} from './types';

/**
 * The single filtering pipeline (spec §35):
 *
 *   Dataset → Disease filter → Evidence-type filter → Province filter → Search
 *           → Filtered Evidence Collection → (Map markers AND Evidence list)
 *
 * Both the map and the accessible list consume the SAME output of `filterEvidence`
 * — there is no independent map/list filter logic (spec §34/§35). Pure and
 * framework-free so the scientific boundaries are unit-testable (spec §58).
 *
 * Nothing here computes a prevalence, a province risk score, or a patient count
 * (spec §20/§62). Counts are always "number of evidence records".
 */

export const DEFAULT_FILTERS: MapFilters = {
  disease: 'all',
  evidenceType: 'all',
  province: 'all',
  query: '',
};

/** Apply disease → evidence-type → province → search, in that fixed order. */
export function filterEvidence(
  records: readonly MapEvidenceRecord[],
  filters: MapFilters,
): MapEvidenceRecord[] {
  const query = filters.query.trim().toLowerCase();
  return records.filter((record) => {
    if (filters.disease !== 'all' && record.diseaseId !== filters.disease) return false;
    if (filters.evidenceType !== 'all' && record.evidenceType !== filters.evidenceType) return false;
    if (filters.province !== 'all' && record.provinceOrTerritory !== filters.province) return false;
    if (query && !matchesQuery(record, query)) return false;
    return true;
  });
}

/**
 * Records scoped by disease + province only — used to decide which evidence-type
 * options to offer. The type filter must only list *represented* types so no
 * empty category is shown (spec §19).
 */
export function representedEvidenceTypes(
  records: readonly MapEvidenceRecord[],
  filters: Pick<MapFilters, 'disease' | 'province'>,
): EvidenceType[] {
  const scoped = records.filter((record) => {
    if (filters.disease !== 'all' && record.diseaseId !== filters.disease) return false;
    if (filters.province !== 'all' && record.provinceOrTerritory !== filters.province) return false;
    return true;
  });
  const present = new Set<EvidenceType>();
  for (const record of scoped) present.add(record.evidenceType);
  return [...present];
}

/**
 * Group nearby records into clusters (spec §15). The cluster count is the NUMBER
 * OF EVIDENCE RECORDS — never a patient count, disease severity, or prevalence
 * (spec §15). Records are grouped by their rounded coordinate (~city level); a
 * lone record yields a one-record "cluster".
 */
export function clusterEvidence(records: readonly MapEvidenceRecord[]): EvidenceCluster[] {
  const groups = new Map<string, MapEvidenceRecord[]>();
  for (const record of records) {
    const key = coordinateKey(record.latitude, record.longitude);
    const bucket = groups.get(key);
    if (bucket) bucket.push(record);
    else groups.set(key, [record]);
  }

  const clusters: EvidenceCluster[] = [];
  for (const [key, group] of groups) {
    // Anchor the cluster on the first record's location for a stable label.
    const anchor = group[0];
    clusters.push({
      id: `cluster-${key}`,
      latitude: anchor.latitude,
      longitude: anchor.longitude,
      locationName: anchor.locationName,
      records: group,
    });
  }
  return clusters;
}

/** Total number of evidence records (spec §21) — explicitly not a patient count. */
export function evidenceRecordCount(records: readonly MapEvidenceRecord[]): number {
  return records.length;
}

function coordinateKey(latitude: number, longitude: number): string {
  // ~0.25° buckets keep records in the same city together without merging cities.
  const lat = Math.round(latitude * 4) / 4;
  const lng = Math.round(longitude * 4) / 4;
  return `${lat.toFixed(2)}_${lng.toFixed(2)}`;
}

function matchesQuery(record: MapEvidenceRecord, query: string): boolean {
  const haystack = [
    record.title.en,
    record.title.ur,
    record.locationName.en,
    record.locationName.ur,
    record.district?.en,
    record.district?.ur,
    record.provinceOrTerritory,
    record.diseaseId,
    record.diseaseSubtypeId ?? '',
    record.institution?.en,
    record.institution?.ur,
    record.publicationTitle ?? '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}
