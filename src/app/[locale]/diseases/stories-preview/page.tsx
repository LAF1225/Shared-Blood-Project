import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageContainer } from '@/components/layout';
import { Alert } from '@/components/ui/Alert';
import { StoriesSection } from '@/features/stories';
import { resolveByDisease } from '@/features/stories/resolve';
import {
  SAMPLE_STORY_RECORDS,
  getSampleConsent,
} from '@/features/stories/preview/sampleStories';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

/** Diseases to preview (last one has no stories → demonstrates the empty state). */
const PREVIEW_DISEASES = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'ehlers-danlos-syndrome',
] as const;

/**
 * Dev-only preview of the Stories & Perspectives Audio System (Module 12).
 * Runs SAMPLE stories through the real pure resolver so the whole pipeline —
 * publication + consent filtering, sanitization, selector, audio player,
 * transcript + translation toggle, content notices, and the empty state — can
 * be verified. Returns 404 in production so no sample data is ever shipped.
 */
export default async function StoriesPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ disease?: string }>;
}) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { locale } = await params;
  const { disease } = await searchParams;
  setRequestLocale(locale);

  const activeDisease =
    disease && (PREVIEW_DISEASES as readonly string[]).includes(disease)
      ? disease
      : 'beta-thalassemia';

  // Resolve sample stories exactly as production would (publication + consent).
  const stories = resolveByDisease(SAMPLE_STORY_RECORDS, getSampleConsent, activeDisease);

  return (
    <PageContainer className="py-10">
      <Alert tone="warning" title="Stories & Perspectives, developer preview">
        Sample stories only (clearly fictional; placeholder audio). Switch the
        disease to test one / multiple / empty layers. Hidden in production.
      </Alert>

      <div className="mt-4 flex flex-wrap gap-2">
        {PREVIEW_DISEASES.map((id) => (
          <Link
            key={id}
            href={{ pathname: '/diseases/stories-preview', query: { disease: id } }}
            className={cn(
              'min-h-10 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              id === activeDisease
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-surface text-muted-foreground hover:text-foreground',
            )}
          >
            {id}
          </Link>
        ))}
      </div>

      <h1 className="mt-8 font-heading text-2xl font-semibold text-foreground">
        Stories &amp; Perspectives
      </h1>

      <div className="mt-6">
        {stories.length > 0 ? (
          <StoriesSection stories={stories} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center text-sm text-muted-foreground">
            No published stories for this condition, the disease page hides the
            section entirely (spec §39). This confirms the empty-layer behaviour.
          </p>
        )}
      </div>
    </PageContainer>
  );
}
