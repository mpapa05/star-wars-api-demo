/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "st-1": "url('/bg-1.jpeg')",
        "st-2": "url('/bg-2.webp')",
        "st-3": "url('/bg-3.jpeg')",
        "st-4": "url('/bg-4.jpeg')",
        "st-5": "url('/bg-5.jpeg')",
        "st-6": "url('/bg-6.jpeg')",
        "st-7": "url('/bg-7.jpeg')",
        "st-8": "url('/bg-8.jpeg')",
        "st-bg": "url('/starwars-cover",
        "st-hyper": "url('/hyperspace-bg.jpg')"
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '10px 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

