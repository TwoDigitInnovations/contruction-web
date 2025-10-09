/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-blue": "#01D0E4",
        "light-blue": "#AEF8FF",
        "custom-black": "#141414",
        "custom-yellow": "#FFC909",
        "white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
