import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GCT', 'sans-serif'],
      },
      colors: {
        primary: '#1E90FF',
        accent: '#00BFFF',
        light: '#00D6FA',
        dark: '#106FC7',
        black: '#2B2B2B',
        white: '#FFFFFF',
        grey: '#2A425B',
        sub: '#7CD0FF',
        success: '#00C9A7',
        info: '#8BE9FD',
      },
    },
  },
};

export default config;
