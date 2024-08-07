import { getHOST, isDev } from "@/app/(auth)/(routes)/login/get-url";
import { Locales, getLocale } from "@/dictionaries/tools";
import { PostgrestResponse } from "@supabase/supabase-js";
import { RequestMethod, RequestType } from "yz13/log";
import { Tables } from "yz13/supabase/database";
import { z } from "zod";
import { actionClient } from "./safe-client";

const schema = z.string();
const type: RequestType = "Request";
const method: RequestMethod = "GET";

type Changelog = Tables<"changelog">;

const INTERNAL__changelog = async (
  lang?: Locales
): Promise<PostgrestResponse<Changelog>> => {
  const url = "https://www.api.yz13.space";
  const path = "/changelog";
  const fetchURL = new URL(path, url);
  if (lang) fetchURL.searchParams.set("lang", lang);
  try {
    const response = await fetch(fetchURL.toString(), { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else throw new Error("failed to fetch");
  } catch (e: any) {
    console.log(e);
    return {
      count: null,
      data: [],
      error: e?.message,
      status: 404,
      statusText: "",
    };
  }
};

export const changelog = actionClient
  .schema(schema)
  .use(async ({ next }) => {
    const locale = getLocale();
    return next({ ctx: { locale } });
  })
  .metadata({
    type,
    method,
  })
  .action(
    async ({ parsedInput: lang }) => {
      return INTERNAL__changelog(lang as Locales);
    },
    {
      onSuccess: (props) => {
        // console.log("success -->", props);
        const { data, hasNotFound, hasRedirected } = props;
        const metadata = props.metadata as any;
        const statusFromData = data?.status;
        const status = hasNotFound
          ? 404
          : hasRedirected
            ? 301
            : statusFromData
              ? statusFromData
              : 200;
        const type = metadata?.type as RequestType;
        const method = metadata?.method as RequestMethod;
        const host = getHOST();
        if (isDev) {
          return console.log("LOCAL_LOG", method, status, host, type, "?");
        } else {
          console.log("LOG", method, status, host, type, "");
        }
      },
    }
  );
