/** @type {import('tailwindcss').Config} */
export default {

  // Enables dark mode using class="dark"
  darkMode: "class",

  // Files Tailwind should scan
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        // Primary brand colors
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },

        // Dark mode colors
        dark: {
          100: "#1e293b",
          200: "#0f172a",
          300: "#020617",
        },

      },

      // Extra small text
      fontSize: {
        xxs: "0.65rem",
      },

      // Custom animations
      animation: {

        "pulse-slow":
          "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        "fade-in":
          "fadeIn 0.3s ease-in-out",

        "slide-in":
          "slideIn 0.3s ease-in-out",

      },

      // Animation keyframes
      keyframes: {

        fadeIn: {

          "0%": {
            opacity: "0",
            transform: "translateY(8px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },

        },

        slideIn: {

          "0%": {
            transform: "translateX(-100%)",
          },

          "100%": {
            transform: "translateX(0)",
          },

        },

      },

    },

  },

  plugins: [],

};