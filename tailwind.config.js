/** @type {import('tailwindcss').Config} */
import * as flowbitPlugin from 'flowbite/plugin'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
      colors: {
        primary: {
          ...colors.amber,
          DEFAULT: 'rgb(34, 197, 94)',
        },
        primary2: {
          50: '#EBF5FF',
          100: '#E1EFFE',
          200: '#C3DDFD',
          300: '#A4CAFE',
          400: '#76A9FA',
          500: '#3F83F8',
          600: '#1C64F2',
          700: '#1A56DB',
          800: '#1E429F',
          900: '#233876',
          DEFAULT: '#233876',
        },
      },
      boxShadow: {
        sideBar: '0 .5rem 1rem 0 rgba(44, 51, 73, .1)',
      },
    },
  },
  plugins: [flowbitPlugin],
}
