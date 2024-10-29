import type { Config } from "tailwindcss";

const config: Config = {
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
    },
    screens: {
      sm: { max: "650px" }, // Styles for small screens (mobile) up to 650px
      md: "651px", // Styles for tablet screens from 651px and above
      lg: "1024px", // Styles for large screens from 1024px and above
      xl: "1280px", // Styles for extra-large screens from 1280px and above
    },
  },
};
export default config;
