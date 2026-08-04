import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { GENETICS_TOOLS, getGeneticsToolBySlug, GeneticsToolPage } from '@/features/genetics';

/**
 * Tools that have their own dedicated route (e.g. Module 09's calculator) are
 * excluded here — their static segment already takes precedence, so prerendering
 * them under `[slug]` would just build a shadowed duplicate.
 */
const DEDICATED_ROUTE_SLUGS = new Set([
  'inheritance-calculator',
  'relationship-risk',
  'pakistan-map',
  // Module 22 — interactive tools with their own code-split routes.
  'dna-explorer',
  'punnett-square',
]);

/**
 * Module 25.8 §25/§27: the tool registry is fully enumerable, so any slug not
 * produced below is genuinely unknown. Without this, Next treats an unknown
 * slug as an ISR candidate: it renders the not-found body but answers HTTP 200
 * and stores the result under `s-maxage=31536000`, which lets an attacker fill
 * a shared CDN cache with year-long entries at arbitrary URLs. Rejecting
 * unlisted params at the routing layer returns a true 404 and caches nothing.
 */
export const dynamicParams = false;

/** Pre-render every remaining tool × locale at build time (spec §14 scalability). */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    GENETICS_TOOLS.filter((tool) => !DEDICATED_ROUTE_SLUGS.has(tool.slug)).map((tool) => ({
      locale,
      slug: tool.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getGeneticsToolBySlug(slug);
  if (!tool) return {};
  const l = locale === 'ur' ? 'ur' : 'en';
  return { title: tool.title[l], description: tool.summary[l] };
}

/**
 * Genetics tool route — one reusable template renders any tool (current or
 * future placeholder) from structured data (spec §8). Adding a tool needs only
 * a new data entry; no route changes (spec §14/§16).
 */
export default async function GeneticsToolRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tool = getGeneticsToolBySlug(slug);
  if (!tool) notFound();

  const t = await getTranslations({ locale, namespace: 'Genetics' });

  return <GeneticsToolPage tool={tool} locale={locale} t={t} />;
}
