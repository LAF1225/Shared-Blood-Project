import type { EarlySignReference } from '../types';

/**
 * Curated clinical / scientific references (spec §54/§56). Every medical
 * early-sign record must cite at least one of these — an unreferenced record
 * fails validation (spec §54/§72). Sources follow the spec's hierarchy (§56):
 * clinical guidelines, recognized medical organizations, peer-reviewed reviews,
 * and authoritative rare-disease resources. Real organisation pages only — no
 * fabricated citations, and never a runtime-generated source (spec §57).
 */
export const EARLY_SIGN_REFERENCES: readonly EarlySignReference[] = [
  {
    id: 'medlineplus-beta-thalassemia',
    title: 'Beta thalassemia',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/beta-thalassemia/',
  },
  {
    id: 'tif-guidelines',
    title: 'Guidelines for the Management of Transfusion Dependent Thalassaemia',
    publication: 'Thalassaemia International Federation',
    year: 2021,
    url: 'https://thalassaemia.org.cy/publications/tif-publications/',
  },
  {
    id: 'nhs-thalassaemia',
    title: 'Thalassaemia, Symptoms',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/thalassaemia/symptoms/',
  },
  {
    id: 'medlineplus-cystic-fibrosis',
    title: 'Cystic fibrosis',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/cystic-fibrosis/',
  },
  {
    id: 'cff-signs-symptoms',
    title: 'About Cystic Fibrosis, Signs and Symptoms',
    publication: 'Cystic Fibrosis Foundation',
    url: 'https://www.cff.org/intro-cf/about-cystic-fibrosis',
  },
  {
    id: 'nhs-cystic-fibrosis',
    title: 'Cystic fibrosis, Symptoms',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/cystic-fibrosis/symptoms/',
  },
  {
    id: 'medlineplus-lysosomal',
    title: 'Lysosomal storage disorders (overview of conditions)',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/',
  },
  {
    id: 'nord-lysosomal',
    title: 'Rare Disease Database, Lysosomal Storage Disorders',
    publication: 'National Organization for Rare Disorders (NORD)',
    url: 'https://rarediseases.org/rare-diseases/',
  },
  {
    id: 'gard-rare-disease',
    title: 'Genetic and Rare Diseases Information Center (GARD)',
    publication: 'U.S. National Center for Advancing Translational Sciences',
    url: 'https://rarediseases.info.nih.gov/',
  },
  {
    id: 'eds-society-types',
    title: 'The Types of Ehlers-Danlos Syndromes',
    publication: 'The Ehlers-Danlos Society',
    url: 'https://www.ehlers-danlos.com/what-is-eds/',
  },
  {
    id: 'medlineplus-eds',
    title: 'Ehlers-Danlos syndrome',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/ehlers-danlos-syndrome/',
  },
  {
    id: 'nhs-child-development',
    title: 'Children, developmental reviews and milestones',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/baby/babys-development/',
  },
  {
    id: 'who-child-danger-signs',
    title: 'Integrated Management of Childhood Illness, general danger signs',
    publication: 'World Health Organization',
    url: 'https://www.who.int/publications/i/item/9789241506823',
  },
];

export function getEarlySignReference(id: string): EarlySignReference | null {
  return EARLY_SIGN_REFERENCES.find((reference) => reference.id === id) ?? null;
}
