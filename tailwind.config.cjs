/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
