import { Metadata } from "next";

export const journal: Metadata = {
  title: "Journal",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    type: "website",
    countryName: "Russia",
    description: "Developer that you look for",
    locale: "EN",
    url: "https://yz13.space",
    title: "Journal",
    images: {
      url: "https://og.yz13.space/yz13/OG-JOURNAL.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal",
    description: "Developer that you look for",
    siteId: "1794707806584446976",
    creator: "@YZ13_DEV",
    creatorId: "1794707806584446976",
    images: {
      url: "https://og.yz13.space/yz13/OG-JOURNAL.png",
    },
  },
};
