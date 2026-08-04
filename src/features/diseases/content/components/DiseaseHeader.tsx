import { Badge } from '@/components/ui/Badge';

export interface QuickFactVM {
  label: string;
  value: string;
}

/**
 * Disease Header (spec §7 #1, §8). Renders the disease name, category badges,
 * an optional short description, and the "last updated" stamp. All values are
 * pre-localized upstream — no disease content is hardcoded here.
 */
export function DiseaseHeader({
  name,
  categories,
  shortDescription,
  lastUpdatedLabel,
}: {
  name: string;
  categories: string[];
  shortDescription?: string;
  lastUpdatedLabel?: string;
}) {
  return (
    <header className="space-y-4">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <Badge key={category} tone="primary">
              {category}
            </Badge>
          ))}
        </div>
      )}
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {name}
      </h1>
      {shortDescription && (
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {shortDescription}
        </p>
      )}
      {lastUpdatedLabel && (
        <p className="text-sm text-muted-foreground">{lastUpdatedLabel}</p>
      )}
    </header>
  );
}

/** Quick Facts card (spec §7 #2, §8). A tidy key/value grid. */
export function QuickFacts({
  title,
  facts,
}: {
  title: string;
  facts: QuickFactVM[];
}) {
  return (
    <section
      aria-labelledby="quick-facts-heading"
      id="quick-facts"
      className="scroll-mt-28 rounded-2xl border border-border bg-surface p-6 shadow-card"
    >
      <h2
        id="quick-facts-heading"
        className="font-heading text-lg font-semibold text-foreground"
      >
        {title}
      </h2>
      <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="border-s-2 border-primary/30 ps-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-0.5 text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
