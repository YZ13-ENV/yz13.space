import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YZ13",
    short_name: "YZ13",
    background_color: "#fff",
    description: "Developers website",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "https://yzstatic.yz13.space/logo/yz-light-128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Journal",
        url: "/journal",
        icons: [
          {
            src: "https://yzstatic.yz13.space/logo/yz-light-32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      {
        name: "Works",
        url: "/works",
        icons: [
          {
            src: "https://yzstatic.yz13.space/logo/yz-light-32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    ],
  };
}
