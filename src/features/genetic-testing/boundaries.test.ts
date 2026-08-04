import { describe, it, expect } from 'vitest';
import { ALL_TESTING_TOPICS, getTestingTopicById } from './data/topics';
import { RESULT_CONCEPTS, getResultConcept } from './data/resultConcepts';
import { GENETIC_COUNSELLING } from './data/counselling';
import { getValidTopics } from './validate';
import { filterTopics, DEFAULT_TESTING_FILTERS } from './filter';

const TOPICS = getValidTopics(ALL_TESTING_TOPICS);

function topicText(id: string): string {
  const t = getTestingTopicById(id)!;
  return [
    t.title.en,
    t.shortDescription.en,
    t.whatItIs.en,
    t.whyItMayBeDiscussed.en,
    t.whatItCanTellYou.en,
    t.whatItCannotTellYou.en,
    t.beforeTesting.en,
    t.afterTesting.en,
    ...t.questionsToAsk.map((q) => q.en),
    t.contentNotice?.en ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

const ALL_TEXT = TOPICS.map((t) => topicText(t.id)).join(' ');

/**
 * Scientific & ethical boundary tests (spec §86/§87). These encode the guardrails
 * that keep Module 15 a genetic-testing EDUCATION system rather than a diagnosis,
 * compatibility, marriage-decision, or reproductive-decision engine.
 */
describe('Genetic-testing boundaries (spec §86/§87)', () => {
  it('no topic carries a risk / result / compatibility / upload / variant field (spec §29/§30/§86)', () => {
    const forbidden = [
      'score', 'probability', 'riskLevel', 'compatibility', 'uploadUrl', 'reportUrl',
      'variant', 'rsid', 'cNotation', 'pNotation', 'pedigree', 'symptomData', 'calculatorResult',
    ];
    for (const topic of TOPICS) {
      for (const key of forbidden) expect(topic).not.toHaveProperty(key);
    }
  });

  it('uses NO eugenic or purity terminology (spec §33)', () => {
    const eugenic = [
      'better genes', 'bad genes', 'pure blood', 'genetically fit', 'genetically unfit',
      'defective families', 'inferior genetics', 'healthy bloodline', 'clean genetics',
      'genetic compatibility approval', 'compatibility score',
    ];
    const haystack = [ALL_TEXT, GENETIC_COUNSELLING.whatItIs.en.toLowerCase()].join(' ');
    for (const term of eugenic) expect(haystack).not.toContain(term);
  });

  it('never issues a directive to marry / not marry / not have children / terminate / use IVF (spec §2/§34)', () => {
    const directive = /you should not marry|do not marry|should not have children|must not have children|you should terminate|must terminate|you should use ivf|are genetically incompatible/;
    expect(ALL_TEXT).not.toMatch(directive);
  });

  it('genetic counselling is framed as NON-DIRECTIVE and disclaims decisions (spec §32/§66)', () => {
    const notDone = GENETIC_COUNSELLING.whatItDoesNotDo.map((x) => x.en.toLowerCase()).join(' ');
    expect(notDone).toMatch(/marry|marriage/);
    expect(notDone).toMatch(/children|pregnancy/);
    expect(notDone).toMatch(/compatible|incompatible/);
  });

  it('VUS is explained but never classified (spec §27)', () => {
    const vus = getResultConcept('VARIANT_OF_UNCERTAIN_SIGNIFICANCE')!;
    expect(vus.whatItDoesNotMean.en.toLowerCase()).toContain('does not classify');
    expect(vus.whatItDoesNotMean.en.toLowerCase()).toMatch(/not confirmation|not .* confirm/);
  });

  it('a negative result is never called "genetically clear" or "no risk" (spec §28)', () => {
    const neg = getResultConcept('NEGATIVE_RESULT')!;
    const text = neg.whatItDoesNotMean.en.toLowerCase();
    expect(text).toContain('genetically clear');
    expect(text).toContain('no risk');
    // …only ever as the thing it does NOT mean.
    expect(text).toMatch(/does not mean/);
  });

  it('beta-thalassemia carrier education never equates carrier with major disease (spec §20)', () => {
    const text = topicText('bt-carrier-education');
    expect(text).toMatch(/does not mean a person has beta thalassemia major|not the same as/);
    expect(text).toContain('carrier');
  });

  it('CF carrier education keeps the limited-panel caveat (spec §21)', () => {
    const notice = getTestingTopicById('cf-carrier-education')!.contentNotice!.en.toLowerCase();
    expect(notice).toMatch(/does not mean .* no cf risk|limited/);
  });

  it('there is no single "LSD genetic test" (spec §22)', () => {
    const text = topicText('lsd-testing-overview');
    expect(text).toMatch(/no single .* test|differs between/);
  });

  it('hypermobile EDS is not given a routine confirmatory molecular test (spec §23)', () => {
    const text = topicText('eds-hypermobile-testing');
    expect(text).toMatch(/no .* confirmatory (genetic|molecular) test|no single confirmatory/);
    expect(text).toMatch(/clinical/);
  });

  it('population screening makes no Pakistani enforcement claim (spec §40/§73)', () => {
    const notice = getTestingTopicById('gt-population-screening')!.contentNotice!.en.toLowerCase();
    expect(notice).toMatch(/does not|not currently/);
    expect(notice).toMatch(/mandatory|enforced|law/);
  });

  it('uses no lab ranking, marketplace, or booking language (spec §53/§58)', () => {
    const banned = /best genetic lab|cheapest dna test|top carrier screening lab|recommended genetic testing company|book a genetic test|testing near me|compare test prices/;
    expect(ALL_TEXT).not.toMatch(banned);
  });

  it('contains no maternal-blame language (spec §62)', () => {
    expect(ALL_TEXT).not.toMatch(/mother'?s fault|blame the mother|the mother is responsible|because of the mother/);
  });

  it('every topic and result concept has at least one reference (spec §71)', () => {
    for (const topic of TOPICS) expect(topic.referenceIds.length).toBeGreaterThan(0);
    for (const concept of RESULT_CONCEPTS) expect(concept.referenceIds.length).toBeGreaterThan(0);
  });

  it('all shipped topics pass validation (dataset integrity, spec §85)', () => {
    expect(TOPICS.length).toBe(ALL_TESTING_TOPICS.length);
    expect(filterTopics(TOPICS, DEFAULT_TESTING_FILTERS).length).toBe(ALL_TESTING_TOPICS.length);
  });
});
