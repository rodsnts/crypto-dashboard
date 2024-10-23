import type { Config } from "tailwindcss";
import catppuccin from "@catppuccin/tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    catppuccin({
      prefix: "ctp",
      defaultFlavour: "latte",
    }),
  ],
};
export default config;
