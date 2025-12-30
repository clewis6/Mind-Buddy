module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          sky: {
            50: '#eef7ff',
            100: '#d6edff',
            500: '#0ea5e9'
          },
          indigo: { 50:'#eef0ff', 100:'#e2e7ff', 500:'#6366f1' },
          emerald: { 50:'#eafaf2', 100:'#d7f8e6', 500:'#10b981' },
          rose: { 50:'#fff0f3', 100:'#ffe4e8', 500:'#f43f5e' },
          amber: { 50:'#fff6e5', 100:'#ffefcc', 500:'#f59e0b' }
        }
      },
      boxShadow: {
        glow: '0 10px 30px -10px rgba(99,102,241,0.25)'
      },
      backgroundImage: {
        'brand-hero': 'linear-gradient(90deg, #e2f3ff 0%, #eafaf2 35%, #eef0ff 70%, #fff0f3 100%)'
      }
    },
  },
  plugins: [],
}
