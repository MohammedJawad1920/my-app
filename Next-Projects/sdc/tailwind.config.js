/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1440px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        extraLightGreen: "#e8f7f5",
        extraLightRed: "#fdecef",
        extraLightViolate: "#eceffc",
        extraLightYellow: "#fef7e8",
        lightGreen: "#d3f0ec",
        lightRed: "#fbdbe1",
        lightViolate: "#dbe1f9",
        lightYellow: "#fdf0d3",
        darkGreen: "#1ab79d",
        darkRed: "#ee4962",
        darkViolate: "#8f57ff",
        darkYellow: "#f8b720",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
