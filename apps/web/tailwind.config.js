/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#222630",
        backgroundDark: "#16181f",
        backgroundDarker: "#111111",
        display: "#5AF3E8",
      },
      fontFamily: {
        display: ["Comfortaa", "cursive"],
        secondary: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
