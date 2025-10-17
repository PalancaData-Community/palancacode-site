/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        panel: "#111218",
        text: "#eaeaf2",
        muted: "#a2a2b3",
        brand: "#7c5cff",
        border: "#1d1d27"
      },
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Ubuntu','Cantarell','Noto Sans','Helvetica Neue','Arial']
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
