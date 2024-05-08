import shared from "@repo/ui/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  corePlugins: {
    preflight: true,
  },
  presets: [shared],
};

export default config;
