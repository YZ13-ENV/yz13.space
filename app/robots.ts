import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/journal", "/home", "/works"],
      disallow: [
        "/",
        "/settings",
        "/changelog",
        "/team",
        "/services",
        "/threads",
      ],
    },
    sitemap: "https://www.yz13.space/sitemap.xml",
  };
}

// Allow: /?hl=
// Disallow: /?hl=*&
