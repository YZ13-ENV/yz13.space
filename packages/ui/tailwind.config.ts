import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets" | "content" | "corePlugins"> = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "ui-",
  presets: [sharedConfig],
};

export default config;
