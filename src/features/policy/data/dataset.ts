import type { PolicyAdvocacyDataset } from '../types';

/**
 * PRODUCTION public policy & advocacy data (spec §16/§107/§112).
 *
 * INTEGRITY DECISION (consistent with Modules 06/12/16/17/18): Module 19 consumes
 * APPROVED Module 18 research findings (its preferred evidence source, spec §12/
 * §97). Module 18 ships an EMPTY production dataset (because Modules 16/17 have no
 * approved data yet), so there are NO approved research findings — and a
 * PolicyIssue/AdvocacyPriority cannot render without a resolving evidence source
 * (spec §7/§16/§75). Fabricating advocacy would violate §15 ("do not automatically
 * convert research findings into policy demands"), §112 ("do not generate
 * placeholder positions"), and the whole evidence-traceability architecture.
 *
 * Therefore the production dataset is EMPTY. With no approved priorities/briefs the
 * public page renders the §112 empty states — the honest, correct output. The full
 * system (evidence resolution, priorities, "What This Advocacy Does Not Claim",
 * recommendations, briefs, stakeholders, limitations, traceability) is exercised
 * by a clearly-synthetic sample (`../preview/sampleDataset`) built from the Module
 * 18 SAMPLE findings — used only in a dev-only preview route and unit tests.
 */
export const PUBLIC_POLICY_DATASET: PolicyAdvocacyDataset | null = null;
