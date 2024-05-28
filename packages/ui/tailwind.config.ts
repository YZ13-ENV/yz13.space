import shared from "@repo/tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  corePlugins: {
    preflight: false,
  },
  presets: [shared],
};

export default config;
