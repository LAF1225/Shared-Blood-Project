import { Link } from '@/i18n/navigation';

/**
 * "Explore the genetics of this condition" (Module 24 §8/§43).
 *
 * Curated educational links from a disease page to the relevant genetics tools,
 * carrying only the canonical disease id via `?disease=` (never genotype,
 * parent status, probability, or a result). Disease pages stay narrative-first;
 * this is a small related-learning block, not a dashboard. Semantic, keyboard-
 * operable links that read clearly without arrow icons.
 */
export interface DiseaseGeneticsLink {
  href: string;
  title: string;
  description: string;
}

export function DiseaseGeneticsLinks({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: DiseaseGeneticsLink[];
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="disease-genetics-heading" className="scroll-mt-28">
      <h2
        id="disease-genetics-heading"
        className="font-heading text-2xl font-semibold tracking-tight text-foreground"
      >
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block h-full rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              <span className="block font-medium text-foreground">{item.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
