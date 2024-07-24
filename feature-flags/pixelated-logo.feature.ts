import { get } from "@vercel/edge-config";
import { unstable_flag as flag, FlagDeclaration } from "@vercel/flags/next";

export type Features = { [key: string]: boolean };

export const pixelated_logo_flag: FlagDeclaration<boolean> = {
  key: "pixel-logo",
  async decide() {
    const key = this.key;
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return isDev;
    const features = await get<Features>("features");
    return features ? features[key] ?? false : false;
  },
  origin: "https://www.yz13.space/flags/pixel-logo/",
  description: "Replace logo to pixelated one",
  defaultValue: false,
  options: [
    { value: false, label: "Default" },
    { value: true, label: "Pixelated" },
  ],
};

export const showPixelLogo = flag<boolean>(pixelated_logo_flag);
