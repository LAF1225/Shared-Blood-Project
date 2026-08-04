'use client';

import './globals.css';

/**
 * Global error boundary (catches errors in the root layout itself).
 * Must render its own <html>/<body>.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background p-8 text-center text-foreground">
        <h1 className="font-heading text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-xl bg-primary px-5 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
