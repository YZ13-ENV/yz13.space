import { getExperience } from "@/components/experience/api/experience.api";
import { Locales, getLocale } from "@/dictionaries/tools";
import { z } from "zod";
import { actionClient } from "./safe-client";

const schema = z.string();

export const experience = actionClient
  .schema(schema)
  .use(async ({ next }) => {
    const locale = getLocale();
    return next({ ctx: { locale } });
  })
  .metadata({})
  .action(
    async ({ parsedInput: lang }) => {
      return getExperience(lang as Locales);
    },
    {
      onSuccess: (props) => {
        // console.log("success -->", props);
        const { data, hasNotFound, hasRedirected } = props;
        console.log(data, hasNotFound, hasRedirected);
      },
    }
  );
