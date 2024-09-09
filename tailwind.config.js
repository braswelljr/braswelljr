/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

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
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sen)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-lobster)', ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        xs: ['0.65rem', '0.75rem'],
        xsm: ['0.75rem', '1rem']
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
        '10xl': '110rem',
        '11xl': '120rem'
      },
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' }
      },
      backgroundImage: {},
      animation: {
        spin: 'spin 1s linear infinite',
        wiggle: 'wiggle 200ms ease-in-out infinite',
        'slide-up-fade': '100ms ease-in forwards slide-up-fade',
        'slide-down-fade': '100ms ease-in forwards slide-down-fade',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out'
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
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' }
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' }
        }
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
        maxHeight: 'max-height',
        maxWidth: 'max-width',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('tailwindcss-animate'),
    // direct child selector variant
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('not-first', '& > *:not(:first-child)')
      addVariant('not-last', '& > *:not(:last-child)')
    },
    // neon shadows
    plugin(({ addUtilities, theme }) => {
      const neonUtilities = {}
      const colors = theme('colors')

      // loop through colors
      for (const color in colors) {
        // check if color is an object
        if (typeof colors[color] === 'object') {
          // get the color shades
          const first = colors[color][100]
          const last = colors[color][900]

          // loop through shades
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${first}, 0 0 10px ${last}`
          }
        }
      }

      // add utilities
      addUtilities(neonUtilities)
    })
  ]
}
