'use client';

import { useTranslations } from 'next-intl';
import { RESOURCE_CATEGORIES } from '../data/categories';
import type { ResourceCategoryFilterId } from '../types';
import { cn } from '@/lib/utils';

/**
 * Resource category filter (spec §5). "All" plus every category, single-select.
 * Uses a radiogroup so screen readers announce the active category.
 */
export function CategoryFilter({
  active,
  onChange,
}: {
  active: ResourceCategoryFilterId;
  onChange: (value: ResourceCategoryFilterId) => void;
}) {
  const t = useTranslations('Learning');

  const options: { id: ResourceCategoryFilterId; labelKey: string }[] = [
    { id: 'all', labelKey: 'all' },
    ...RESOURCE_CATEGORIES.map((category) => ({
      id: category.id,
      labelKey: category.labelKey,
    })),
  ];

  return (
    <div role="radiogroup" aria-label={t('filterLabel')} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              'min-h-9 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors',
              selected
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {t(`categories.${option.labelKey}`)}
          </button>
        );
      })}
    </div>
  );
}
