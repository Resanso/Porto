module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0a192f",
        "neon-cyan": "#64ffda",
        glass: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        "text-slide": "text-slide 12s linear infinite",
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
      },
      backdropFilter: {
        glass: "blur(10px)",
      },
      borderWidth: {
        glow: "1px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
