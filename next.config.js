/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { createLoader } = require('simple-functional-loader')
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  experimental: { esmExternals: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // clear cache
    defaultLoaders.babel.options.cache = false

    // resolve path
    config.resolve.modules.push(path.resolve(`./`))

    // file-loader config
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webp|avif|txt)$/i,
      issuer: /\.(jsx?|tsx?|mdx?)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]'
          }
        }
      ]
    })

    // load svg as react component
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: { removeViewBox: false } } }
        },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]'
          }
        }
      ]
    })

    // Remove the 3px deadzone for drag gestures in Framer Motion
    config.module.rules.push({
      test: /framer-motion/,
      use: createLoader(function (source) {
        return source.replace(
          /var isDistancePastThreshold = .*?$/m,
          'var isDistancePastThreshold = true'
        )
      })
    })

    return config
  },
  async redirects() {
    return require('./redirects.json')
  }
})
