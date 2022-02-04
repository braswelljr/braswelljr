/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching,
          disable: process.env.NODE_ENV === 'development'
        }
      }
    ]
  ],
  {
    reactStrictMode: true,
    images: {
      domains: ['image.tmdb.org']
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // clear cache
      defaultLoaders.babel.options.cache = false

      // resolve path
      config.resolve.modules.push(path.resolve(`./`))

      return config
    }
  }
)
