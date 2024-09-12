import { Metadata } from "next";

export default {
  title: "Changelog",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    type: "website",
    countryName: "Russia",
    description: "Developer that you looking for",
    locale: "EN",
    url: "https://yz13.space",
    title: "YZ13",
    images: {
      url: "https://cdn.yz13.space/og/yz13/default.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "YZ13",
    description: "Developer that you looking for",
    siteId: "1794707806584446976",
    creator: "@YZ13_DEV",
    creatorId: "1794707806584446976",
    images: {
      url: "https://cdn.yz13.space/og/yz13/default.png",
    },
  },
} satisfies Metadata;
