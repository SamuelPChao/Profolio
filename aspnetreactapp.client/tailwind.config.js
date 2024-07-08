/** @type {import('tailwindcss').Config} */
// import plugin from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        15: "3.75rem",
        25: "6.25rem",
        50: "12.5rem",
      },
      wordSpacing: {
        sm: "0.05em",
        md: "0.1em",
        lg: "0.15em",
        xl: "0.2em",
      },
      colors: {
        "white-1": "#ffffff",
        "white-2": "#dddddd",
        "white-3": "#bbbbbb",
        "black-1": "#101010",
        "black-2": "#151515",
        "black-3": "#202020",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
        "fade-out": "fadeOut 1s ease-in-out forwards",
        "fade-in-out": "fadeInOut 2s ease-in-out infinite",
        "fade-in-out-drop": "fadeInOutDrop 2s ease-in-out infinite",
        "fade-in-down": "fadeInDown 1s ease-out forwards",
        "fade-display": "fadeDisplay 1.5s ease-out forwards",
      },
      boxShadow: {
        light: "0 10px 20px -5px rgba(255,255,255,0.1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeInOut: {
          "0%": { opacity: 0.25 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0.25 },
        },
        fadeInOutDrop: {
          "0%": { opacity: 0.25, transform: "translateY(-25%)" },
          "50%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0.25, transform: "translateY(-25%)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-10vh)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeDisplay: {
          "0%": { opacity: 0, display: "none" },
          "100%": { opacity: 1, display: "block" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, matchUtilities, theme }) {
      // 添加預定義的 utilities
      addUtilities({
        ".word-spacing-sm": { wordSpacing: theme("wordSpacing.sm") },
        ".word-spacing-md": { wordSpacing: theme("wordSpacing.md") },
        ".word-spacing-lg": { wordSpacing: theme("wordSpacing.lg") },
        ".word-spacing-xl": { wordSpacing: theme("wordSpacing.xl") },
      });

      // 添加支持任意值的 utility
      matchUtilities(
        {
          "word-spacing": (value) => ({
            wordSpacing: value,
          }),
        },
        { values: theme("wordSpacing") }
      );
    },
  ],
};
