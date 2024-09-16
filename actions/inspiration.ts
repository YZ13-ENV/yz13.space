import { Locales } from "@/metadata/locales/server";

const INTERNAL__inspiration = async (lang?: Locales) => {
  const defaultLang = "en";
  const base = "https://api.yz13.space";
  const path = "/inspiration";
  const url = new URL(path, base);
  const searchParams = url.searchParams;
  searchParams.set("lang", lang ?? defaultLang);
  const response = await fetch(url.toString(), { method: "GET" });
  return await response.json();
};

export const inspiration = async (lang?: Locales) => {
  return await INTERNAL__inspiration(lang);
};
