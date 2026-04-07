/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E3A8A',
          green: '#10B981',
        },
      },
      boxShadow: {
        glow: '0 20px 60px rgba(30, 58, 138, 0.18)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(16,185,129,0.14), transparent 35%), linear-gradient(135deg, rgba(30,58,138,0.95), rgba(15,23,42,0.98))',
      },
    },
  },
  plugins: [],
};