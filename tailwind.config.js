const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF385C',
        // Dark colors generate by using https://uicolors.app/create
        // Dark Mode UI Course 1 explains why: https://www.youtube.com/watch?v=CZqcnxLd978
        // Primary color is 500
        // Dark primary color is 300
        'dark-primary': '#FF9FAC',
        'text-primary': colors.neutral[700],
        'text-secondary': colors.neutral[400],
      },
      spacing: {
        4.5: 18,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
