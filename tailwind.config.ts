import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GCT', 'sans-serif'],
      },
      colors: {
        background: "#ffffff",
        foreground: "#171717",
        primary: "#1E90FF",
        secondary: "#4682B4",
        accent: "#00BFFF",
        light: "#00D6FA",
        dark: "#1288F8",
        black: "#2B2B2B",
        white: "#FFFFFF",
        grey: "#2A425B",
        gray: "#2A425B",
        sub: "#7CD0FF",
        success: "#00C9A7",
        warning: "#FFB86C",
        error: "#FF5555",
        info: "#8BE9FD",
      },
    },
  },
};

export default config;