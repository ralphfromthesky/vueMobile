/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      lineHeight: {
        "extra-tight": "1.1",
        "extra-snug": "1.2",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      colors: {
        bg: '#FFF0BB',
        txt: '#1A45B1',
        bord: '#3a61c2]',
        txt2: '#A0C5FB'
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class",
};
