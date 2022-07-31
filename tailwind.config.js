/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class', '[data-mode="business"]'],
  theme: {
    extend: {
      fontFamily: {
        "primary": ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")]
};
