import { type NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
/**
 * Baseline response headers for every route.
 *
 * There is no Content-Security-Policy here on purpose. The theme and the global
 * error screen each run a small inline script, so a useful policy needs a
 * per-request nonce from a proxy, which would also turn every static page
 * dynamic. That is a separate decision from these, which cost nothing.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  serverExternalPackages: ['oxc-transform', 'typescript', 'twoslash', 'shiki']
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
