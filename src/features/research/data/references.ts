/**
 * Literature references for research findings (spec §18/§85/§92). All external
 * research context resolves through these Module 07 reference ids — Module 18 does
 * NOT maintain a parallel citation database (spec §92) and never fabricates
 * citation metadata (spec §85). Real organisation/journal pages only.
 */
export interface ResearchReference {
  id: string;
  title: string;
  publication: string;
  year?: number;
  url?: string;
}

export const RESEARCH_REFERENCES: readonly ResearchReference[] = [
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
    id: 'who-consanguinity',
    title: 'Community genetics services and consanguinity',
    publication: 'World Health Organization, Human Genetics Programme',
    url: 'https://www.who.int/genomics/public/geneticdiseases/en/',
  },
  {
    id: 'ncbi-thalassaemia-pakistan',
    title: 'Prevention of beta-thalassaemia in Pakistan (referenced context)',
    publication: 'Journal of Pediatric Hematology / peer-reviewed literature',
    year: 2002,
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
];

export function getResearchReference(id: string): ResearchReference | null {
  return RESEARCH_REFERENCES.find((r) => r.id === id) ?? null;
}

/**
 * Resolve a list of reference ids for a finding/report reference list (spec §85):
 * removes duplicates, preserves citation order, drops ids that do not resolve
 * (never invents metadata).
 */
export function resolveReferences(ids: readonly string[]): ResearchReference[] {
  const seen = new Set<string>();
  const out: ResearchReference[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    const ref = getResearchReference(id);
    if (ref) out.push(ref);
  }
  return out;
}
