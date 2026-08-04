import type { ResearchFindingsDataset } from '../types';

/**
 * PRODUCTION public research data (spec §9/§106/§110).
 *
 * INTEGRITY DECISION (consistent with Modules 06/12/16/17): Module 18 consumes
 * APPROVED Module 16 (survey) and Module 17 (fieldwork) evidence. Both of those
 * ship EMPTY production datasets — no real survey has been collected/approved and
 * no fieldwork has been documented/approved yet. A ResearchFinding cannot exist
 * without a traceable, approved source (spec §9), so there are NO approvable
 * findings, reports, or an approved source registry in production. Fabricating
 * findings would violate §14 ("do not automatically turn project data into
 * scientific claims"), §110 ("do not create placeholder findings"), and the whole
 * source-traceability architecture.
 *
 * Therefore the production dataset is EMPTY. With no approved findings/reports the
 * public page renders the §110 empty states — the honest, correct output. The full
 * system (source resolution, statistics, findings, "What This Does Not Show",
 * reports, visualizations, methodology, limitations) is exercised by a clearly-
 * synthetic sample (`../preview/sampleDataset`) built from the Module 16/17 SAMPLE
 * data, used only in a dev-only preview route and unit tests — never public.
 */
export const PUBLIC_RESEARCH_DATASET: ResearchFindingsDataset | null = null;
