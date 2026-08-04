'use client';

import { useTranslations } from 'next-intl';
import { LifeBuoy } from 'lucide-react';

/**
 * "Preparing Essential Care Information" (spec §55) — flood / displacement
 * context. Version 1 provides awareness only: what information may be useful to
 * keep ready (medication lists, essential records, major care needs, and how to
 * communicate a diagnosed condition to responsible relief medical staff). This
 * is NOT a disaster-response module and hard-codes no dependency on any relief
 * organisation (spec §55/§56).
 */
export function EssentialCareInfo() {
  const t = useTranslations('CareSupport');

  const items: string[] = [
    t('essential.medications'),
    t('essential.records'),
    t('essential.careNeeds'),
    t('essential.communicating'),
  ];

  return (
    <section
      aria-label={t('essential.title')}
      className="rounded-2xl border border-secondary/25 bg-secondary/5 p-6"
    >
      <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
        <LifeBuoy className="h-5 w-5 text-secondary" aria-hidden="true" />
        {t('essential.title')}
      </h2>
      <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('essential.intro')}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
