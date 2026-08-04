'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import type { PublicStory } from '../types';
import { StoryIdentity } from './StoryIdentity';
import { StoryContentNotice } from './StoryContentNotice';
import { StoryAudioPlayer } from './StoryAudioPlayer';
import { StoryTranscript } from './StoryTranscript';

type Locale = 'en' | 'ur';

/**
 * A self-contained story card (Module 12 §10). Contains the title, speaker
 * identity, short context, content notice, audio player, transcript (with
 * translation toggle), and an individualized summary (spec §31). It is never
 * presented as a scientific citation (spec §10/§36).
 */
export function StoryCard({ story }: { story: PublicStory }) {
  const t = useTranslations('Stories');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <StoryIdentity identity={story.identity} memorialContext={story.memorialContext} />
        {story.isFeatured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            {t('featured')}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{story.title[l]}</h3>

      {story.context && <p className="mt-1 text-sm text-muted-foreground">{story.context[l]}</p>}

      {/* Individualized framing, never "typical of every patient" (spec §31). */}
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{story.summary[l]}</p>

      <p className="mt-2 text-xs text-muted-foreground">
        {t('audioLanguage.label')}: {t(`audioLanguage.${story.audioLanguage}`)}
      </p>

      <StoryContentNotice notices={story.contentNotices} />

      <StoryAudioPlayer
        storyId={story.id}
        src={story.audio.src}
        durationSeconds={story.audio.durationSeconds}
      />

      <StoryTranscript
        transcript={story.transcript}
        translatedTranscript={story.translatedTranscript}
      />
    </article>
  );
}
