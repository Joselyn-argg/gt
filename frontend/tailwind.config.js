/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        'primary': '#aeb0eb',        // Lavanda muy suave
        'secondary': '#D8D0F0',       // Lavanda pálido
        'accent': '#9B8BC2',          // Lavanda medio
        'accent2': '#C2B3E6',         // Lavanda claro
        'accent3': '#B0A1D9',         // Lavanda medio suave
        'dark': '#5E4B7A',           // Púrpura oscuro
        'light': '#FFFFFF',          // Blanco puro
        },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

