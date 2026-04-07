import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "desktop-bg": "var(--desktop-bg)",
        "window-bg": "var(--window-bg)",
        "titlebar-bg": "var(--titlebar-bg)",
        "os-border": "var(--os-border)",
        "accent-amber": "#c8a97e",
        "accent-teal": "#7eb8a0",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "monospace"],
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        window: "0 24px 64px rgba(0,0,0,0.6)",
        "window-light": "0 24px 64px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        window: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
