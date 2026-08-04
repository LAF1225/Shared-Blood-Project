import { Building2 } from 'lucide-react';
import type { CommunityPartnerRecord } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Approved community partners (spec §32). Only partners with public-display
 * approval reach this component (resolved upstream) — names, logos, and
 * descriptions of unapproved partners are never shown. Renders nothing when no
 * partner has been approved for public display.
 */
export function PartnerList({
  partners,
  locale,
  t,
}: {
  partners: readonly CommunityPartnerRecord[];
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (partners.length === 0) return null;

  return (
    <section aria-labelledby="partners-heading" className="space-y-4 scroll-mt-24">
      <h2 id="partners-heading" className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
        <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('partners.title')}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {partners.map((p) => (
          <li key={p.id} className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-heading font-semibold text-foreground">{p.organizationName[l]}</p>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
              {t(`partnerTypes.${p.organizationType}`)} · {t(`partnershipTypes.${p.partnershipType}`)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.publicDescription[l]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
