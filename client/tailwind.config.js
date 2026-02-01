/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivc: {
          bg: "#05070a", // Deep space black
          "bg-light": "#f2f2f7", // iOS Light gray
          text: "#f8fafc",
          "text-dark": "#1d1d1f", // Apple text color
          primary: "#6366f1",
          secondary: "#22d3ee",
          accent: "#c084fc",
          glass: "rgba(255, 255, 255, 0.08)",
          "glass-dark": "rgba(0, 0, 0, 0.3)",
        }
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'ios-xl': '24px',
        'ios-lg': '18px',
      },
      boxShadow: {
        'ios': '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'liquid': '0 20px 50px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'liquid': '24px',
      },
      transitionTimingFunction: {
        'ios': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}

