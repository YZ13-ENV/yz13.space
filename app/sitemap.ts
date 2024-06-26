import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yz13.space/threads",
      priority: 1,
    },
    {
      url: "https://yz13.space/home",
      priority: 0.9,
    },
  ];
}
