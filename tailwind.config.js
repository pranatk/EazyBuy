/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: "#F19D38",
        },
        secondary: {
          darkBlack: "#141920",
          medium: "#252F3D",
          blue: "#007185",
          red: "#B12704",
          yellow: "#F4BF76",
          darkYellow: "#F2A742",
          orange: "#C45500",
          hoverOrange: "#B65B22",
          grey: "#DDDDDD",
          darkGrey: "#C9CCCC",
          disabledGrey: "#565959",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
