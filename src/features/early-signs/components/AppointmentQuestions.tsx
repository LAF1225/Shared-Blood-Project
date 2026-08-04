'use client';

import { useTranslations } from 'next-intl';
import { ClipboardList } from 'lucide-react';

/**
 * "Questions to Think About Before an Appointment" (spec §35/§37). Organizational
 * preparation guidance only — NOT diagnostic data collection, and NOTHING is
 * stored (spec §36/§37/§68). No child profile or health record is created
 * (spec §38). Kept as a fixed educational checklist, not an input form.
 */
const QUESTION_KEYS = [
  'whenNoticed',
  'persistentOrRecurring',
  'majorChanges',
  'records',
  'familyHistory',
] as const;

export function AppointmentQuestions() {
  const t = useTranslations('EarlySigns');

  return (
    <section aria-label={t('appointment.title')} className="rounded-2xl border border-border bg-muted/20 p-6">
      <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
        <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
        {t('appointment.title')}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{t('appointment.intro')}</p>
      <ul className="mt-4 space-y-2">
        {QUESTION_KEYS.map((key) => (
          <li key={key} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-foreground/90">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {t(`appointment.${key}`)}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">{t('appointment.privacyNote')}</p>
    </section>
  );
}
