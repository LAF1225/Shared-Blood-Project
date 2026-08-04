import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Search } from 'lucide-react';
import { SectionContainer } from '@/components/layout';
import { Alert } from '@/components/ui/Alert';

/** Longest search phrase echoed back on the page (Module 25.8 §18). */
const MAX_QUERY_LENGTH = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Search' });
  return { title: t('title') };
}

/**
 * Search results route (spec §12). This is the redirect target for the global
 * search entry point. Search indexing and real results are explicitly excluded
 * from Module 03 (spec §21); this page acknowledges the query and points users
 * back to the navigation until the search module lands.
 */
export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Search' });

  // Module 25.8 §18: the query is echoed back to the user, so bound its length.
  // React escapes the value (verified: a `<script>` marker renders as text), but
  // an unbounded parameter still lets an attacker craft a link that renders a
  // megabyte-long heading. `Array.from` splits by code point so a multi-byte or
  // malformed-surrogate input cannot be cut in half.
  const query = q ? Array.from(q.trim()).slice(0, MAX_QUERY_LENGTH).join('') : undefined;

  return (
    <SectionContainer>
      <div className="mx-auto max-w-2xl">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10">
          <Search className="h-6 w-6" aria-hidden="true" />
        </span>

        {query ? (
          <>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {t('resultsFor')}{' '}
              <span className="text-primary">“{query}”</span>
            </h1>
            <div className="mt-6">
              <Alert tone="info" title={t('comingSoonTitle')}>
                {t('comingSoonBody')}
              </Alert>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {t('emptyQueryTitle')}
            </h1>
            <p className="mt-3 text-muted-foreground">{t('emptyQueryBody')}</p>
          </>
        )}
      </div>
    </SectionContainer>
  );
}
