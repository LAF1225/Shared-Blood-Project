'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Siren } from 'lucide-react';
import { EMERGENCY_SIGNS } from '../data/signs';

type Locale = 'en' | 'ur';

/**
 * Shared emergency safety layer (spec §28/§29/§30). One general urgent-care
 * panel for the whole module — urgent guidance is based on the urgent sign
 * itself, NOT a suspected genetic disorder (spec §28), and there are no separate
 * emergency instructions per disease (spec §29). Uses cautious Pakistan-context
 * wording that does not assume access to a specific facility (spec §30).
 */
export function EmergencyGuidance() {
  const t = useTranslations('EarlySigns');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <section
      aria-label={t('emergency.title')}
      className="rounded-2xl border border-warning/40 bg-warning/5 p-6"
    >
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        <Siren className="h-5 w-5 text-warning" aria-hidden="true" />
        {t('emergency.title')}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{t('emergency.intro')}</p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {EMERGENCY_SIGNS.map((sign) => (
          <li key={sign.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="font-medium text-foreground">{sign.label[l]}</p>
            <p className="mt-1 text-sm text-muted-foreground">{sign.description[l]}</p>
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm font-medium text-foreground">
        {t('emergency.action')}
      </p>
    </section>
  );
}
