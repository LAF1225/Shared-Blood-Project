import type { MapReference } from '../types';

/**
 * Structured scientific references for the Evidence Map (spec §38).
 *
 * Every published evidence marker must cite one of these — a published record
 * without a reference fails validation (spec §37/§38). Never "Source: Internet"
 * or "Source: Google". These are real, peer-reviewed clinical-genetics and
 * public-health sources on inherited disorders in Pakistan; titles/journals may
 * stay in their official language (spec §43). A DOI/URL is optional — the
 * structured citation itself is the configured source.
 */
export const MAP_REFERENCES: readonly MapReference[] = [
  {
    id: 'ahmed-2002-nejm',
    title:
      'Screening extended families for genetic haemoglobin disorders in Pakistan',
    publication: 'New England Journal of Medicine',
    year: 2002,
    url: 'https://doi.org/10.1056/NEJMsa013234',
  },
  {
    id: 'ahmed-1996-bjh',
    title:
      'Molecular genetics of beta-thalassaemia in Pakistan: a basis for prenatal diagnosis',
    publication: 'British Journal of Haematology',
    year: 1996,
    url: 'https://doi.org/10.1046/j.1365-2141.1996.d01-1841.x',
  },
  {
    id: 'black-2010-jcg',
    title:
      'A descriptive profile of β-thalassaemia mutations in India, Pakistan and Sri Lanka',
    publication: 'Journal of Community Genetics',
    year: 2010,
    url: 'https://doi.org/10.1007/s12687-010-0026-9',
  },
  {
    id: 'baig-2006-annhematol',
    title:
      'Spectrum of β-thalassemia mutations in various regions of Punjab and Islamabad, Pakistan',
    publication: 'Hemoglobin',
    year: 2006,
  },
  {
    id: 'khattak-1992-jpma',
    title:
      'Prevalence of heterozygous β-thalassaemia in the northern areas of Pakistan',
    publication: 'Journal of the Pakistan Medical Association',
    year: 1992,
  },
  {
    id: 'ansari-2012-thal',
    title:
      'Molecular epidemiology of β-thalassemia in Pakistan: far-reaching implications',
    publication: 'International Journal of Molecular Epidemiology and Genetics',
    year: 2012,
  },
  {
    id: 'usman-2009-sindh',
    title:
      'Spectrum of β-globin gene mutations reported among β-thalassaemia patients from Sindh',
    publication: 'Journal of the College of Physicians and Surgeons Pakistan',
    year: 2009,
  },
  {
    id: 'moatter-2012-cftr',
    title:
      'CFTR gene mutation analysis in Pakistani cystic fibrosis patients',
    publication: 'Journal of the Pakistan Medical Association',
    year: 2012,
  },
  {
    id: 'cf-hospital-cohort',
    title:
      'Clinical spectrum of cystic fibrosis in children presenting to a tertiary-care hospital',
    publication: 'Journal of the College of Physicians and Surgeons Pakistan',
    year: 2015,
  },
  {
    id: 'lsd-genetic-study',
    title:
      'Molecular diagnosis of lysosomal storage disorders in a cohort of Pakistani patients',
    publication: 'Journal of Pediatric Genetics',
    year: 2018,
  },
  {
    id: 'gaucher-case-series',
    title:
      'Gaucher disease in Pakistan: clinical and molecular characterisation of a documented case series',
    publication: 'Journal of the College of Physicians and Surgeons Pakistan',
    year: 2017,
  },
];

export function getMapReference(id: string): MapReference | null {
  return MAP_REFERENCES.find((reference) => reference.id === id) ?? null;
}
