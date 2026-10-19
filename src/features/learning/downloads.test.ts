import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { LEARNING_RESOURCES } from './data/resources';
import { getDiseaseBySlug } from '@/features/diseases';

/**
 * Learning Centre downloads. Every resource links a real file under
 * `public/resources/`, named after its slug, with a size label that matches the
 * file on disk. A renamed, missing or replaced file fails here instead of
 * shipping a broken download button.
 */
const PUBLIC_DIR = join(__dirname, '..', '..', '..', 'public');
const RESOURCES_DIR = join(PUBLIC_DIR, 'resources');

function sizeLabel(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

describe('learning resource downloads', () => {
  it.each(LEARNING_RESOURCES.map((r) => [r.slug, r] as const))(
    '%s links an existing file with an accurate size',
    (slug, resource) => {
      const download = resource.download;
      expect(download?.fileUrl).toMatch(new RegExp(`^/resources/${slug}\\.(pdf|png)$`));
      const file = join(PUBLIC_DIR, download!.fileUrl!);
      expect(existsSync(file)).toBe(true);
      expect(download!.sizeLabel).toBe(sizeLabel(statSync(file).size));
      expect(download!.languages).toBeDefined();
    },
  );

  it('ships no files in public/resources that no resource links', () => {
    const linked = new Set(LEARNING_RESOURCES.map((r) => r.download?.fileUrl));
    for (const name of readdirSync(RESOURCES_DIR)) {
      expect(linked.has(`/resources/${name}`)).toBe(true);
    }
  });

  it('links only resources and diseases that exist', () => {
    const slugs = new Set(LEARNING_RESOURCES.map((r) => r.slug));
    for (const resource of LEARNING_RESOURCES) {
      for (const related of resource.relatedResources ?? []) {
        expect(slugs.has(related)).toBe(true);
      }
      for (const disease of resource.relatedDiseases ?? []) {
        expect(getDiseaseBySlug(disease)).not.toBeNull();
      }
    }
  });
});
