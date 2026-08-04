import type { CareReference } from '../types';

/**
 * Curated care / scientific references (spec §64/§65 — Module 07 architecture).
 * Every care-support record and every support item involving a medical or
 * therapeutic use must cite at least one of these, or it fails validation
 * (spec §64/§76). References must support the specific claim (spec §65) — a
 * generic disease source is not attached to a device-benefit claim.
 *
 * Real organisation pages only — no fabricated citations, and never a
 * runtime-generated source (spec §67).
 */
export const CARE_REFERENCES: readonly CareReference[] = [
  // ---- General child care, development, and nutrition ----
  {
    id: 'nhs-child-development',
    title: 'Children, developmental reviews and milestones',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/baby/babys-development/',
  },
  {
    id: 'cdc-milestones',
    title: 'CDC’s Developmental Milestones (Learn the Signs. Act Early.)',
    publication: 'U.S. Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/ncbddd/actearly/milestones/index.html',
  },
  {
    id: 'who-child-danger-signs',
    title: 'Integrated Management of Childhood Illness, general danger signs',
    publication: 'World Health Organization',
    url: 'https://www.who.int/publications/i/item/9789241506823',
  },
  {
    id: 'gosh-caring',
    title: 'Health information for parents and carers',
    publication: 'Great Ormond Street Hospital for Children (GOSH)',
    url: 'https://www.gosh.nhs.uk/conditions-and-treatments/',
  },
  {
    id: 'who-assistive-technology',
    title: 'Assistive technology, key facts',
    publication: 'World Health Organization',
    url: 'https://www.who.int/news-room/fact-sheets/detail/assistive-technology',
  },

  // ---- Beta thalassemia ----
  {
    id: 'tif-patient-guidelines',
    title: 'Guidelines for the Management of Transfusion Dependent Thalassaemia',
    publication: 'Thalassaemia International Federation',
    year: 2021,
    url: 'https://thalassaemia.org.cy/publications/tif-publications/',
  },
  {
    id: 'nhs-thalassaemia-living',
    title: 'Thalassaemia, Living with',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/thalassaemia/living-with/',
  },
  {
    id: 'medlineplus-iron-anaemia',
    title: 'Anemia, different types require different treatment',
    publication: 'MedlinePlus (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/anemia.html',
  },

  // ---- Cystic fibrosis ----
  {
    id: 'cff-daily-care',
    title: 'Treatments and Therapies, daily care overview',
    publication: 'Cystic Fibrosis Foundation',
    url: 'https://www.cff.org/managing-cf/treatments-and-therapies',
  },
  {
    id: 'cff-nutrition',
    title: 'Nutrition and Cystic Fibrosis',
    publication: 'Cystic Fibrosis Foundation',
    url: 'https://www.cff.org/managing-cf/nutrition',
  },
  {
    id: 'nhs-cystic-fibrosis-living',
    title: 'Cystic fibrosis, Living with',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/cystic-fibrosis/living-with/',
  },

  // ---- Lysosomal storage disorders ----
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
    id: 'mps-society-support',
    title: 'Support for families affected by MPS and related lysosomal diseases',
    publication: 'The MPS Society',
    url: 'https://www.mpssociety.org.uk/support',
  },

  // ---- Ehlers-Danlos syndrome ----
  {
    id: 'eds-society-management',
    title: 'Managing Ehlers-Danlos Syndromes, living and support',
    publication: 'The Ehlers-Danlos Society',
    url: 'https://www.ehlers-danlos.com/managing-eds/',
  },
  {
    id: 'medlineplus-eds',
    title: 'Ehlers-Danlos syndrome',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/ehlers-danlos-syndrome/',
  },
];

export function getCareReference(id: string): CareReference | null {
  return CARE_REFERENCES.find((reference) => reference.id === id) ?? null;
}
