import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/threads", "/home", "/works"],
      disallow: ["/settings", "/services"],
    },
    sitemap: "https://www.yz13.space/sitemap.xml",
  };
}
