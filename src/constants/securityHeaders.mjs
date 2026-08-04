/**
 * Security response headers (Module 25.8 §9, §10, §24).
 *
 * Kept in one place, in `.mjs`, so that BOTH `next.config.mjs` (which applies
 * them) and the vitest security suite (which asserts them) read the same
 * source. A header that is only asserted in a test, or only set in config, is
 * how these silently drift apart.
 *
 * The policy below is derived from what Shared Blood actually loads, not from a
 * generic template:
 *
 *  - Fonts are self-hosted. `next/font/google` downloads Newsreader, Source
 *    Sans 3 and Noto Nastaliq Urdu at BUILD time and serves them from
 *    `/_next/static/media`, so no Google origin is required at runtime.
 *  - There are no third-party scripts, analytics, pixels, embeds or iframes.
 *  - There are no external API calls; every dataset is compiled into the bundle.
 *  - The only media is a local audio file under `/media`.
 *
 * Consequently every fetch directive can stay on `'self'`.
 */

/**
 * Content Security Policy directives.
 *
 * `'unsafe-inline'` in `script-src` is required and documented, not accidental:
 * the Next.js App Router streams the RSC payload through inline
 * `<script>self.__next_f.push(...)</script>` tags. The alternative, a per-request
 * nonce, forces every route to render dynamically and would drop all 91
 * statically prerendered pages, which is an architectural change this module is
 * not permitted to make.
 *
 * The residual risk is low and bounded because the amplifier for
 * `'unsafe-inline'` is an HTML injection sink, and the audit found none: zero
 * uses of `dangerouslySetInnerHTML`, `innerHTML`, `document.write`, `eval` or
 * `new Function` anywhere in the application, and every value rendered from a
 * query parameter goes through ordinary React text escaping. `object-src`,
 * `base-uri` and `frame-ancestors` are locked down so that even a hypothetical
 * injection cannot escalate to plugin execution, base-tag hijacking or
 * clickjacking.
 *
 * @param {boolean} isDev - development additionally needs `'unsafe-eval'` and a
 *   websocket origin for React Refresh / HMR. Production gets neither.
 * @returns {string}
 */
export function buildContentSecurityPolicy(isDev = false) {
  const directives = [
    ["default-src", ["'self'"]],
    // See the note above: inline is a framework requirement, eval is dev-only.
    ["script-src", ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])]],
    // `next/font` emits an inline <style> block for its @font-face rules.
    ["style-src", ["'self'", "'unsafe-inline'"]],
    // `data:` covers the image optimizer's inline blur placeholders.
    ["img-src", ["'self'", "data:", "blob:"]],
    ["font-src", ["'self'"]],
    ["media-src", ["'self'"]],
    ["connect-src", ["'self'", ...(isDev ? ["ws:", "wss:"] : [])]],
    ["worker-src", ["'self'", "blob:"]],
    ["manifest-src", ["'self'"]],
    // Nothing is embedded, and nothing may embed us.
    ["frame-src", ["'none'"]],
    ["child-src", ["'none'"]],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["frame-ancestors", ["'none'"]],
  ];

  const serialized = directives.map(([name, values]) => `${name} ${values.join(" ")}`);

  // Only meaningful over HTTPS, and would break the local http:// dev server.
  if (!isDev) serialized.push("upgrade-insecure-requests");

  return serialized.join("; ");
}

/**
 * Browser capabilities Shared Blood never uses. Disabling them means a future
 * regression (or an injected script) cannot silently reach a camera, a
 * microphone or a location.
 */
export const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "usb=()",
  "xr-spatial-tracking=()",
].join(", ");

/**
 * HSTS. One year, applied to subdomains, deliberately WITHOUT `preload`.
 *
 * Module 25.8 §9 requires that aggressive preloading wait until HTTPS is proven
 * across every intended subdomain, because preload entries are slow and painful
 * to reverse. Adding `preload` is a Module 26 decision for the project owner.
 */
export const STRICT_TRANSPORT_SECURITY = "max-age=31536000; includeSubDomains";

/**
 * The full header set applied to every response.
 *
 * @param {boolean} isDev
 * @returns {{ key: string, value: string }[]}
 */
export function buildSecurityHeaders(isDev = false) {
  return [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy(isDev) },
    { key: "Strict-Transport-Security", value: STRICT_TRANSPORT_SECURITY },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
    // Legacy backstop for `frame-ancestors 'none'` (§9 "where needed").
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
  ];
}

/** Header names that must be present on every HTML response. */
export const REQUIRED_SECURITY_HEADERS = buildSecurityHeaders(false).map((h) => h.key);
