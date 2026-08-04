import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail } from 'lucide-react';
import { SectionContainer } from '@/components/layout';

/**
 * Contact (Module 24 §64 — ACTIVE_STATIC). Exposes the one real, already-public
 * contact method (the project email shown in the footer). It invents no phone
 * number, office address, or backend contact form (§64/§110).
 */
const CONTACT_EMAIL = 'sharedblood.org@gmail.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return { title: t('title'), description: t('intro') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return (
    <SectionContainer>
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('intro')}</p>
        </header>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('emailLabel')}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 inline-flex items-center gap-2 font-heading text-lg font-semibold text-primary hover:underline"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{t('note')}</p>
      </div>
    </SectionContainer>
  );
}
