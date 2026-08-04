'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Stethoscope } from 'lucide-react';
import { getProfessionalTypeRecord } from '../data/professionalTypes';
import type { ProfessionalType } from '../types';

type Locale = 'en' | 'ur';

/**
 * Relevant professional types (spec §31/§33). Explains what each kind of
 * professional generally does. This is NOT a directory (spec §32): it never
 * lists specific hospitals/people, never claims a professional will diagnose the
 * condition, and never imports Module 11 institutions as care providers.
 */
export function ProfessionalTypeList({ types }: { types: ProfessionalType[] }) {
  const t = useTranslations('EarlySigns');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const records = types
    .map((type) => getProfessionalTypeRecord(type))
    .filter((record): record is NonNullable<typeof record> => record != null)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (records.length === 0) return null;

  return (
    <section aria-label={t('professionalsSection.title')} className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
          <Stethoscope className="h-5 w-5 text-primary" aria-hidden="true" />
          {t('professionalsSection.title')}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('professionalsSection.note')}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {records.map((record) => (
          <li key={record.id} className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-medium text-foreground">{record.label[l]}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{record.description[l]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
