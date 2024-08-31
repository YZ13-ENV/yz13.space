import { Locales } from "@/metadata/locales/server";

const INTERNAL__journal = async (lang?: Locales) => {
  const defaultLang = "en";
  const base = "https://cms.yz13.space";
  const path = "/api/publisher/markdown/d5f98156-1776-42da-8f20-686d6a1ae2a8";
  const url = new URL(path, base);
  const searchParams = url.searchParams;
  searchParams.set("lang", lang ?? defaultLang);
  const response = await fetch(url.toString(), { method: "GET" });
  return await response.json();
};

export const journal = async (lang?: Locales) => {
  return await INTERNAL__journal(lang);
};
