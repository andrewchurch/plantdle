/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': {
          100: '#DBFFEC',
          200: '#BFFED0',
          300: '#A3E1B4',
          400: '#88C599',
          500: '#6DAA7F',
          600: '#548F66',
          700: '#3A754E',
          800: '#205C37',
          900: '#014421'
        }
      }
    },
  },
  plugins: [],
}

