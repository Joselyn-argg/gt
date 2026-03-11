/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        'primary': '#C5E0D9',        // Verde menta suave
        'secondary': '#D9E5E0',       // Verde agua pálido
        'accent': '#9F9AC7',          // Lila más intenso
        'accent2': '#E0E8E5',         // Gris verdoso
        'accent3': '#B8A2E6',         // Lavanda medio
        'dark': '#3A5E55',           // Verde oscuro
        'light': '#FFFFFF',          // Blanco puro
        },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

