// import type { Config } from "tailwindcss";

const config = {
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
  },
  plugins: [
    // eslint-disable-next-line func-names
    function ({ addUtilities }) {
      const newUtilities = {
        ".line-clamp-2": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
          overflow: "hidden",
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    // eslint-disable-next-line global-require
    require("@tailwindcss/typography"),
  ],
};
export default config;
