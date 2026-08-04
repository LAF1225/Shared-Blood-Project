'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { UrgencyContext } from '../types';

/**
 * Urgency badge (spec §25). Shows WHEN to seek care as a TEXT label — never
 * colour-only (spec §65) and never a severity or triage score (spec §25). Copy
 * follows the spec exactly: "Worth discussing with a doctor" (not "Low Risk",
 * §26), "Arrange medical assessment" (§27), "Seek urgent medical help" (§28).
 */
export function UrgencyBadge({ urgency }: { urgency: UrgencyContext }) {
  const t = useTranslations('EarlySigns');

  const tone: Record<UrgencyContext, string> = {
    ROUTINE_DISCUSSION: 'border-primary/30 bg-primary/5 text-primary',
    PROMPT_ASSESSMENT: 'border-accent-strong/30 bg-accent/10 text-accent-strong',
    URGENT_MEDICAL_HELP: 'border-warning/40 bg-warning/10 text-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        tone[urgency],
      )}
    >
      {t(`urgency.${urgency}`)}
    </span>
  );
}
