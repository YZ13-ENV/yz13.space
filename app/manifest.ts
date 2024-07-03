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
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    shortcuts: [
      {
        name: "Blog",
        url: "/threads",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "any",
            type: "image/x-icon",
            purpose: "any",
          },
        ],
      },
      {
        name: "Works",
        url: "/works",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "any",
            type: "image/x-icon",
            purpose: "any",
          },
        ],
      },
    ],
  };
}
