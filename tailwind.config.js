/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#F7F7F7',
        'text-primary': '#232121',
        'folder-blue': '#8BCEF7',
        'sticky-yellow': '#FCF4A7',
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
        'garamond': ['EB Garamond', 'serif'],
        'lazy': ['Lazy Script', 'cursive'],
      },
    },
  },
  plugins: [],
}