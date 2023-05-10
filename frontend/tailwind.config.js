/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        "dark-bg": "#1F1D35",
        "bg-original": "#17152a",
        "light-white": "rgba(255,255,255,0.17)",
        "background": "#151627" ,
        "friend-list": "#252040",
        "dark-purple": "#1F1D35",
        "login-button": "#2C1C4F",
        "login-button-hover":  "#2A1260 ", 
        "info-home": "#1F1040",
        "footer-color": "#23272a",
        "footer-text": "#5865f2",
        'black-rgba': 'rgba(0, 0, 0, 0.3)',
        'register-button': "#366993",
      },
    },
  },
  plugins: [],
};