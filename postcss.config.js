module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-focus-visible': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
