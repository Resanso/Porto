/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0a192f",
        "navy-light": "#112240",
        "neon-cyan": "#64ffda",
        slate: "#8892b0",
        "light-slate": "#ccd6f6",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        "text-slide": "text-slide 12s linear infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        particle: "particle 1s ease-out forwards",
      },
      keyframes: {
        "text-slide": {
          "0%, 16%": {
            transform: "translateY(0%)",
          },
          "20%, 36%": {
            transform: "translateY(-16.66%)",
          },
          "40%, 56%": {
            transform: "translateY(-33.33%)",
          },
          "60%, 76%": {
            transform: "translateY(-50%)",
          },
          "80%, 96%": {
            transform: "translateY(-66.66%)",
          },
          "100%": {
            transform: "translateY(-83.33%)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(100, 255, 218, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(100, 255, 218, 0.4)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
