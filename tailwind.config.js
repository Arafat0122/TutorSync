/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "cardo": ["Cardo", "serif"],
        "exo-2": ["Exo 2", "sans-serif"],
        "kavivanar": ["Kavivanar", "cursive"],
        "lobster": ["Lobster", "cursive"],
        "gluten": ["Gluten", "cursive"],
        "rowdies": ["Rowdies", "sans-serif"],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

