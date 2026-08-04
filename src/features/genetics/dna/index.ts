/**
 * Disease-Linked DNA Explorer (Module 22 §6–§21).
 *
 * Repurposes the former generic `dna-explorer` placeholder into disease-linked
 * molecular education for the approved diseases. Pure resolver + data are
 * framework-free and unit-tested; the client component orchestrates transient
 * local state only (§8/§40).
 */
export { DnaExplorer } from './components/DnaExplorer';
export { DnaVisual } from './components/DnaVisual';
export {
  resolveDnaEducation,
  listDnaDiseases,
  isDnaDiseaseSupported,
} from './resolver';
export { DISEASE_MOLECULAR_RECORDS, getMolecularRecord } from './data/records';
export type {
  DnaResolution,
  DiseaseMolecularRecord,
  MolecularMechanism,
  DnaMechanismStep,
  DnaSupportState,
  DnaVisualType,
  DnaStepId,
} from './types';
