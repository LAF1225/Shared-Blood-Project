import { describe, it, expect } from 'vitest';
import { ALL_CARE_RECORDS, CARE_RECORDS_BY_DISEASE, getCareRecordById } from './data/careRecords';
import { SUPPORT_ITEMS, getSupportItem } from './data/supportItems';
import { getValidCareRecords, getValidSupportItems } from './validate';
import { filterCareRecords, DEFAULT_CARE_FILTERS } from './filter';

const RECORDS = getValidCareRecords(ALL_CARE_RECORDS);
const ITEMS = getValidSupportItems(SUPPORT_ITEMS);

function careText(id: string): string {
  const r = getCareRecordById(id)!;
  return [
    r.title.en,
    r.shortDescription.en,
    r.whyItMayMatter.en,
    ...r.practicalConsiderations.map((p) => p.en),
    ...r.caregiverExpectations.map((p) => p.en),
    ...r.questionsToAsk.map((p) => p.en),
    r.contentNotice?.en ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

function itemText(id: string): string {
  const i = getSupportItem(id)!;
  return [i.name.en, i.genericName.en, i.description.en, i.potentialUse.en, i.purchaseGuidance?.en ?? '', i.safetyNotice.en]
    .join(' ')
    .toLowerCase();
}

/**
 * Scientific & ethical boundary tests (spec §77). These encode the guardrails
 * that keep Module 14 a practical-care education system rather than a treatment
 * planner, marketplace, or care-plan generator.
 */
describe('Care & Support boundaries (spec §77)', () => {
  it('no care record carries a commercial / clinical-prescription field (spec §63/§82)', () => {
    const forbidden = ['price', 'buyUrl', 'retailer', 'affiliateId', 'brand', 'rating', 'dose', 'score', 'sponsored'];
    for (const record of RECORDS) {
      for (const key of forbidden) expect(record).not.toHaveProperty(key);
    }
  });

  it('is disease-first: no records resolve without a chosen disease (spec §58)', () => {
    expect(filterCareRecords(RECORDS, DEFAULT_CARE_FILTERS)).toHaveLength(0);
  });

  it('no care record contains a medication dose / schedule pattern (spec §39/§82)', () => {
    const dose = /\d+\s?(mg|ml|mcg|iu)\b|\d+\s?times a day|every \d+ hours/;
    for (const record of RECORDS) {
      const text = careText(record.id);
      expect(text).not.toMatch(dose);
    }
  });

  it('beta-thalassemia energy guidance warns against starting iron without assessment (spec §27)', () => {
    const notice = careText('bt-energy-and-rest');
    expect(notice).toContain('do not start iron');
    expect(notice).toMatch(/assessment|assessed/);
  });

  it('EDS does not automatically recommend braces / mobility aids on the label alone (spec §24)', () => {
    for (const record of CARE_RECORDS_BY_DISEASE['ehlers-danlos-syndrome']) {
      const text = careText(record.id);
      // Any mention of a support is qualified — never an automatic recommendation.
      if (/brace|splint|compression|mobility aid|support/.test(text)) {
        expect(text).toMatch(/individual assessment|not automatic|never recommended|only after|some|not needed|appropriate/);
      }
    }
    const joint = getCareRecordById('eds-joint-support-awareness')!;
    expect(joint.contentNotice?.en.toLowerCase()).toMatch(/never recommended based on the diagnosis alone|individual/);
  });

  it('EDS never clears or bans a child for activity (spec §33)', () => {
    const record = getCareRecordById('eds-activity-and-participation')!;
    const activity = careText(record.id);
    expect(activity).toMatch(/individual|adapt|participation/);
    // The one mention of "allowed or banned activities" must be a disclaimer that
    // the module does NOT provide them — never a positive clearance.
    expect(record.contentNotice?.en.toLowerCase()).toMatch(/does not clear|not .* provide .* allowed or banned/);
  });

  it('LSD guidance always uses group / subtype qualifiers (spec §28)', () => {
    for (const record of CARE_RECORDS_BY_DISEASE['lysosomal-storage-disorders']) {
      const text = careText(record.id);
      expect(text).toMatch(/some|depending|varies|not all|specific disorder|broad group/);
    }
  });

  it('CF does not provide device settings or treatment-frequency prescriptions (spec §25)', () => {
    for (const record of CARE_RECORDS_BY_DISEASE['cystic-fibrosis']) {
      const text = careText(record.id);
      // "settings"/"cleaning" may appear only inside a statement that the care team decides them.
      if (/settings|cleaning protocol|how often/.test(text)) {
        expect(text).toMatch(/care team|taught|decided|not provide|only from/);
      }
    }
  });

  it('every support item is generic — no brands, retailers, prices, or links (spec §20/§53/§61/§63)', () => {
    // Retail/brand markers. A bare "buy" is allowed only inside safety warnings
    // (e.g. "do not buy … on your own"), so we target retail-buy phrasing instead.
    const commercial = /amazon|ebay|daraz|buy now|buy it|where to buy|http|www\.|\$|₨|\brs\.?\s?\d|price|affiliate|discount|®|™/;
    for (const item of ITEMS) {
      expect(itemText(item.id)).not.toMatch(commercial);
    }
  });

  it('every support item has a text-based safety notice (spec §70)', () => {
    for (const item of ITEMS) {
      expect(item.safetyNotice.en.trim().length).toBeGreaterThan(0);
      expect(item.safetyNotice.ur.trim().length).toBeGreaterThan(0);
    }
  });

  it('device statuses follow the spec examples: wheelchair-class aid requires assessment, folder is non-medical (spec §21)', () => {
    expect(getSupportItem('mobility-aid')!.medicalDeviceStatus).toBe('PROFESSIONAL_ASSESSMENT_REQUIRED');
    expect(getSupportItem('joint-support-device')!.medicalDeviceStatus).toBe('PROFESSIONAL_ASSESSMENT_REQUIRED');
    expect(getSupportItem('medical-document-folder')!.medicalDeviceStatus).toBe('NON_MEDICAL_SUPPORT_ITEM');
  });

  it('any item needing professional guidance is not marked as a plain non-medical item (spec §21/§22)', () => {
    for (const item of ITEMS) {
      if (item.professionalGuidanceRequired) {
        expect(item.medicalDeviceStatus).not.toBe('NON_MEDICAL_SUPPORT_ITEM');
      }
    }
  });

  it('all shipped care records and support items pass validation (dataset integrity)', () => {
    expect(RECORDS.length).toBe(ALL_CARE_RECORDS.length);
    expect(ITEMS.length).toBe(SUPPORT_ITEMS.length);
  });
});
