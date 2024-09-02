import { actionClient } from "../safe-client";
import { schema } from "./schema";

export const publicationMarkdown = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { path } }) => {
    const base = "https://cms.yz13.space";
    const pathname = `/api/markdown/text`;
    const url = new URL(pathname, base);
    const searchParams = url.searchParams;
    searchParams.set("path", path);
    const response = await fetch(url.toString(), { method: "GET" });
    const json = await response.json();
    return json;
  });
