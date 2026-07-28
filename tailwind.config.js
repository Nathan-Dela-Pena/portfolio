/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cork: "#C99253",
        frame: "#7E4E22",
        ink: "#26303F",
        // Paper stocks. Named for the stationery, not the hue, so the palette
        // survives a colour change without every reference going stale.
        paper: "#FCFAF3",
        canary: "#F2E06A",
        blush: "#F3A5AD",
        sky: "#A8C5EE",
        mint: "#B4DCBE",
        peach: "#F5C79A",
        lilac: "#C9AEE6",
      },
      fontFamily: {
        hand: ["Caveat", "Bradley Hand", "cursive"],
        sans: ["'IBM Plex Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
