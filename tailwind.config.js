/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cgray: "#323232",
        boxblack: "#282424",
        linkBlue: "#3869E1",
        hoverGray: "#B9B9B9",
        hoverRed: "#EB837B",
        cancelRed: "#E74133",
        lilPurp: "#8170ED",
        authBg: "#B9B9B9",
        mainBoxesBg: "#D9D9D9",
        oddColor: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
