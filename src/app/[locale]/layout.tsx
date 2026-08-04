import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, isValidLocale } from '@/i18n/routing';
import { getDirection } from '@/constants/languages';
import { SITE_CONFIG } from '@/constants/config';
import { AppProviders } from '@/providers';
import { Header, Footer, Breadcrumbs } from '@/components/layout';
import { fontVariables } from '../fonts';
import '../globals.css';

/** Pre-render both locales at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** SEO metadata foundation (§18) — expanded by later modules. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: `${t('appName')}, ${t('tagline')}`,
      template: `%s · ${t('appName')}`,
    },
    description: SITE_CONFIG.description,
    // Module 26 §27. A relative canonical is resolved by Next against
    // metadataBase AND the current route, so every page self-canonicalises
    // instead of every page pointing at the homepage. Language alternates are
    // additionally advertised by next-intl as a `Link` response header.
    alternates: {
      canonical: './',
    },
    openGraph: {
      title: t('appName'),
      description: SITE_CONFIG.description,
      type: 'website',
      locale,
      siteName: t('appName'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('appName'),
      description: SITE_CONFIG.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={getDirection(locale)} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to main content
            </a>
            <Header />
            <Breadcrumbs />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
