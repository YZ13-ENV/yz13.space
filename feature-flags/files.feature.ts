import { unstable_flag as flag } from "@vercel/flags/next";

export const showFilesPage = flag<boolean>({
  key: "files-page",
  async decide() {
    const isDev = process.env.NODE_ENV === "development";
    return isDev;
  },
  origin: "https://www.yz13.space/flags/files-page/",
  description: "Show Summer Holiday Sale Banner, 20% off",
  defaultValue: false,
  options: [
    { value: false, label: "Hide" },
    { value: true, label: "Show" },
  ],
});
