import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/threads",
        "/threads?lang=ru",
        "/threads?lang=en",
        "/home",
        "/works",
      ],
      disallow: ["/", "/settings", "/services"],
    },
    sitemap: "https://www.yz13.space/sitemap.xml",
  };
}

// Allow: /?hl=
// Disallow: /?hl=*&
