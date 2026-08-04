import type { TestingReference } from '../types';

/**
 * Curated genetics / testing references (spec §71/§72 — Module 07 architecture).
 * Every topic and result concept making a medical or genetic claim must cite at
 * least one of these, or it fails validation (spec §71/§85). Sources follow the
 * spec hierarchy (§72): clinical-genetics guidelines, professional genetics
 * organisations, government health authorities, recognised medical bodies,
 * peer-reviewed reviews, and authoritative rare-disease resources.
 *
 * POLICY BOUNDARY (spec §73): nothing here asserts that a Pakistani premarital-
 * screening law, fine, or programme is currently mandatory or enforced — such
 * claims would need current jurisdiction-specific evidence, which V1 does not
 * hard-code. Real organisation pages only; never a runtime-generated source.
 */
export const TESTING_REFERENCES: readonly TestingReference[] = [
  // ---- General genetics & testing concepts ----
  {
    id: 'medlineplus-genetic-testing',
    title: 'What is genetic testing?',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/testing/genetictesting/',
  },
  {
    id: 'medlineplus-carrier-testing',
    title: 'What is carrier testing?',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/testing/carriertesting/',
  },
  {
    id: 'medlineplus-vus',
    title: 'What does it mean to have a variant of uncertain significance?',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/testing/uncertainsignificance/',
  },
  {
    id: 'nhgri-genetic-testing-faq',
    title: 'Regulation of Genetic Tests / Genetic Testing FAQ',
    publication: 'National Human Genome Research Institute (NHGRI)',
    url: 'https://www.genome.gov/about-genomics/policy-issues/Regulation-of-Genetic-Tests',
  },
  {
    id: 'nsgc-what-is-gc',
    title: 'About Genetic Counselors, what genetic counseling is',
    publication: 'National Society of Genetic Counselors (NSGC)',
    url: 'https://www.nsgc.org/About/About-Genetic-Counselors',
  },
  {
    id: 'nhs-genetic-testing',
    title: 'Genetic and genomic testing',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/conditions/genetic-and-genomic-testing/',
  },
  {
    id: 'nhs-screening-vs-diagnostic',
    title: 'Screening tests in pregnancy, how screening differs from diagnostic testing',
    publication: 'NHS (United Kingdom)',
    url: 'https://www.nhs.uk/pregnancy/your-pregnancy-care/screening-tests/',
  },
  {
    id: 'who-community-genetics',
    title: 'Community genetics services and management of genetic disorders',
    publication: 'World Health Organization',
    url: 'https://www.who.int/genomics/en/',
  },
  {
    id: 'genereviews',
    title: 'GeneReviews, expert-authored, peer-reviewed disease descriptions',
    publication: 'University of Washington / NCBI Bookshelf',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK1116/',
  },

  // ---- Beta thalassemia ----
  {
    id: 'medlineplus-beta-thalassemia',
    title: 'Beta thalassemia',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/beta-thalassemia/',
  },
  {
    id: 'tif-carrier',
    title: 'About Thalassaemia, carriers and trait',
    publication: 'Thalassaemia International Federation',
    url: 'https://thalassaemia.org.cy/haemoglobin-disorders/',
  },
  {
    id: 'ahmed-thalassaemia-pakistan',
    title: 'Prenatal diagnosis and carrier screening for beta-thalassaemia in Pakistan',
    publication: 'Ahmed S. et al., peer-reviewed literature on thalassaemia prevention in Pakistan',
    year: 2002,
    url: 'https://pubmed.ncbi.nlm.nih.gov/12393529/',
  },

  // ---- Cystic fibrosis ----
  {
    id: 'medlineplus-cystic-fibrosis',
    title: 'Cystic fibrosis',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/cystic-fibrosis/',
  },
  {
    id: 'cff-carrier-testing',
    title: 'Carrier Testing for Cystic Fibrosis',
    publication: 'Cystic Fibrosis Foundation',
    url: 'https://www.cff.org/intro-cf/testing-cystic-fibrosis',
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

  // ---- Ehlers-Danlos syndrome ----
  {
    id: 'eds-society-types',
    title: 'The Types of Ehlers-Danlos Syndromes, diagnosis and testing by subtype',
    publication: 'The Ehlers-Danlos Society',
    url: 'https://www.ehlers-danlos.com/what-is-eds/',
  },
  {
    id: 'medlineplus-eds',
    title: 'Ehlers-Danlos syndrome',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/ehlers-danlos-syndrome/',
  },
];

export function getTestingReference(id: string): TestingReference | null {
  return TESTING_REFERENCES.find((reference) => reference.id === id) ?? null;
}
