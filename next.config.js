const { createContentlayerPlugin } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return []
  }
}

const withContentlayer = createContentlayerPlugin({})

module.exports = withContentlayer(nextConfig)
