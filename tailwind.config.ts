import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'sf': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'garamond': ['EB Garamond', 'serif'],
        'lazy': ['Kalam', 'cursive'],
      },
      backgroundColor: {
        'sticky-yellow': '#fef3c7',
      },
      backgroundImage: {
        'grid': `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
    },
  },
  plugins: [],
};

export default config;