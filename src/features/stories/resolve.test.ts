import { describe, it, expect } from 'vitest';
import {
  resolveByDisease,
  resolveByDiseaseAndSubtype,
  resolveById,
  resolvePublicStories,
  diseasesWithStories,
} from './resolve';
import { SAMPLE_STORY_RECORDS, getSampleConsent } from './preview/sampleStories';
import { STORY_RECORDS } from './data/stories';

const byDisease = (id: string) => resolveByDisease(SAMPLE_STORY_RECORDS, getSampleConsent, id);

describe('Story resolver — publication + consent filtering (spec §15/§16/§57)', () => {
  it('returns only PUBLISHED, consent-cleared stories for a disease', () => {
    const stories = byDisease('beta-thalassemia');
    // parent (featured), doctor (role-only), anonymous patient — but NOT the
    // DRAFT and NOT the WITHDRAWN-consent story.
    expect(stories.map((s) => s.id)).toEqual([
      'sample-bt-parent-001',
      'sample-bt-doctor-001',
      'sample-bt-patient-anon-001',
    ]);
  });

  it('orders by displayOrder (spec §40)', () => {
    const orders = byDisease('beta-thalassemia').map((s) => s.displayOrder);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('resolves a single story for cystic fibrosis', () => {
    expect(byDisease('cystic-fibrosis').map((s) => s.id)).toEqual(['sample-cf-parent-001']);
  });

  it('returns an empty list for a disease with no published stories (spec §39)', () => {
    expect(byDisease('ehlers-danlos-syndrome')).toEqual([]);
  });

  it('excludes a DRAFT story (spec §16)', () => {
    expect(byDisease('beta-thalassemia').some((s) => s.id === 'sample-bt-draft-001')).toBe(false);
  });

  it('excludes a story whose consent was WITHDRAWN (spec §18/§58)', () => {
    expect(byDisease('beta-thalassemia').some((s) => s.id === 'sample-bt-withdrawn-001')).toBe(false);
    expect(resolveById(SAMPLE_STORY_RECORDS, getSampleConsent, 'sample-bt-withdrawn-001')).toBeNull();
  });

  it('resolveById returns null for a draft and a sanitized story for a published one', () => {
    expect(resolveById(SAMPLE_STORY_RECORDS, getSampleConsent, 'sample-bt-draft-001')).toBeNull();
    const story = resolveById(SAMPLE_STORY_RECORDS, getSampleConsent, 'sample-bt-parent-001');
    expect(story).not.toBeNull();
    expect(story).not.toHaveProperty('consentRecordId');
    expect(story).not.toHaveProperty('publicationStatus');
  });
});

describe('subtype resolution (spec §15)', () => {
  it('filters by disease and subtype', () => {
    // None of the sample stories carry a subtype, so a subtype query is empty.
    expect(resolveByDiseaseAndSubtype(SAMPLE_STORY_RECORDS, getSampleConsent, 'beta-thalassemia', 'x')).toEqual([]);
  });
});

describe('ethical boundaries (spec §50/§51/§63)', () => {
  it('resolved stories never expose private identity for anonymous speakers', () => {
    const anon = byDisease('beta-thalassemia').find((s) => s.id === 'sample-bt-patient-anon-001');
    expect(anon?.identity.displayName).toBeUndefined();
  });

  it('resolved public stories carry no geographic coordinates (not map markers)', () => {
    for (const story of resolvePublicStories(SAMPLE_STORY_RECORDS, getSampleConsent)) {
      expect(story).not.toHaveProperty('latitude');
      expect(story).not.toHaveProperty('longitude');
    }
  });
});

describe('production dataset (spec §20/§39)', () => {
  it('ships empty — real stories are curated offline, so disease pages hide the section', () => {
    expect(STORY_RECORDS).toHaveLength(0);
    expect(diseasesWithStories(STORY_RECORDS, () => null).size).toBe(0);
  });
});
