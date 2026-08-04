import { Clock } from 'lucide-react';
import { SectionContainer } from './SectionContainer';

/**
 * Explicit "coming soon" state (Module 24 §61/§63/§66).
 *
 * Used for sections that are intentionally not yet available (e.g. Hospitals,
 * Downloads). Unlike an active-looking placeholder, it states clearly that the
 * feature does not exist yet — it never promises a non-functional feature or
 * fabricates data. All strings are pre-localized by the route.
 */
export function ComingSoonPage({
  title,
  body,
  badge,
}: {
  title: string;
  body: string;
  badge: string;
}) {
  return (
    <SectionContainer>
      <div className="mx-auto max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {badge}
        </span>
        <h1 className="font-heading text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </SectionContainer>
  );
}
