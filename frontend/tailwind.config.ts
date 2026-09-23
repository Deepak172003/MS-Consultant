import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#132242', 2: '#1c3157' },
        marigold: { DEFAULT: '#f2a53a', ink: '#7a4c0c' },
        teal: '#1f8a70',
        rose: '#c85a52',
        paper: { DEFAULT: '#fbfaf6', 2: '#f3f1e9' },
        line: '#e2ddce',
        ink: '#1b2233',
        slate: { DEFAULT: '#4b526a', soft: '#7a8098' },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { s: '4px', m: '10px' },
    },
  },
  plugins: [],
};
export default config;
