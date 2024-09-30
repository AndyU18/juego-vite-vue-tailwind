# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
VUE + VITE + TAILWIND
- directorio
cd "directorio"
mkdir "nombre_carpeta"

- crear proyecto
npm create vite@latest
"nombre_proyecto"
framework
variant

- abrir visual studio
code nombre_proyecto (code tab)
npm i

- tailwind:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

- configurar archivo
tailwind.config.js:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

- añadir al archivo style.css
style.css

@tailwind base;
@tailwind components;
@tailwind utilities;

- en la terminal
Terminal

npm run dev

- probar en el App.vue
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>

- para el ruteo
pm install vue-router
