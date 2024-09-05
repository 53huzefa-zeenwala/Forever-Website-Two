import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "nav-light": {
          100: "#C1E8FF",
          200: "#7da0ca",
          300: "#5482b3",
          400: "#052659",
          500: "#021024",
        },
      },
    },
  },
  plugins: [],
};
export default config;
