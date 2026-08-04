import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/** Locale detection + routing middleware (global language switching). */
const intlMiddleware = createMiddleware(routing);

/**
 * Methods Shared Blood answers (Module 25.8 §26).
 *
 * Every page is a read-only educational document: there are no route handlers,
 * no server actions, no forms that post, and nothing to mutate. Next itself only
 * ever issues GET/HEAD (navigation, RSC payloads, prefetch) and POST (server
 * actions, which this project does not use), so refusing the mutation verbs
 * costs nothing and removes them from the reachable surface. OPTIONS is left to
 * the platform so CORS preflight behaviour is not altered.
 */
const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'POST', 'OPTIONS']);

export default function middleware(request: NextRequest) {
  if (!ALLOWED_METHODS.has(request.method)) {
    return new NextResponse(null, {
      status: 405,
      headers: { Allow: 'GET, HEAD, OPTIONS' },
    });
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API routes, Next internals, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
