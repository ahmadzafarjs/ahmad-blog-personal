/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { poppins: ["Poppins"], ibex: ["IBM Plex Mono"] },
    extend: {},
  },
  plugins: [require("daisyui")],
};
