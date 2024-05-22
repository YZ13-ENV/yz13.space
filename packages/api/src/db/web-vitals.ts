import { PostgrestResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { createClient } from "@yz13/supabase/server";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { expireTime, isDev } from "../const";
import { Vitals } from "./types";

const pushWebVitals = async (vitals: Vitals) => {
  const cookiesList = cookies();
  if (!isDev) {
    await createClient(cookiesList).from("web-vitals").insert(vitals);
    const key = `web-vitals-${vitals.app_id}`;
    await kv.del(key);
  }
};

const getWebVitals = async (
  appId: string
): Promise<PostgrestResponse<Vitals>> => {
  const cookiesList = cookies();
  const key = `web-vitals-${appId}`;
  const cached = await kv.get<PostgrestResponse<Vitals>>(key);
  if (cached) return cached;
  const vitals = await createClient(cookiesList)
    .from("web-vitals")
    .select()
    .eq("app_id", appId)
    .gt("created_at", dayjs().subtract(7, "days").toISOString());
  if (vitals && !cached) kv.set(key, vitals, { nx: true, ex: expireTime });
  return vitals;
};

export { getWebVitals, pushWebVitals };
