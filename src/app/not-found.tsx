import Link from 'next/link';
import { routing } from '@/i18n/routing';
import './globals.css';

/**
 * Global fallback 404 for non-localized routes (renders its own document,
 * since it sits above the [locale] layout). Localized 404s use
 * app/[locale]/not-found.tsx.
 */
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background p-8 text-center text-foreground">
        <h1 className="font-heading text-3xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href={`/${routing.defaultLocale}`}
          className="rounded-xl bg-primary px-5 py-2 text-primary-foreground"
        >
          Return home
        </Link>
      </body>
    </html>
  );
}
