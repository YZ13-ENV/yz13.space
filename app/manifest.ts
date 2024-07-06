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
        src: "/yz-light.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Blog",
        url: "/threads",
        icons: [
          {
            src: "/yz-light.png",
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
            src: "/yz-light.png",
            sizes: "any",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    ],
  };
}
