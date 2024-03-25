import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
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
        '4.5': '18',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;

export default config;
