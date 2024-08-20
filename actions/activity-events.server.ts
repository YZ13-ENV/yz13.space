"use server";
import { isDev } from "@/app/[locale]/(auth)/(routes)/login/get-url";
import { unstable_cache as cache } from "next/cache";
import { ActivityEventsProps, INTERNAL__events } from "./activity-events";

export const events = (props: ActivityEventsProps) => {
  const getCached = cache(
    async (props: ActivityEventsProps) => INTERNAL__events(props),
    ["events"],
    { tags: ["events"], revalidate: 60 * 60 * 6 }
  );
  if (isDev) return INTERNAL__events(props);
  return getCached(props);
};
