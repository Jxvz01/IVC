/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivc: {
          bg: "#ffffff",
          card: "#f3f4f6", // gray-100
          text: "#1f2937", // gray-800
          primary: "#7c3aed", // Violet
          secondary: "#2563eb", // Blue
          accent: "#0891b2", // Cyan-600
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

