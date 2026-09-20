/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ai: {
          bg: '#080c14',
          surface: '#0d131f',
          card: '#111927',
          cardHover: '#162235',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.16)',
          cyan: '#00f2fe',
          teal: '#05d5b3',
          emerald: '#10b981',
          amber: '#fbbf24',
          rose: '#f43f5e',
          indigo: '#6366f1',
          muted: '#94a3b8'
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 242, 254, 0.3)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.3)',
        'glow-rose': '0 0 25px -4px rgba(244, 63, 94, 0.3)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}
