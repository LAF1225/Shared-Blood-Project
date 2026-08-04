/**
 * Pakistan Genetic Disorder Evidence Map (Module 11).
 *
 * An interactive *evidence visualisation* — it shows where evidence about
 * inherited genetic disorders has been documented in Pakistan, and where the
 * data is missing. It is NOT a disease-prevalence or "epicenter" map (spec §2).
 *
 * The pure data layer (filter pipeline + validation) is framework-free and
 * unit-tested independently of React (spec §58).
 */
export { EvidenceMapExplorer } from './components/EvidenceMapExplorer';
export { EvidenceMapPreview } from './components/EvidenceMapPreview';

export { ALL_MAP_EVIDENCE, MAP_EVIDENCE_BY_DISEASE, DISEASE_COVERAGE, PROVINCE_OPTIONS } from './data/evidence';
export { MAP_REFERENCES, getMapReference } from './data/references';
export { filterEvidence, clusterEvidence, representedEvidenceTypes, evidenceRecordCount, DEFAULT_FILTERS } from './filter';
export { getValidEvidence, isValidRecord, getRecordErrors } from './validate';

export type {
  MapEvidenceRecord,
  MapReference,
  MapDiseaseId,
  EvidenceType,
  EvidenceCoverage,
  EvidenceCluster,
  GeographicPrecision,
  ProvinceOrTerritory,
  ProvinceOption,
  MapFilters,
} from './types';
