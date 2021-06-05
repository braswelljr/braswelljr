const defaultTheme = require('tailwindcss/defaultTheme')
const color = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      xs: '475px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    fontFamily: {
      sans: ["'Limelight', cursive", ...defaultTheme.fontFamily.sans],
      mono: [
        "'Montserrat Alternates', sans-serif",
        ...defaultTheme.fontFamily.mono
      ],
      serif: ["'Dancing Script', cursive", ...defaultTheme.fontFamily.serif]
    },
    extend: {
      colors: {
        gray: color.trueGray,
        cyan: color.cyan,
        ember: color.ember
      },
      animation: {
        movebg: 'moveBackground 15s ease alternate infinite'
      },
      keyframes: {
        moveBackground: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '50% 100%' },
          '100%': { backgroundPosition: '50% 0%' }
        }
      },
      backgroundImage: {}
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
