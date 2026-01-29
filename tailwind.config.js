/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: '#9138ea',
          secondary: '#9333ea',
          light: '#f8f0ff',
          border: '#ecd8fe',
          glow: '#d7a9ff',
        },
      },
      fontFamily: {
        sans: ['SF Pro Text', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
