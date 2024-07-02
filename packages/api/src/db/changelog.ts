import { isDev } from "../const";
import { ChangelogRecord } from "./types";

const getChangelog = async (lang?: string): Promise<ChangelogRecord[]> => {
  const url = isDev ? "http://localhost:3000" : "https://www.yz13.space";
  const path = "/api/changelog";
  const fetchURL = new URL(path, url);
  if (lang) fetchURL.searchParams.set("lang", lang);
  try {
    const response = await fetch(fetchURL.toString(), { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
export { getChangelog };
