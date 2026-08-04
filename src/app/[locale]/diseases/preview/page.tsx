import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageContainer } from '@/components/layout';
import { Alert } from '@/components/ui/Alert';
import { DiseasePage } from '@/features/diseases/content';
import {
  DISEASE_FIXTURES,
  FIXTURE_IDS,
} from '@/features/diseases/content/fixtures';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

/**
 * Dev-only preview of the Disease Page System (Module 05 §25). Renders the
 * synthetic fixtures so the rendering engine can be verified with different
 * combinations of present/absent fields. Returns 404 in production so no
 * sample data is ever shipped.
 */
export default async function DiseasePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sample?: string }>;
}) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { locale } = await params;
  const { sample } = await searchParams;
  setRequestLocale(locale);

  const activeId = sample && FIXTURE_IDS.includes(sample) ? sample : 'full';
  const fixture = DISEASE_FIXTURES[activeId];

  const t = await getTranslations({ locale, namespace: 'DiseasePage' });
  const cat = await getTranslations({ locale, namespace: 'DiseaseLibrary' });

  return (
    <div>
      <PageContainer className="pt-8">
        <Alert tone="warning" title="Disease Page System, developer preview">
          Sample data only (not a real condition). Switch fixtures to test
          conditional rendering. This page is hidden in production.
        </Alert>
        <div className="mt-4 flex flex-wrap gap-2">
          {FIXTURE_IDS.map((id) => (
            <Link
              key={id}
              href={{ pathname: '/diseases/preview', query: { sample: id } }}
              className={cn(
                'min-h-10 rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                id === activeId
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-surface text-muted-foreground hover:text-foreground',
              )}
            >
              {id}
            </Link>
          ))}
        </div>
      </PageContainer>

      {/* Single-element order → prev/next hidden; use the switcher above. */}
      <DiseasePage
        disease={fixture.disease}
        content={fixture.content}
        order={[fixture.disease]}
        locale={locale}
        t={t}
        cat={cat}
      />
    </div>
  );
}
