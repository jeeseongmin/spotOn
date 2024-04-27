/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#96C2FF",
          DEFAULT: "#06367A",
        },
        black: "#1A1A1A",
        white: {
          DEFAULT: "#FFFFFF",
          dull: "#F9F9F9",
        },
        gray: {
          light: "#F2F2F2",
          middle: "#CCCCCC",
          dull: "#9C9C9C",
          dark: "#616161",
        },
        sunday: "#FF6161",
        saturday: "#4D54FF",
      },
      fontSize: {
        base: "15px",
        small: "13px",
      },
      fontFamily: {
        sans: ["Noto Sans KR"],
      },
      keyframes: {
        dropdownOpen: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "dropdown-open": "dropdownOpen 0.4s ease",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
