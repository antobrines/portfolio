/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        darker: "rgb(var(--color-darker) / <alpha-value>)",
        neon: "rgb(var(--color-neon) / <alpha-value>)",
        purple: "rgb(var(--color-purple) / <alpha-value>)",
        // Glass is usually white with low opacity
        glass: "rgb(var(--color-glass) / 0.03)", 
        "glass-border": "rgb(var(--color-glass-border) / 0.08)",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
