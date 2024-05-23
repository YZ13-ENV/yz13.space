import shared from "@repo/tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [shared],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  corePlugins: {
    preflight: false,
  },
};

export default config;
