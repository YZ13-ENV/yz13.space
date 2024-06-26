import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/threads", "/home"],
    },
    sitemap: "https://yz13.space/sitemap.xml",
  };
}
