import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0A0A",
          soft: "#111111",
          card: "#1A1A1A",
          elevated: "#1E1E1E",
        },
        line: "#2A2A2A",
        muted: "#9CA3AF",
        subtle: "#6B7280",
      },
      fontFamily: {
        // Poppins via next/font (matches Figma body spec)
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Full display stack lives in globals.css (:root --font-display).
        // Prefers TT Supermolot Neue if present, otherwise Chakra Petch fallback.
        display: ["var(--font-display)"],
      },
      maxWidth: {
        shell: "1200px",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
