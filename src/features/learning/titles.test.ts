import { describe, it, expect } from 'vitest';
import en from '../../../messages/en.json';
import ur from '../../../messages/ur.json';
import { buildCrumbs } from '@/lib/nav';
import { LEARNING_RESOURCES } from './data/resources';

/**
 * Resource breadcrumbs read their label from `Learning.resourceTitles`, so the
 * catalogue must carry every resource title, word for word, in both locales.
 */
describe('resource breadcrumb titles', () => {
  it.each(LEARNING_RESOURCES.map((r) => [r.slug, r] as const))(
    '%s has a localized breadcrumb title matching its page title',
    (slug, resource) => {
      expect(en.Learning.resourceTitles[slug as keyof typeof en.Learning.resourceTitles]).toBe(resource.title.en);
      expect(ur.Learning.resourceTitles[slug as keyof typeof ur.Learning.resourceTitles]).toBe(resource.title.ur);
      const crumbs = buildCrumbs(`/resources/${slug}`);
      expect(crumbs.at(-1)?.labelKey).toBe(`Learning.resourceTitles.${slug}`);
    },
  );

  it('lists no titles for resources that do not exist', () => {
    const slugs = LEARNING_RESOURCES.map((r) => r.slug).sort();
    expect(Object.keys(en.Learning.resourceTitles).sort()).toEqual(slugs);
    expect(Object.keys(ur.Learning.resourceTitles).sort()).toEqual(slugs);
  });
});
