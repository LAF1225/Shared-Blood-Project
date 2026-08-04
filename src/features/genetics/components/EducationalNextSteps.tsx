import { Link } from '@/i18n/navigation';

/**
 * Educational next-step links (Module 24 §40). A lightweight, curated
 * "continue learning" block used for genetics tool cross-navigation. Links are
 * semantic anchors (keyboard operable, visibly focusable) and are clear from
 * their text alone — they do not rely on arrow icons (§41). No recommendation,
 * "smart", risk, or personalization language (§40).
 */
export interface NextStepItem {
  href: string;
  title: string;
  description: string;
}

export function EducationalNextSteps({
  heading,
  items,
}: {
  heading: string;
  items: NextStepItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="next-steps-heading" className="border-t border-border pt-8">
      <h2
        id="next-steps-heading"
        className="mb-4 font-heading text-lg font-semibold text-foreground"
      >
        {heading}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
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
