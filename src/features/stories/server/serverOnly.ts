/**
 * Server-only guard (Module 12 §63). Importing this module throws if it is ever
 * evaluated in a browser bundle, enforcing that private consent administration
 * and the resolver binding never reach the public client.
 *
 * (Equivalent to the `server-only` package, implemented locally to avoid adding
 * a dependency.)
 */
if (typeof window !== 'undefined') {
  throw new Error(
    'This module is server-only and must not be imported into client code (Module 12 §63).',
  );
}

export {};
