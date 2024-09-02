"use server";
import { actionClient } from "../safe-client";
import { schema } from "./schema";

export const getPublication = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const base = "https://cms.yz13.space";
    const path = `/api/publication/markdown/${id}`;
    const url = new URL(path, base);
    const response = await fetch(url.toString(), { method: "GET" });
    const json = await response.json();
    return json;
  });
