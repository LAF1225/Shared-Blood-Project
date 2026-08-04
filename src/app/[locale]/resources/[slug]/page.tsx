import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { LEARNING_RESOURCES, getResourceBySlug, ResourcePage } from '@/features/learning';

/**
 * Module 25.8 §25/§27: the resource catalogue is fully enumerable, so an
 * unlisted slug is unknown by definition. See the genetics tool route for the
 * full rationale; in short this turns a cacheable soft-404 into a real 404.
 */
export const dynamicParams = false;

/** Pre-render every resource × locale at build time (spec §19 scalability). */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LEARNING_RESOURCES.map((resource) => ({ locale, slug: resource.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  const l = locale === 'ur' ? 'ur' : 'en';
  return { title: resource.title[l], description: resource.summary[l] };
}

/**
 * Educational resource route — a single reusable template renders any resource
 * from structured data (Module 07 §7). Adding a resource needs only a new data
 * entry; no route changes.
 */
export default async function ResourceRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const t = await getTranslations({ locale, namespace: 'Learning' });

  return <ResourcePage resource={resource} locale={locale} t={t} />;
}
