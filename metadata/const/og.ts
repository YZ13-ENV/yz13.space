import { getStorageItem } from "@yz13/supabase/storage";
import { Metadata } from "next";

export const openGraph: Metadata["openGraph"] = {
  type: "website",
  countryName: "Russia",
  description: "Developer that you look for",
  locale: "EN",
  url: "https://yz13.space",
  title: "YZ13",
  images: {
    url: getStorageItem(["static", "metadata/og-preview-light.png"]),
    width: 1200,
    height: 630,
  },
};
