import { describe, it, expect } from 'vitest';
import type { LocalizedText } from '@/types';
import { checkPublicClaim } from '@/features/governance/publication';
import { NTSPR_BRIEF } from './data/ntspr';
import en from '../../../messages/en.json';
import ur from '../../../messages/ur.json';

/** Every bilingual text in the brief, in document order. */
function allTexts(): LocalizedText[] {
  const b = NTSPR_BRIEF;
  return [
    ...b.summary,
    b.figuresIntro,
    ...b.figures.flatMap((f) => [f.value, f.label]),
    b.figuresNote,
    b.lawsIntro,
    ...b.laws.flatMap((law) => [law.region, law.name, law.summary]),
    ...b.gaps.flatMap((g) => [g.title, g.body]),
    b.gapsConclusion,
    b.proposalIntro,
    ...b.measures.flatMap((m) => [m.title, m.body]),
    ...b.safeguards,
  ];
}

describe('NTSPR policy brief', () => {
  it('keeps the structure of the published brief', () => {
    expect(NTSPR_BRIEF.laws.map((law) => law.region.en)).toEqual([
      'Punjab',
      'Islamabad Capital Territory',
      'Khyber Pakhtunkhwa',
      'Sindh',
    ]);
    expect(NTSPR_BRIEF.gaps).toHaveLength(3);
    expect(NTSPR_BRIEF.measures).toHaveLength(7);
  });

  it('has English and Urdu for every text', () => {
    for (const text of allTexts()) {
      expect(text.en.trim()).not.toBe('');
      expect(text.ur.trim()).not.toBe('');
    }
  });

  it('passes the governance public-claim check in both languages', () => {
    for (const text of allTexts()) {
      expect(checkPublicClaim(text.en, 'en').matches, text.en).toEqual([]);
      expect(checkPublicClaim(text.ur, 'ur').matches, text.ur).toEqual([]);
    }
    for (const catalog of [en.Policy, ur.Policy]) {
      for (const value of Object.values(catalog).flatMap((v) => (typeof v === 'string' ? [v] : Object.values(v)))) {
        expect(checkPublicClaim(value).status, value).toBe('ALLOWED');
      }
    }
  });

  it('states the yearly and daily birth figures consistently (9,000 / 365 ≈ 25)', () => {
    const births = NTSPR_BRIEF.figures.find((f) => f.value.en.includes('9,000'));
    expect(births?.label.en).toMatch(/about 25 a day/);
    expect(births?.label.ur).toMatch(/25/);
  });

  it('keeps the safeguards that limit the registry', () => {
    const safeguards = NTSPR_BRIEF.safeguards.map((s) => s.en.toLowerCase()).join(' ');
    expect(safeguards).toMatch(/would not prevent anyone from marrying/);
    expect(safeguards).toMatch(/never carrier status or clinical reports/);
    expect(safeguards).toMatch(/not be added to the national identity database/);
  });
});
