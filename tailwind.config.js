/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unbounded: "'Unbounded', sans-serif",
        roboto: "'Roboto', sans-serif",
        poppins: "'Poppins', sans-serif",
      },
    },
  },
  plugins: [],
};
