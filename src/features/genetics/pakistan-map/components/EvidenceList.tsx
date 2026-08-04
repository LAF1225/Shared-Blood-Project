'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROVINCE_OPTIONS } from '../data/evidence';
import type { MapEvidenceRecord } from '../types';

type Locale = 'en' | 'ur';

/**
 * Evidence List (spec §34) — the accessible, text-equivalent alternative to the
 * visual map. It renders the SAME filtered collection the map does (spec §35),
 * so selecting a list record identifies its map location and vice-versa. Each
 * item states its evidence type in text (not colour alone, spec §45).
 */
export function EvidenceList({
  records,
  selectedRecordId,
  onSelect,
}: {
  records: MapEvidenceRecord[];
  selectedRecordId: string | null;
  onSelect: (record: MapEvidenceRecord) => void;
}) {
  const t = useTranslations('PakistanMap');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <ul className="space-y-2" aria-label={t('list.ariaLabel')}>
      {records.map((record) => {
        const selected = record.id === selectedRecordId;
        const province = PROVINCE_OPTIONS.find((p) => p.id === record.provinceOrTerritory);
        return (
          <li key={record.id}>
            <button
              type="button"
              onClick={() => onSelect(record)}
              aria-pressed={selected}
              className={cn(
                'w-full rounded-xl border p-3 text-start transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                selected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border bg-surface hover:border-primary/40',
              )}
            >
              <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-strong">
                {t(`evidenceTypes.${record.evidenceType}`)}
              </span>
              <span className="mt-1.5 block font-medium text-foreground">{record.title[l]}</span>
              <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                {[record.locationName[l], province?.name[l]].filter(Boolean).join(' · ')}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
