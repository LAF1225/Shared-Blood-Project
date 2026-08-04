'use client';

import { useMemo, useState } from 'react';
import type { PublicStory, StoryPerspectiveGroup } from '../types';
import { matchesPerspectiveGroup, perspectiveGroupOf } from '../validation';
import { PlaybackCoordinatorProvider } from './PlaybackCoordinator';
import { StoryExperienceDisclaimer } from './StoryExperienceDisclaimer';
import { StorySelector } from './StorySelector';
import { StoryCard } from './StoryCard';

/**
 * Stories & Perspectives section (Module 12 §10/§42/§53). Receives already-
 * resolved, sanitized `PublicStory` objects from the server resolver — it never
 * touches consent or publication logic itself (spec §53 "keep resolver logic
 * outside presentation components").
 *
 * Wraps its cards in a page-level playback coordinator so only one story plays
 * at a time (spec §45). Shows the perspective selector only when more than one
 * story exists (spec §42). Renders nothing when empty — the disease page decides
 * whether to show an empty message or hide the section (spec §39).
 */
export function StoriesSection({ stories }: { stories: PublicStory[] }) {
  const [group, setGroup] = useState<StoryPerspectiveGroup>('all');

  const availableGroups = useMemo<StoryPerspectiveGroup[]>(() => {
    const set = new Set<StoryPerspectiveGroup>();
    for (const story of stories) set.add(perspectiveGroupOf(story.storyType));
    return [...set];
  }, [stories]);

  const visible = useMemo(
    () => stories.filter((story) => matchesPerspectiveGroup(story.storyType, group)),
    [stories, group],
  );

  if (stories.length === 0) return null;

  return (
    <PlaybackCoordinatorProvider>
      <div className="space-y-6">
        <StoryExperienceDisclaimer />

        {stories.length > 1 && (
          <StorySelector availableGroups={availableGroups} active={group} onChange={setGroup} />
        )}

        <ul className="space-y-5">
          {visible.map((story) => (
            <li key={story.id}>
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </div>
    </PlaybackCoordinatorProvider>
  );
}
