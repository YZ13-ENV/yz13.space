import { getStorageItem } from "@yz13/supabase/storage";
import { Metadata } from "next";

export const icons: Metadata["icons"] = {
  icon: [
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)",
      url: "https://yzstatic.yz13.space/logo/yz-light.svg",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)",
      url: "https://yzstatic.yz13.space/logo/yz-dark.svg",
    },
  ],
};
