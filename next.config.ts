import { type NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['oxc-transform', 'typescript', 'twoslash', 'shiki', '@sparticuz/chromium-min']
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
