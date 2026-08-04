import { describe, it, expect } from 'vitest';
import {
  FEATURE_AUDIT_RECORDS,
  classificationCounts,
  governanceViolations,
  REDUNDANCY_RECORDS,
  MISSING_FEATURE_RECORDS,
  MODULE_COMPARISONS,
  MODULE_22_CANDIDATES,
  MODULE_23_CANDIDATES,
  MODULE_24_CANDIDATES,
  MODULE_25_CANDIDATES,
  HUMAN_DECISIONS_REQUIRED,
  SCOPE_LOCK,
} from './index';

/**
 * Module 21 audit self-consistency (spec §5/§55/§65).
 * These assertions make the audit "independently reviewable" (spec §65): every
 * feature carries exactly one valid classification, every MISSING item routes to
 * a follow-up module, the scope lock stays unapproved, and the DNA tool is
 * recorded MISSING/HIGH → Module 22 (spec §27/§60).
 */
const CLASSIFICATIONS = ['KEEP', 'MODIFY', 'MERGE', 'REMOVE', 'MISSING', 'BROKEN'];
const PRIORITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

describe('Module 21 feature audit records', () => {
  it('assigns every feature exactly one valid classification and priority (spec §5)', () => {
    for (const r of FEATURE_AUDIT_RECORDS) {
      expect(CLASSIFICATIONS, `${r.id} classification`).toContain(r.classification);
      expect(PRIORITIES, `${r.id} priority`).toContain(r.priority);
    }
  });

  it('uses unique record ids', () => {
    const ids = FEATURE_AUDIT_RECORDS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cites evidence for every MISSING and BROKEN feature (spec §56)', () => {
    for (const r of FEATURE_AUDIT_RECORDS) {
      if (r.classification === 'MISSING' || r.classification === 'BROKEN') {
        const evidence = [...r.routes, ...r.components, ...r.dataSources];
        expect(evidence.length, `${r.id} needs evidence`).toBeGreaterThan(0);
      }
    }
  });

  it('routes every REMOVE/MISSING recommendation to a follow-up module (spec §9/§45)', () => {
    for (const r of FEATURE_AUDIT_RECORDS) {
      if (r.classification === 'REMOVE' || r.classification === 'MISSING') {
        expect(r.recommendedModule, `${r.id} needs a target module`).toBeDefined();
      }
    }
  });

  it('records the disease-linked DNA tool as IMPLEMENTED after Module 22 (spec §27/§60/§65)', () => {
    // Module 21 recorded this MISSING/HIGH → Module 22; Module 22 implemented it.
    const dna = FEATURE_AUDIT_RECORDS.find((r) => r.id === 'dna-interactive-tool');
    expect(dna).toBeDefined();
    expect(dna!.classification).toBe('KEEP');
    expect(dna!.implementationStatus).toBe('IMPLEMENTED');
  });

  it('flags no unresolved governance violations at audit time (spec §42)', () => {
    // Any true violation would be CRITICAL (spec §42); none found in this audit.
    expect(governanceViolations()).toHaveLength(0);
  });

  it('has covered every classification bucket meaningfully', () => {
    const counts = classificationCounts();
    expect(counts.KEEP).toBeGreaterThan(0);
    expect(counts.MISSING).toBeGreaterThan(0);
    expect(counts.REMOVE).toBeGreaterThan(0);
    expect(counts.MODIFY).toBeGreaterThan(0);
  });
});

describe('Module 21 registries', () => {
  it('gives every redundancy record a recommended action + reasoning (spec §30)', () => {
    for (const r of REDUNDANCY_RECORDS) {
      expect(r.recommendedAction).toBeTruthy();
      expect(r.reasoning.length).toBeGreaterThan(0);
    }
  });

  it('routes every missing-feature record to a follow-up module (spec §45)', () => {
    const modules = ['MODULE_22', 'MODULE_23', 'MODULE_24', 'MODULE_25'];
    for (const r of MISSING_FEATURE_RECORDS) {
      expect(modules).toContain(r.recommendedModule);
    }
    expect(MISSING_FEATURE_RECORDS.some((r) => r.id === 'miss-dna-tool')).toBe(true);
  });

  it('compares all of Modules 01–20 without fabricated percentages (spec §44)', () => {
    // No numeric completion percentages — only the allowed categorical estimates.
    const allowed = ['COMPLETE', 'MOSTLY_COMPLETE', 'PARTIAL', 'MINIMAL', 'NOT_IMPLEMENTED', 'BLOCKED'];
    for (const m of MODULE_COMPARISONS) {
      expect(allowed).toContain(m.completionEstimate);
    }
    // Governance (Module 20) must be COMPLETE.
    expect(MODULE_COMPARISONS.find((m) => m.moduleId === '20')!.completionEstimate).toBe('COMPLETE');
  });

  it('populates the Module 22–25 candidate registries (spec §46–§49)', () => {
    expect(MODULE_22_CANDIDATES.length).toBeGreaterThan(0);
    expect(MODULE_23_CANDIDATES.length).toBeGreaterThan(0);
    expect(MODULE_24_CANDIDATES.length).toBeGreaterThan(0);
    expect(MODULE_25_CANDIDATES.length).toBeGreaterThan(0);
    // The DNA tool is the flagship Module 22 candidate.
    expect(MODULE_22_CANDIDATES.some((c) => c.id === 'm22-dna-tool')).toBe(true);
  });

  it('records human decisions with a recommended + alternative options (spec §52)', () => {
    expect(HUMAN_DECISIONS_REQUIRED.length).toBeGreaterThan(0);
    for (const d of HUMAN_DECISIONS_REQUIRED) {
      expect(d.recommendedOption).toBeTruthy();
      expect(d.alternativeOptions.length).toBeGreaterThan(0);
    }
  });

  it('keeps the scope lock UNAPPROVED — no fabricated approvals (spec §55)', () => {
    expect(SCOPE_LOCK.version).toBeNull();
    expect(SCOPE_LOCK.createdAt).toBeNull();
    expect(SCOPE_LOCK.approvedFeatures).toHaveLength(0);
    expect(SCOPE_LOCK.approvedRemovals).toHaveLength(0);
    expect(SCOPE_LOCK.approvedMerges).toHaveLength(0);
    expect(SCOPE_LOCK.approvedMissingFeatureImplementations).toHaveLength(0);
  });
});
