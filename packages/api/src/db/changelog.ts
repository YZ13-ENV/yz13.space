import { emptyApiResponse } from "../helpers/empty-api-response";
import { APIResponse, ChangelogRecord } from "./types";

const getChangelog = async (
  lang?: string
): Promise<APIResponse<ChangelogRecord[]>> => {
  const url = "https://www.api.yz13.space";
  const path = "/api/changelog";
  const fetchURL = new URL(path, url);
  if (lang) fetchURL.searchParams.set("lang", lang);
  try {
    const response = await fetch(fetchURL.toString(), { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else return emptyApiResponse([]);
  } catch (e) {
    console.log(e);
    return emptyApiResponse([]);
  }
};
export { getChangelog };
