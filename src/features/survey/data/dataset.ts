import type { SurveyAggregateDataset, SurveyFindingRecord } from '../types';

/**
 * PRODUCTION public survey data (spec §6/§8/§44/§45/§69).
 *
 * ETHICAL / SCIENTIFIC DECISION: Version 1 does not host survey collection, and
 * no real survey has yet been collected, cleaned offline, aggregated, and
 * approved for publication. Fabricating survey statistics for real Pakistani
 * conditions would violate the module's own integrity boundaries (spec §38/§45
 * — "Never fabricate statistics"; spec §69 — "Do not render draft statistics").
 *
 * Therefore the production public dataset is EMPTY until an approved aggregate
 * JSON is produced by the offline pipeline (`scripts/survey/`). With no dataset
 * and no APPROVED_FOR_PUBLICATION findings, the public page renders the §69
 * "findings are being prepared and reviewed" state — the honest, correct output.
 *
 * The complete presentation, charts, validation, and resolution are all exercised
 * by a clearly-synthetic sample dataset (`../preview/sampleDataset`) used only in
 * a dev-only preview route and in unit tests — never shipped to the public page.
 */
export const PUBLIC_DATASET: SurveyAggregateDataset | null = null;

export const PUBLIC_FINDINGS: readonly SurveyFindingRecord[] = [];
