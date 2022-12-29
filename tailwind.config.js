// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: ['./src/**/*.{js,jsx,ts,tsx,vue,mdx,md}'],
  darkMode: 'class',
  theme: {
    screens: {
      xxs: '320px',
      xs: '375px',
      xsm: '425px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        sans: ["'Sen'", ...defaultTheme.fontFamily.sans],
        serif: ["'Lobster'", ...defaultTheme.fontFamily.serif],
        mono: ["'Jetbrains Mono'", ...defaultTheme.fontFamily.mono]
      },
      colors: {
        brown: {
          900: '#382519',
          800: '#462e20',
          700: '#63412c',
          600: '#7f5439',
          500: '#8d5d3f',
          400: '#9b6646',
          300: '#b37a56',
          200: '#c09072',
          100: '#caae9e',
          50: '#d9bcab'
        }
      },
      backgroundImage: {},
      animation: {
        spin: 'spin 1s linear infinite',
        wiggle: 'wiggle 200ms ease-in-out infinite',
        'slide-up-fade': '100ms ease-in forwards slide-up-fade',
        'slide-down-fade': '100ms ease-in forwards slide-down-fade'
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' }
        },
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'slide-down-fade': {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' }
        }
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
        maxHeight: 'max-height',
        maxWidth: 'max-width'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    // direct child selector variant
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('not-first', '& > *:not(:first-child)')
      addVariant('not-last', '& > *:not(:last-child)')
    }
  ]
}
