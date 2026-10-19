import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { EXTERNAL_LINKS } from './config';

describe('external links', () => {
  it('are all https', () => {
    for (const url of Object.values(EXTERNAL_LINKS)) expect(url).toMatch(/^https:\/\//);
  });

  it('the homepage survey button opens the Google Form in a protected new tab', () => {
    expect(EXTERNAL_LINKS.awarenessSurvey).toBe('https://forms.gle/rAc7vv4CNUJHY3qr7');
    const source = readFileSync(
      join(__dirname, '..', 'features', 'homepage', 'components', 'SurveyInvitation.tsx'),
      'utf8',
    );
    expect(source).toContain('href={EXTERNAL_LINKS.awarenessSurvey}');
    expect(source).toContain('rel="noopener noreferrer"');
  });
});
