import { getStorageItem } from "@yz13/supabase/storage";
import { Metadata } from "next";

export const twitter: Metadata["twitter"] = {
  card: "summary",
  title: "YZ13",
  description: "Developer that you look for",
  siteId: "1794707806584446976",
  creator: "@YZ13_DEV",
  creatorId: "1794707806584446976",
  images: {
    url: getStorageItem(["static", "metadata/og-preview-light.png"]),
  },
};
