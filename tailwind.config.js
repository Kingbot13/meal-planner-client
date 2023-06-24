/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(250px, 1fr))",
      },
      translate: {
        '80': '20rem'
      }
    },
    colors: {
      "bubble-gum": "#FF70DF",
      "sea-turtle": "#54D177",
      "noon-sky": "#2DC7E9",
      warmth: "#FF7A1A",
      "primary-text": "#030A2F",
      "input-gray": "#EFF0F5",
      white: "#fff",
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
