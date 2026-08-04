'use client';

import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import type { StoryContentNoticeId } from '../types';

/**
 * Neutral content notice (Module 12 §37). Calm, factual wording — never a
 * sensational warning. Rendered as text (spec §61) so the information is not
 * conveyed by colour alone.
 */
export function StoryContentNotice({ notices }: { notices: StoryContentNoticeId[] }) {
  const t = useTranslations('Stories');
  if (notices.length === 0) return null;

  const labels = notices.map((notice) => t(`contentNotices.${notice}`));

  return (
    <p className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
      <span>
        <span className="font-medium text-foreground">{t('contentNotices.label')}:</span>{' '}
        {labels.join(', ')}
      </span>
    </p>
  );
}
