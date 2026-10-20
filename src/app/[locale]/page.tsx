import { setRequestLocale } from 'next-intl/server';
import { Reveal } from '@/components/motion/Reveal';
import {
  HeroSection,
  ProjectIntroduction,
  FeaturedDiseases,
  GeneticsExplorerPreview,
  MapPreview,
  CommunityImpact,
  ParentResources,
  SurveyInvitation,
} from '@/features/homepage';

/**
 * Homepage (Module 02) — the primary entry point to Shared Blood.
 * Display-only: navigation and previews, with placeholder data where future
 * modules are pending. No calculations, submissions, or auth.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <Reveal>
        <ProjectIntroduction />
      </Reveal>
      <Reveal>
        <FeaturedDiseases />
      </Reveal>
      <Reveal>
        <GeneticsExplorerPreview />
      </Reveal>
      <Reveal>
        <MapPreview />
      </Reveal>
      <Reveal>
        <CommunityImpact />
      </Reveal>
      <Reveal>
        <ParentResources />
      </Reveal>
      <Reveal>
        <SurveyInvitation />
      </Reveal>
    </>
  );
}
