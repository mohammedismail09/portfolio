/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: '#023246',
          primary: '#287094',
          border: '#D4D4CE',
          bg: '#F6F6F6',
        }
      },
    },
  },
  plugins: [],
}