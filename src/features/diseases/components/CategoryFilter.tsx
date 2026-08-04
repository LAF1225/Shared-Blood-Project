'use client';

import { useTranslations } from 'next-intl';
import { DISEASE_CATEGORIES, type CategoryFilterId } from '../data/categories';
import { cn } from '@/lib/utils';

/**
 * Category filter chips (spec §10): "All" plus every category. Single-select for
 * V1 (multi-select is a future extension, spec §10). Uses a radiogroup pattern
 * so screen readers announce the active filter.
 */
export function CategoryFilter({
  active,
  onChange,
}: {
  active: CategoryFilterId;
  onChange: (value: CategoryFilterId) => void;
}) {
  const t = useTranslations('DiseaseLibrary');

  const options: { id: CategoryFilterId; labelKey: string }[] = [
    { id: 'all', labelKey: 'all' },
    ...DISEASE_CATEGORIES.map((category) => ({
      id: category.id,
      labelKey: category.labelKey,
    })),
  ];

  return (
    <div
      role="radiogroup"
      aria-label={t('filterLabel')}
      className="flex flex-wrap gap-2"
    >
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
