/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Agregar Flowbite
    "./node_modules/kutty/**/*.js", // Agregar Kutty
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Agregar Flowbite como plugin
    require("kutty"), // Agregar Kutty como plugin
  ],
}
