/**
 * Scientific references backing fieldwork educational materials (spec §8/§45/§50).
 *
 * Module 17 educational resources (learning booklets, caregiver guides) must
 * reference medical educational sources through the Module 07 reference
 * architecture (spec §45/§50) — a resource's `referenceIds` are validated against
 * this registry. Real organisation pages only; no fabricated citations.
 */
export interface CommunityReference {
  id: string;
  title: string;
  publication: string;
  url?: string;
}

export const COMMUNITY_REFERENCES: readonly CommunityReference[] = [
  {
    id: 'medlineplus-beta-thalassemia',
    title: 'Beta thalassemia',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/beta-thalassemia/',
  },
  {
    id: 'medlineplus-cystic-fibrosis',
    title: 'Cystic fibrosis',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/cystic-fibrosis/',
  },
  {
    id: 'medlineplus-inheritance',
    title: 'What are the different ways a genetic condition can be inherited?',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/',
  },
  {
    id: 'medlineplus-carrier',
    title: 'What is carrier testing?',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/testing/carriertesting/',
  },
  {
    id: 'who-genetics',
    title: 'Genetics and human disease',
    publication: 'World Health Organization',
    url: 'https://www.who.int/health-topics/genetics',
  },
  {
    id: 'ncbi-lsd-overview',
    title: 'Lysosomal storage disorders, overview',
    publication: 'MedlinePlus / National Library of Medicine',
    url: 'https://medlineplus.gov/ency/article/001208.htm',
  },
];

export function getCommunityReference(id: string): CommunityReference | null {
  return COMMUNITY_REFERENCES.find((r) => r.id === id) ?? null;
}
