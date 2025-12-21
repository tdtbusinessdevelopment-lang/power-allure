/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#d6b48e',
        'dark-gray': '#3a3a3a',
      },
    },
  },
  plugins: [],
}
