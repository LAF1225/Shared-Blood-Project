'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { StoryPerspectiveGroup } from '../types';

/**
 * Lightweight perspective selector (Module 12 §42). Offers All Perspectives,
 * Patients, Parents & Caregivers, and Healthcare Professionals — but only the
 * groups that actually have stories (spec §19-style "no empty categories"
 * principle). The parent only renders this when more than one story exists (§42).
 */
export function StorySelector({
  availableGroups,
  active,
  onChange,
}: {
  availableGroups: StoryPerspectiveGroup[];
  active: StoryPerspectiveGroup;
  onChange: (group: StoryPerspectiveGroup) => void;
}) {
  const t = useTranslations('Stories');
  const groups: StoryPerspectiveGroup[] = ['all', ...availableGroups.filter((g) => g !== 'all')];

  return (
    <div role="group" aria-label={t('selector.label')} className="flex flex-wrap gap-2">
      {groups.map((group) => {
        const selected = group === active;
        return (
          <button
            key={group}
            type="button"
            onClick={() => onChange(group)}
            aria-pressed={selected}
            className={cn(
              'min-h-9 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
              selected
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-surface text-muted-foreground hover:text-foreground',
            )}
          >
            {t(`selector.${group}`)}
          </button>
        );
      })}
    </div>
  );
}
