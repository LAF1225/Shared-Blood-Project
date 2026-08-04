/**
 * Disease identifiers for the Version One library.
 * Content and medical data are provided by their dedicated modules (06–09).
 * IDs/slugs live here so routing and navigation stay consistent.
 */
export const DISEASE_IDS = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
] as const;

export type DiseaseId = (typeof DISEASE_IDS)[number];
