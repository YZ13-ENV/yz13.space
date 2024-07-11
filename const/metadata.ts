import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YZ13",
  description: "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
  authors: [{ name: "YZ13", url: "https://github.com/yz13-env" }],
  metadataBase: new URL("https://yz13.space"),
  // alternates: {
  //   canonical: "/home"
  // },
  openGraph: {
    type: "website",
    countryName: "Russia",
    description:
      "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
    locale: "RU",
    url: "https://yz13.space",
    title: "YZ13",
    images: "https://yz13.space/thumbnail.png",
  },
  verification: {
    yandex: "294dbd367a5afd6b",
  },
  robots: { index: true, follow: true },
  keywords: [
    "frontend",
    "web-developer",
    "developer",
    "yz13",
    "yz",
    "yz13 lab",
    "yz13 space",
    "it",
    "ui",
    "design",
    "разработчик",
    "фронтенд",
  ],
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        url: "/brand/yz-light.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        url: "/brand/yz-dark.svg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "YZ13",
    description:
      "Hi, I'm a YZ13 web developer, hire me, i create cool websites",
    siteId: "1794707806584446976",
    creator: "@YZ13_DEV",
    creatorId: "1794707806584446976",
    images: {
      url: "https://yz13.space/thumbnail.png",
    },
  },
};
