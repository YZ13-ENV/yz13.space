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
        src: "/brand/yz-light-128.png",
        sizes: "any",
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
            src: "/brand/yz-light-32.png",
            sizes: "any",
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
            src: "/brand/yz-light-32.png",
            sizes: "any",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    ],
  };
}
