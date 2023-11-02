/* eslint-disable @typescript-eslint/no-var-requires */
const { createContentlayerPlugin } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return []
  }
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

module.exports = withContentlayer(nextConfig)
