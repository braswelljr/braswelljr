const { withContentCollections } = require('@content-collections/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['oxc-transform', 'typescript', 'twoslash']
};

module.exports = withContentCollections(nextConfig);
