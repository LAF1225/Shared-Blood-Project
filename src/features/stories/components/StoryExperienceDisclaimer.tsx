'use client';

import { useTranslations } from 'next-intl';
import { EducationalCallout } from '@/features/diseases/content/components/Section';

/**
 * Experience disclaimer (Module 12 §34). States that personal and professional
 * perspectives may differ and are not a substitute for medical advice or the
 * scientific information on the page. The site never auto-endorses statements
 * made inside a story (spec §2/§34/§36).
 */
export function StoryExperienceDisclaimer() {
  const t = useTranslations('Stories');
  return <EducationalCallout title={t('disclaimer.title')}>{t('disclaimer.body')}</EducationalCallout>;
}
