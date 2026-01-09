/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#083A4F',
        gold: '#A58D66',
        aqua: '#C0D5D6',
        teal: '#407E8C',
        sand: '#E5E1DD'
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

