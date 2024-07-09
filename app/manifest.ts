import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YZ13",
    short_name: "YZ13",
    background_color: "#fff",
    description: "Developers website",
    display_override: ["minimal-ui", "browser", "standalone"],
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/brand/yz-light.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/brand/yz-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Blog",
        url: "/threads",
        icons: [
          {
            src: "/brand/yz-light.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      {
        name: "Works",
        url: "/works",
        icons: [
          {
            src: "/brand/yz-dark.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
    ],
  };
}
