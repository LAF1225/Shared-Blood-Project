import { describe, it, expect } from 'vitest';
import en from '../../../messages/en.json';
import ur from '../../../messages/ur.json';
import { EXTERNAL_LINKS } from '@/constants/config';
import { checkPublicClaim } from '@/features/governance/publication';
import { SURVEY_FORM } from './data/form';

/**
 * The survey page describes the live Google Form. These checks keep the copy
 * honest about it: the form is English only, open to under-18s (it has a
 * "Below 18" age option), and asks for province rather than city.
 */
describe('survey page and the live form', () => {
  it('links the same Google Form as the homepage button', () => {
    expect(SURVEY_FORM.url).toBe(EXTERNAL_LINKS.awarenessSurvey);
  });

  it('describes the form as published: 14 questions, English only, 5 topic groups', () => {
    expect(SURVEY_FORM.questionCount).toBe(14);
    expect(SURVEY_FORM.languages).toEqual(['en']);
    expect(SURVEY_FORM.topics).toHaveLength(5);
    for (const topic of SURVEY_FORM.topics) {
      for (const text of [topic.title, topic.detail]) {
        expect(text.en.trim()).not.toBe('');
        expect(text.ur.trim()).not.toBe('');
        expect(checkPublicClaim(text.en).status).toBe('ALLOWED');
      }
    }
  });

  it('drops claims the form does not support', () => {
    const { overview, empty, methodology } = en.Survey;
    const copy = [overview.purpose, overview.disclaimer, empty.body, ...Object.values(methodology)].join(' ');
    expect(copy).not.toMatch(/18 or older|English or Urdu|surveyed cities|IP address|carrier status, family history/);
    expect(methodology.eligibilityBody).toMatch(/English only/);
    expect(methodology.eligibilityBody).toMatch(/under 18/);
  });

  it('has the invitation wording in both languages', () => {
    for (const catalog of [en, ur]) {
      const take = catalog.Survey.take;
      expect(take.facts.questions).toContain('{count}');
      for (const value of [take.title, take.body, take.cta, take.topicsTitle, take.opensInNewTab]) {
        expect(value.trim()).not.toBe('');
      }
    }
  });
});
