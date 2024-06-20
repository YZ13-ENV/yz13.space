import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
    },
    sitemap: "https://yz13.space/sitemap.xml",
  };
}
