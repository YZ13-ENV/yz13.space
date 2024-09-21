import { Locales } from "@/metadata/locales/server";
import { Tables } from "yz13/supabase/database";

export type Inspiration = Tables<"inspiration"> & {
  previewPath: string | null
  preview: boolean
}


const INTERNAL__inspirations = async (lang?: Locales, offset?: number) => {
  const defaultLang = "en";
  const base = "https://api.yz13.space";
  const path = "/inspiration";
  const url = new URL(path, base);
  const searchParams = url.searchParams;
  searchParams.set("lang", lang ?? defaultLang);
  if (offset) searchParams.set("offset", String(offset))
  const response = await fetch(url.toString(), { method: "GET" });
  return await response.json();
};

export const inspirations = async (lang?: Locales, offset?: number) => {
  return await INTERNAL__inspirations(lang, offset);
};

const INTERNAL__inspiration = async (id: string) => {
  const defaultLang = "en";
  const base = "https://api.yz13.space";
  const path = `/inspiration/${id}`;
  const url = new URL(path, base);
  const response = await fetch(url.toString(), { method: "GET" });
  return await response.json();
};


export const inspiration = async (id: string) => {
  return await INTERNAL__inspiration(id)
}

const INTERNAL__search_inspirations = async (query: string): Promise<Inspiration[]> => {
  const defaultLang = "en";
  const base = "https://api.yz13.space";
  const path = `/inspiration/search/${query}`;
  const url = new URL(path, base);
  const response = await fetch(url.toString(), { method: "GET" });
  return await response.json();
};


export const search_inspirations = async (query: string): Promise<Inspiration[]> => {
  return await INTERNAL__search_inspirations(query)
}
