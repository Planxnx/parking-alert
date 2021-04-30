module.exports = {
  purge: [],
  // purge: [
  //   "./src/**/*.{js,jsx,ts,tsx}",
  //   "./pages/**/*.{js,ts,jsx,tsx}",
  //   "./public/index.html",
  // ], //Tree Shake
  // mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5",
      full: "9999px",
      large: "12px",
      mvp1: "40px",
    },
    fontFamily: {
      prompt: ["Prompt", "ui-sans-serif", "system-ui", "Open Sans"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      pinkyz: "#ED7F83",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      pinkyz: "#ED7F83",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      pinkyz: "#ED7F83",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
