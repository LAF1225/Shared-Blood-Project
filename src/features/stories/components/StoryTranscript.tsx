'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TranscriptContent } from '../types';

/**
 * Story transcript (Module 12 §25/§29/§60). Collapsible, rendered as readable
 * text (never an image, §25). When a translated transcript exists, a toggle
 * offers Original vs Translated (§29); the interface defaults to the version
 * matching the current UI language while keeping the original accessible.
 * Urdu transcripts render RTL; embedded gene names / numbers are not reversed
 * because only the paragraph direction changes (spec §60).
 */
export function StoryTranscript({
  transcript,
  translatedTranscript,
}: {
  transcript: TranscriptContent;
  translatedTranscript?: TranscriptContent;
}) {
  const t = useTranslations('Stories');
  const locale = useLocale();

  const hasTranslation = Boolean(translatedTranscript?.text?.trim());
  // Default to whichever version matches the current interface language (§29).
  const [showTranslated, setShowTranslated] = useState(
    hasTranslation && translatedTranscript!.language === locale,
  );
  const [open, setOpen] = useState(false);

  const active = showTranslated && translatedTranscript ? translatedTranscript : transcript;
  const hasText = Boolean(active?.text?.trim());

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        {open ? t('transcript.hide') : t('transcript.show')}
      </button>

      {open && (
        <div className="mt-2 rounded-lg border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t('transcript.title')}
            </p>
            {hasTranslation && (
              <div className="inline-flex rounded-lg border border-border p-0.5 text-xs" role="group" aria-label={t('transcript.versionLabel')}>
                <button
                  type="button"
                  onClick={() => setShowTranslated(false)}
                  aria-pressed={!showTranslated}
                  className={cn(
                    'rounded-md px-2 py-1 font-medium transition-colors',
                    !showTranslated ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t('transcript.original')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTranslated(true)}
                  aria-pressed={showTranslated}
                  className={cn(
                    'rounded-md px-2 py-1 font-medium transition-colors',
                    showTranslated ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t('transcript.translated')}
                </button>
              </div>
            )}
          </div>

          {hasText ? (
            <p
              dir={active.language === 'ur' ? 'rtl' : 'ltr'}
              lang={active.language}
              className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90"
            >
              {active.text}
            </p>
          ) : (
            <p role="alert" className="mt-2 text-sm text-muted-foreground">
              {t('transcript.error')}
            </p>
          )}

          {showTranslated && (
            <p className="mt-2 text-xs italic text-muted-foreground">{t('transcript.translationNote')}</p>
          )}
        </div>
      )}
    </div>
  );
}
