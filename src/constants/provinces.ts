/**
 * Province identifiers for the Pakistan Disease Map (Module 13).
 * IDs only — geographic data and statistics arrive with that module.
 */
export const PROVINCE_IDS = [
  'punjab',
  'sindh',
  'khyber-pakhtunkhwa',
  'balochistan',
  'gilgit-baltistan',
  'azad-jammu-kashmir',
  'islamabad',
] as const;

export type ProvinceId = (typeof PROVINCE_IDS)[number];
