// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,vue,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xxs: '320px',
      xs: '375px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        sans: ["'Ubuntu'", ...defaultTheme.fontFamily.sans],
        mono: ["'Syne Tactile'", ...defaultTheme.fontFamily.mono]
      },
      backgroundImage: {},
      animation: {
        spin: 'spin 1s linear infinite'
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ]
}
