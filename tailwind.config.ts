import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark spatial base — deep blue-black
        void: "#070b14",
        surface: "#0c1220",
        elevated: "#131e30",
        border: "#1a2840",
        // Text
        "text-primary": "#e8edf5",
        "text-secondary": "#7a8aa0",
        "text-muted": "#3d4f63",
        "text-tertiary": "#3d4f63",
        // Primary accent — plasma cyan
        plasma: {
          DEFAULT: "#00d4ff",
          light: "#40e5ff",
          dark: "#009bbd",
        },
        // Secondary accent — nova violet
        nova: {
          DEFAULT: "#a259f7",
          light: "#c084ff",
          dark: "#6b32c4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
