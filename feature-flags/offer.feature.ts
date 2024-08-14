import { get } from "@vercel/edge-config";
import { unstable_flag as flag, FlagDeclaration } from "@vercel/flags/next";

export type Features = { [key: string]: boolean };

export const offer_flag: FlagDeclaration<boolean> = {
  key: "offer",
  async decide() {
    const key = this.key;
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return isDev;
    const features = await get<Features>("features");
    return features ? (features[key] ?? false) : false;
  },
  origin: "https://www.yz13.space/flags/dock-id-link/",
  description: "Show button to YZ13 ID",
  defaultValue: false,
  options: [
    { value: false, label: "Hide" },
    { value: true, label: "Show" },
  ],
};

export const showOffer = flag<boolean>(offer_flag);
