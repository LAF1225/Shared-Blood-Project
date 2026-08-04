import { ROUTES } from '@/constants/routes';

/**
 * Genetics tool cross-navigation (Module 24 §7/§39).
 *
 * Explicit, CURATED educational transitions between the five active tools — not
 * a recommendation algorithm and not behavioural personalization (§38). This is
 * static display data that lives near the registry/navigation layer; it is never
 * consulted by calculation or resolver logic, and it carries NO genetics state
 * (no parent status, genotype, probability, or relationship result, §39/§117).
 *
 * Every target is one of the five active tools (or a public educational surface);
 * none targets the retired Family Tree (§121).
 */
export interface ToolConnection {
  /** Target tool/surface id (must be an active tool or a public surface). */
  to: string;
  /** Locale-agnostic destination path (locale is applied by the i18n Link). */
  href: string;
  /** i18n key stem within `Genetics.connections`. */
  key: string;
  /** Prefer one primary + one optional secondary action (§40). */
  primary?: boolean;
}

const TOOL = (slug: string) => `${ROUTES.genetics}/${slug}`;

export const TOOL_CONNECTIONS: Record<string, ToolConnection[]> = {
  // Calculator → Punnett (shared renderer) and → DNA mechanism education (§39).
  'inheritance-calculator': [
    { to: 'punnett-square', href: TOOL('punnett-square'), key: 'calcToPunnett', primary: true },
    { to: 'dna-explorer', href: TOOL('dna-explorer'), key: 'calcToDna' },
  ],
  // DNA → Calculator for inheritance education (broader disease context is
  // offered inside the tool's disease-connection step, §57).
  'dna-explorer': [
    { to: 'inheritance-calculator', href: TOOL('inheritance-calculator'), key: 'dnaToCalc', primary: true },
  ],
  // Punnett → Calculator (parent-status exploration) and → Relationship (to
  // explain relationship and genotype are distinct, §39).
  'punnett-square': [
    { to: 'inheritance-calculator', href: TOOL('inheritance-calculator'), key: 'punnettToCalc', primary: true },
    { to: 'relationship-risk', href: TOOL('relationship-risk'), key: 'punnettToRelationship' },
  ],
  // Relationship → Punnett (hypothetical visualization) and → Calculator, with
  // explicit language that genotype is separate from relationship (§39/§58).
  'relationship-risk': [
    { to: 'punnett-square', href: TOOL('punnett-square'), key: 'relationshipToPunnett', primary: true },
    { to: 'inheritance-calculator', href: TOOL('inheritance-calculator'), key: 'relationshipToCalc' },
  ],
  // Evidence Map → Disease pages (condition context) and → Genetics Explorer
  // (general inheritance education). Never into a personal calculator result (§39).
  'pakistan-map': [
    { to: 'diseases', href: ROUTES.diseases, key: 'mapToDiseases', primary: true },
    { to: 'genetics', href: ROUTES.genetics, key: 'mapToGenetics' },
  ],
};

export function getToolConnections(toolSlug: string): ToolConnection[] {
  return TOOL_CONNECTIONS[toolSlug] ?? [];
}
