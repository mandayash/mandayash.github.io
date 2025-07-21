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
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'garamond': ['EB Garamond', 'serif'],
        'lazy': ['Lazy Script', 'cursive'], // Add this line
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(90deg, rgba(139, 206, 247, 0.1) 1px, transparent 1px),
                        linear-gradient(rgba(139, 206, 247, 0.1) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '24px 24px',
      }
    },
  },
  plugins: [],
}