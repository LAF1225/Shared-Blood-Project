import type { CommunityFieldworkDataset, CommunityImpactFinding } from '../types';

/**
 * PRODUCTION public community fieldwork data (spec §39/§48/§54).
 *
 * ETHICAL / INTEGRITY DECISION: Module 17 documents "proof of execution" — real
 * community work that actually happened (spec §55). Fabricating activities,
 * participant counts, partner names, orphanage outreach, training completions, or
 * photographs would violate the module's own boundaries: planned activities must
 * not appear as completed impact (spec §48), impact must derive only from approved
 * COMPLETED records (spec §27), no vulnerable-individual data may be invented
 * (spec §31/§55), and no promotional or unsupported claims may be generated
 * (spec §43/§44).
 *
 * Therefore the production public dataset is EMPTY until real fieldwork has been
 * conducted, documented, impact-verified, privacy-reviewed, and approved for
 * publication (spec §40). With no approved activities, the public page renders the
 * §48 empty state — "Shared Blood's community work is currently being documented
 * for publication." — which is the honest, correct output.
 *
 * The full presentation, impact calculation, public-record resolution, privacy
 * review, and validation are all exercised by a clearly-synthetic sample dataset
 * (`../preview/sampleDataset`) used ONLY in a dev-only preview route and in unit
 * tests — never shipped to the public page.
 */
export const PUBLIC_DATASET: CommunityFieldworkDataset | null = null;

export const PUBLIC_FINDINGS: readonly CommunityImpactFinding[] = [];
