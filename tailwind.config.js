/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        sprite: {
          '0%': { "background-position": '0px' },
          '100%': { "background-position": '288px' },
        }
      },
      animation: {
        'seal-sprite': 'sprite 1.5s steps(3) infinite',
      }
    },
  },
  plugins: [],
}

