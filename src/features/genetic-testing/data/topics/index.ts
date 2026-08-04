import type { GeneticTestingDiseaseId, GeneticTestingTopicRecord } from '../../types';
import { GENERAL_TESTING_TOPICS } from './general';
import { BETA_THALASSEMIA_TESTING } from './beta-thalassemia';
import { CYSTIC_FIBROSIS_TESTING } from './cystic-fibrosis';
import { LYSOSOMAL_STORAGE_DISORDERS_TESTING } from './lysosomal-storage-disorders';
import { EHLERS_DANLOS_SYNDROME_TESTING } from './ehlers-danlos-syndrome';

/** Per-disease testing-education datasets — separately reviewed content (spec §88). */
export const TESTING_TOPICS_BY_DISEASE: Record<GeneticTestingDiseaseId, readonly GeneticTestingTopicRecord[]> = {
  'beta-thalassemia': BETA_THALASSEMIA_TESTING,
  'cystic-fibrosis': CYSTIC_FIBROSIS_TESTING,
  'lysosomal-storage-disorders': LYSOSOMAL_STORAGE_DISORDERS_TESTING,
  'ehlers-danlos-syndrome': EHLERS_DANLOS_SYNDROME_TESTING,
};

/** Flat list of every testing-education topic (general + disease-specific). */
export const ALL_TESTING_TOPICS: readonly GeneticTestingTopicRecord[] = [
  ...GENERAL_TESTING_TOPICS,
  ...BETA_THALASSEMIA_TESTING,
  ...CYSTIC_FIBROSIS_TESTING,
  ...LYSOSOMAL_STORAGE_DISORDERS_TESTING,
  ...EHLERS_DANLOS_SYNDROME_TESTING,
];

/** The four supported diseases, in display order (spec §88). */
export const TESTING_DISEASE_IDS: readonly GeneticTestingDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

export function getTestingTopicById(id: string): GeneticTestingTopicRecord | null {
  return ALL_TESTING_TOPICS.find((topic) => topic.id === id) ?? null;
}
