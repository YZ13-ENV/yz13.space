import { config as mono } from "@yz13/mono/config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [mono],
  content: ["./components/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}"],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      fontFamily: {
        pixel: "var(--font-pixel)",
      },
    },
  },
};

export default config;
