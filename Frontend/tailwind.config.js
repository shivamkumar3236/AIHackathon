/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          dark: '#0e1e25',
          navy: '#132832',
          card: '#18313d',
          accent: '#10b981',
          blue: '#2563eb',
          amber: '#f59e0b',
          rose: '#f43f5e',
          cyan: '#06b6d4'
        }
      }
    },
  },
  plugins: [],
}
