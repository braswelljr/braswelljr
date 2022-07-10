/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { createLoader } = require('simple-functional-loader')

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
      disableStaticImages: true
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // clear cache
      defaultLoaders.babel.options.cache = false

      // resolve path
      config.resolve.modules.push(path.resolve(`./`))

      // file-loader config
      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webp|txt)$/i,
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
    }
  }
)
