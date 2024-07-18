import { Metadata } from "next";

export const home: Metadata = {
  title: "Home",
  alternates: {
    canonical: "/home",
    languages: {
      ru: "/home?lang=ru",
      en: "/home?lang=en",
    },
  },
};
