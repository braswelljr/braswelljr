const color = require("tailwindcss/colors");

module.exports = {
  purge: {
    mode: "all",
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    preserveHtmlElements: true
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: color.trueGray
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
