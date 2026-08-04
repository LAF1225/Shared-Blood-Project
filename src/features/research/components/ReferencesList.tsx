import { resolveReferences } from '../data/references';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A resolved reference list (spec §85). Resolves Module 07 reference ids —
 * de-duplicated, in citation order, dropping ids that do not resolve — and never
 * invents citation metadata. Renders nothing when no references resolve.
 */
export function ReferencesList({
  referenceIds,
  t,
}: {
  referenceIds: readonly string[];
  t: Translator;
}) {
  const refs = resolveReferences(referenceIds);
  if (refs.length === 0) return null;

  return (
    <section aria-labelledby="references-heading" className="space-y-2">
      <h3 id="references-heading" className="font-heading text-lg font-semibold text-foreground">
        {t('finding.references')}
      </h3>
      <ol className="space-y-1.5 text-sm text-foreground/85">
        {refs.map((ref, index) => (
          <li key={ref.id} className="flex gap-2">
            <span className="text-muted-foreground tabular-nums">{index + 1}.</span>
            <span>
              {ref.title}. <span className="text-muted-foreground">{ref.publication}</span>
              {ref.year ? ` (${ref.year})` : ''}
              {ref.url && (
                <>
                  {' '}
                  <a href={ref.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    {t('finding.source')}
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
