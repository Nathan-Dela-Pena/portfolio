export default {
  plugins: {
    // Must run before Tailwind so the layered @imports in index.css resolve.
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
