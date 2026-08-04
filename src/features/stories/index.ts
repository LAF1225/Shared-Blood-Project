/**
 * Stories & Perspectives Audio System (Module 12).
 *
 * Curated audio accounts connected to disease pages, kept technically separate
 * from disease content and the Evidence Map (spec §2/§4/§50). Stories are
 * experiences — never medical evidence.
 *
 * This barrel exports only PUBLIC-safe pieces (the presentation section + types).
 * The server-only resolver + private consent live under `./server/` and must be
 * imported directly by server components (spec §63) — they are NOT re-exported
 * here so they can never be pulled into a client bundle.
 */
export { StoriesSection } from './components/StoriesSection';
export type {
  PublicStory,
  StoryRecord,
  StoryType,
  SpeakerIdentityMode,
  StoryDiseaseId,
  StoryContentNoticeId,
} from './types';
