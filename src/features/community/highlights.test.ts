import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { checkPublicClaim } from '@/features/governance/publication';
import { COMMUNITY_ACTIVITIES, COMMUNITY_PHOTOS } from './data/highlights';
import { getResourceBySlug } from '@/features/learning';

const PUBLIC_DIR = join(__dirname, '..', '..', '..', 'public');

/** Reads width/height from a baseline or progressive JPEG's SOF marker. */
function jpegSize(buf: Buffer): { width: number; height: number } {
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    const length = buf.readUInt16BE(i + 2);
    if (marker === 0xc0 || marker === 0xc2) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + length;
  }
  throw new Error('no SOF marker');
}

const texts = [
  ...COMMUNITY_ACTIVITIES.flatMap((a) => [a.title, a.place, a.summary, a.audience]),
  ...COMMUNITY_PHOTOS.flatMap((p) => [p.alt, p.caption]),
];

describe('community activity highlights and photos', () => {
  it('lists the two ongoing activities', () => {
    expect(COMMUNITY_ACTIVITIES.map((a) => a.id)).toEqual(['oral-histories-sundas', 'caretaker-workshops-aghosh']);
  });

  it('records the booklet given to every workshop caretaker, and links to it', () => {
    const workshops = COMMUNITY_ACTIVITIES.find((a) => a.id === 'caretaker-workshops-aghosh')!;
    expect(workshops.summary.en).toMatch(/every caretaker taking part receives a copy of shared blood’s learning booklet/i);
    expect(workshops.summary.ur).toMatch(/کتابچہ/);
    for (const activity of COMMUNITY_ACTIVITIES) {
      if (activity.resourceSlug) expect(getResourceBySlug(activity.resourceSlug), activity.resourceSlug).not.toBeNull();
    }
  });

  it('has English and Urdu for every text', () => {
    for (const text of texts) {
      expect(text.en.trim()).not.toBe('');
      expect(text.ur.trim()).not.toBe('');
    }
  });

  it('makes no impact or count claims and passes the public-claim check', () => {
    for (const text of texts) {
      expect(text.en.toLowerCase()).not.toMatch(/lives saved|prevented|\b\d+ (people|caretakers|families|children)\b|trained \d/);
      expect(checkPublicClaim(text.en, 'en').status, text.en).toBe('ALLOWED');
      expect(checkPublicClaim(text.ur, 'ur').status, text.ur).toBe('ALLOWED');
    }
  });

  it('every photo exists, matches its declared size, and belongs to an activity', () => {
    const ids = new Set(COMMUNITY_ACTIVITIES.map((a) => a.id));
    for (const photo of COMMUNITY_PHOTOS) {
      const file = join(PUBLIC_DIR, photo.src);
      expect(existsSync(file), photo.src).toBe(true);
      expect(jpegSize(readFileSync(file))).toEqual({ width: photo.width, height: photo.height });
      expect(ids.has(photo.activityId)).toBe(true);
    }
  });

  it('ships photos without EXIF metadata (no camera, time or GPS data)', () => {
    for (const photo of COMMUNITY_PHOTOS) {
      const buf = readFileSync(join(PUBLIC_DIR, photo.src));
      expect(buf.includes(Buffer.from('Exif\0\0')), photo.src).toBe(false);
    }
  });

  it('ships no unused files in public/community', () => {
    const used = new Set(COMMUNITY_PHOTOS.map((p) => p.src));
    for (const name of readdirSync(join(PUBLIC_DIR, 'community'))) {
      expect(used.has(`/community/${name}`), name).toBe(true);
    }
  });
});
