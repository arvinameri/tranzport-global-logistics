/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00d26a",
          dark: "#0b1221",
          gray: "#8892B0",
          light: "#e6f1ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        vazirmatn: ["var(--font-vazirmatn)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": {
            transform: "translate3d(0, 0, 0)",
          },
          "100%": {
            transform: "translate3d(-50%, 0, 0)",
          },
        },
      },
      animation: {
        marquee: "marquee 70s linear infinite",
      },
    },
  },
  plugins: [],
};
