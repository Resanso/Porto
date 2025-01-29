/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0a192f",
        "navy-light": "#112240",
        "navy-lighter": "#233554",
        "neon-cyan": "#64ffda",
        "neon-purple": "#bd34fe",
        slate: "#8892b0",
        "light-slate": "#ccd6f6",
        "lightest-slate": "#e2e8ff",
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-dark": "rgba(10, 25, 47, 0.7)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        "text-slide": "text-slide 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
