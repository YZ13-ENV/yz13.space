import { get } from "@vercel/edge-config";
import { unstable_flag as flag, FlagDeclaration } from "@vercel/flags/next";

export type Features = { [key: string]: boolean };

export const status_flag: FlagDeclaration<boolean> = {
  key: "status",
  async decide() {
    const key = this.key;
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return isDev;
    const features = await get<Features>("features");
    return features ? features[key] ?? false : false;
  },
  origin: "https://www.yz13.space/flags/status/",
  description: "Show status on home page",
  defaultValue: false,
  options: [
    { value: false, label: "Hide" },
    { value: true, label: "Show" },
  ],
};

export const showStatus = flag<boolean>(status_flag);
