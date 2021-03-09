const colors = require('tailwindcss/colors');

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
			black: colors.black, 
			white: colors.white, 
      gray: colors.gray,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.amber,
      red: colors.red,
    },
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      borderRadius: ['last'],
      backgroundColor: ['even'],
    },
  },
  plugins: [],
}
