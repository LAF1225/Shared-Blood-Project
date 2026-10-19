'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { FORMAT_ICON } from './icons';
import type { LearningResource } from '../types';
import { cn } from '@/lib/utils';

/**
 * Download card (spec §14). Presents a resource's downloadable file. The files
 * themselves are managed by the Downloads module (Module 15) — until a file URL
 * exists, the card shows a "prepared" state that points to the Downloads Centre,
 * so the integration is ready without any rework.
 */
export function DownloadCard({ resource }: { resource: LearningResource }) {
  const t = useTranslations('Learning');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';
  if (!resource.download) return null;

  const { format, fileUrl, sizeLabel, languages } = resource.download;
  const Icon = FORMAT_ICON[format];
  const available = Boolean(fileUrl);
  const meta = [
    t(`formats.${format}`),
    fileUrl ? fileUrl.split('.').pop()?.toUpperCase() : null,
    sizeLabel,
    languages ? t(`fileLanguages.${languages}`) : null,
  ].filter((part, index, all) => part && all.indexOf(part) === index);

  // flex-wrap + basis-40 drop the button under the title when the card is too
  // narrow for one readable row (phones, two-column tablet grid).
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-border bg-surface p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 basis-40">
        <p className="break-words font-medium leading-snug text-foreground">{resource.title[l]}</p>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {meta.join(' · ')}
        </p>
      </div>
      {available ? (
        <a
          href={fileUrl}
          download
          aria-label={t('downloadLabel', { title: resource.title[l] })}
          className="ms-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {t('download')}
        </a>
      ) : (
        <Link
          href={ROUTES.downloads}
          className={cn(
            'ms-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground',
            'transition-colors hover:border-primary/40 hover:text-foreground',
          )}
          title={t('downloadPreparedHint')}
        >
          {t('downloadComingSoon')}
        </Link>
      )}
    </div>
  );
}
