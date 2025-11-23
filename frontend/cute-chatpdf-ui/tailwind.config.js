/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        kawaii: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e", // Darker pink for accents
        },
        paper: "#fffdf5", // Slight cream for notebook paper
      },
      fontFamily: {
        cute: ['"Nunito"', 'sans-serif'], // Recommend installing Nunito or similar
      },
      animation: {
        'animal-walk': 'walk 15s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        walk: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        }
      }
    },
  },
  plugins: [],
};