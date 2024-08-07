import { getHOST, isDev } from "@/app/(auth)/(routes)/login/get-url";
import { getExperience } from "@/components/experience/api/experience.api";
import { Locales, getLocale } from "@/dictionaries/tools";
import dayjs from "dayjs";
import { RequestMethod, RequestType } from "yz13/log";
import { z } from "zod";
import { actionClient } from "./safe-client";

const schema = z.string();
const type: RequestType = "Request";
const method: RequestMethod = "GET";

export const experience = actionClient
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
      return getExperience(lang as Locales);
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
          const date = dayjs();
          console.log("LOG", method, status, host, type, "?");
        }
      },
    }
  );
