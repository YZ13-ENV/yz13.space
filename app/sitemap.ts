import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yz13.space/home",
      priority: 1,
    },
    {
      url: "https://yz13.space/journal",
      priority: 0.9,
    },
    {
      url: "https://yz13.space/works",
      priority: 0.8,
    },
  ];
}
