import { get } from "@vercel/edge-config";
import { unstable_flag as flag, FlagDeclaration } from "@vercel/flags/next";
import { Features } from "./status.feature";

export const tech_stack_flag: FlagDeclaration<boolean> = {
  key: "tech-stack",
  async decide() {
    const key = this.key;
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return isDev;
    const features = await get<Features>("features");
    return features ? features[key] ?? false : false;
  },
  origin: "https://www.yz13.space/flags/tech-stack/",
  description: "Show status on home page",
  defaultValue: false,
  options: [
    { value: false, label: "Hide" },
    { value: true, label: "Show" },
  ],
};

export const showTechStack = flag<boolean>(tech_stack_flag);
