/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'health-green': '#66bb6a',
        'health-dark': '#1b3022',
        'health-bg': '#e8f5e9',
      }
    },
  },
  plugins: [],
}