import shared from "@repo/ui/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [shared],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  corePlugins: {
    preflight: true,
  },
};

export default config;
