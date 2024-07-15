import { get } from "@vercel/edge-config";
import { unstable_flag as flag } from "@vercel/flags/next";
import { Features } from "./status.feature";

export const showFilesPage = flag<boolean>({
  key: "files-page",
  async decide() {
    const key = this.key;
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) return isDev;
    const features = await get<Features>("features");
    return features ? features[key] ?? false : false;
  },
  origin: "https://www.yz13.space/flags/files-page/",
  description: "Show status page link in dock",
  defaultValue: false,
  options: [
    { value: false, label: "Hide" },
    { value: true, label: "Show" },
  ],
});
