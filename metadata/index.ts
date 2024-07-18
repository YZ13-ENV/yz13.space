import { Locales } from "@/dictionaries/tools";
import { Metadata } from "next";
import { defaultMetadata } from "./const/default-metadata";
import { icons } from "./const/icons";
import { openGraph } from "./const/og";
import { twitter } from "./const/twitter";
import { verification } from "./const/verification";
import { keywords } from "./dynamic/keywords";
import { getLocaleMetadata } from "./locale/tools";
import pages from "./pages";

export type Page = keyof typeof pages;

export const dynamicMetadata = async (
  locale: Locales,
  path?: Page
): Promise<Metadata> => {
  const pageMetadata = path ? pages[path] ?? defaultMetadata : defaultMetadata;
  const words = await keywords();
  if (!path) {
    return {
      ...pageMetadata,
      icons,
      keywords: words,
      verification,
      openGraph,
      twitter,
    };
  } else {
    const localeMetadata = await getLocaleMetadata<Metadata>(path, locale);
    return {
      ...pageMetadata,
      ...localeMetadata,
      icons,
      keywords: words,
      verification,
      openGraph,
      twitter,
    };
  }
};
