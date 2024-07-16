import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/journal",
        "/journal?lang=ru",
        "/journal?lang=en",
        "/home",
        "/home?lang=ru",
        "/home?lang=en",
        "/works",
        "/works?lang=ru",
        "/works?lang=en",
      ],
      disallow: ["/", "/settings", "/services", "/threads"],
    },
    sitemap: "https://www.yz13.space/sitemap.xml",
  };
}

// Allow: /?hl=
// Disallow: /?hl=*&
