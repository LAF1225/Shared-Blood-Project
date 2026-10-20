import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';

const read = (...parts: string[]) => readFileSync(join(__dirname, '..', ...parts), 'utf8');

/**
 * Sections the project owner removed from public pages. The homepage "Our
 * progress" tracker showed placeholder figures, and the Community page's
 * fieldwork-impact framework (focus areas, "being documented" notice,
 * methodology) had no real records behind it.
 */
describe('removed public sections', () => {
  it('the homepage no longer renders the progress tracker', () => {
    expect(read('app', '[locale]', 'page.tsx')).not.toMatch(/AwarenessStatistics/);
    expect(en.Home).not.toHaveProperty('stats');
  });

  it('the public Community page renders only the header and ongoing activities', () => {
    const route = read('app', '[locale]', 'community', 'page.tsx');
    expect(route).toMatch(/<CommunityPage\b/);
    expect(route).not.toMatch(/SharedBloodInCommunity/);
  });
});
