import { getDiseaseIdentity } from '@/features/diseases/data/diseases';

/**
 * Educational disease-context parsing (Module 24 §72/§73).
 *
 * The ONLY cross-tool context that may travel is a canonical disease id via
 * `?disease=<canonical-id>`. The value must resolve to a canonical disease
 * identity or it is ignored safely (§72). Genotype, carrier, parent status,
 * probability, risk, and relationship parameters are NEVER read for transfer
 * (§73) — this function only ever inspects `disease`.
 *
 * Feature support is NOT assumed here: a valid canonical disease is not
 * automatically supported by DNA or the calculator (§73). Each tool checks
 * support through its own resolver/configuration after receiving the id.
 */
export function parseDiseaseContext(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value !== 'string') return undefined;
  return getDiseaseIdentity(value) ? value : undefined;
}
