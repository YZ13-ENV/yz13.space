import { Metadata } from "next";

export const home: Metadata = {
  title: "Home",
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    type: "website",
    countryName: "Russia",
    description: "Developer that you look for",
    locale: "EN",
    url: "https://yz13.space",
    title: "YZ13",
    images: {
      url: "https://og.yz13.space/yz13/OG-HOME.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "YZ13",
    description: "Developer that you look for",
    siteId: "1794707806584446976",
    creator: "@YZ13_DEV",
    creatorId: "1794707806584446976",
    images: {
      url: "https://og.yz13.space/yz13/OG-HOME.png",
    },
  },
};
