/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "light-black":"#1f1f1f",
        "yellow":"#dbf508",
        "light-gray":"#0d0d0d",
        "dark-peach":"#f17070",
        "accent":"#777777",
        "accent-border":"#333333"
      }
    },
  },
  plugins: [],
}