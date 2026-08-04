import createNextIntlPlugin from 'next-intl/plugin';
import { buildSecurityHeaders } from './src/constants/securityHeaders.mjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Module 25.8 §24: do not advertise the framework to scanners.
  poweredByHeader: false,

  // Module 25.8 §24: keep production browser source maps off so that original
  // sources and comments are not published. There is no operational need for
  // them; error reporting is not wired to a symbolication service.
  productionBrowserSourceMaps: false,

  images: {
    // Module 25.8 §20/§21: an empty allowlist means the image optimizer will
    // only ever process local, version-controlled assets under `public/`. No
    // user-supplied or remote URL can reach it, which is what keeps the
    // upstream sharp/libvips advisories unreachable. Any future remote source
    // must be added here explicitly and reviewed.
    remotePatterns: [],
    // Never render SVG through the optimizer: SVG is an active content type and
    // Next disables it by default for exactly this reason. Stated explicitly so
    // that enabling it becomes a deliberate, reviewed act (§21).
    dangerouslyAllowSVG: false,
  },

  // Module 25.8 §9, §10: applied to every response, including static assets and
  // both locales. Definitions live in src/constants/securityHeaders.mjs so the
  // security test suite asserts the same values that are served.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: buildSecurityHeaders(isDev),
      },
    ];
  },
};

export default withNextIntl(nextConfig);
