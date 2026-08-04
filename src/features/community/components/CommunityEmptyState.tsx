import { Sprout } from 'lucide-react';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Empty state shown when no APPROVED, COMPLETED activities exist (spec §48). It
 * states that community work is being documented for publication — it NEVER shows
 * planned activities as completed impact, and NEVER invents counts or partners.
 * This is the correct, honest public output until real fieldwork has been
 * documented, impact-verified, privacy-reviewed, and approved.
 */
export function CommunityEmptyState({ t }: { t: Translator }) {
  return (
    <section
      aria-labelledby="community-pending-heading"
      className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center"
    >
      <Sprout className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
      <h2 id="community-pending-heading" className="mt-3 font-heading text-xl font-semibold text-foreground">
        {t('empty.title')}
      </h2>
      <p className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {t('empty.body')}
      </p>
    </section>
  );
}
