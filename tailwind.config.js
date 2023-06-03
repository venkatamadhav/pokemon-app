/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pokemon-red" : "#EF5350",
        "pokemon-blue": "#2A75BB",
        "pokemon-yellow": "#FECA1B",
      }
    },
  },
  plugins: [],
}

