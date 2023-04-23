/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1F1D35",
        "light-white": "rgba(255,255,255,0.17)",
        "background": "#151627" ,
        "friend-list": "#252040",
      },
    },
  },
  plugins: [],
};