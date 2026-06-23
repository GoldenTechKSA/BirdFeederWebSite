/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces & ink
        cream: "#FBF7EF",
        bone: "#F3EADA",
        ink: "#0F172A",
        // Botanical green scale (brand primary)
        botanical: {
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          400: "#34D399",
          600: "#059669",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#07261C",
        },
        // Amber nectar accent
        nectar: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        // Iridescent gorget stops (used for gradients/accents)
        iris: {
          emerald: "#10B981",
          teal: "#14B8A6",
          ruby: "#E11D48",
          magenta: "#DB2777",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        organic: "2rem",
        "organic-lg": "2.75rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(15,23,42,0.12)",
        lift: "0 24px 60px -16px rgba(21,128,61,0.28)",
        nectar: "0 12px 30px -10px rgba(217,119,6,0.40)",
        glow: "0 0 50px -10px rgba(16,185,129,0.45)",
      },
      backgroundImage: {
        iridescent:
          "linear-gradient(120deg, #10B981 0%, #14B8A6 34%, #E11D48 72%, #DB2777 100%)",
        "iridescent-mesh":
          "radial-gradient(60% 60% at 15% 20%, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0) 70%), radial-gradient(55% 55% at 85% 25%, rgba(20,184,166,0.28) 0%, rgba(20,184,166,0) 70%), radial-gradient(50% 50% at 80% 85%, rgba(225,29,72,0.18) 0%, rgba(225,29,72,0) 70%), radial-gradient(60% 60% at 25% 90%, rgba(217,119,6,0.20) 0%, rgba(217,119,6,0) 70%)",
      },
      keyframes: {
        "iris-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "iris-shift": "iris-shift 9s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
