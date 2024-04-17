/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06367A",
          lighten: "#96C2FF",
        },
        black: "#1A1A1A",
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
