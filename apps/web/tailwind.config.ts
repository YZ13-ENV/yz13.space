import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  corePlugins: {
    preflight: true,
  },
  presets: [sharedConfig],
};

export default config;
