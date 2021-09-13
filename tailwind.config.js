module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        monk: '#e05312'
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '4000': '4000ms',
        '10000': '10s',
        '20000': '20s'
       },
       animation: {
        'spin-slow': 'spin 10s linear infinite'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
