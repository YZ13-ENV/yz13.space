"use server";
import cache from "@/cache.json";
import { isDev } from "@/const/app";
import { createClient } from "@/utils/supabase/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import dayjs from "dayjs";
import { cookies } from "next/headers";

const EXPIRE_TIME = cache.DEFAULT_EXPIRE_TIMESTAMP;

export type Vitals = {
  id: string;
  app_id: string;
  delta: number;
  name: string;
  navigation_type: string;
  rating: string;
  value: number;
  created_at: string;
  path: string;
};

const pushWebVitals = async (vitals: Vitals) => {
  const cookiesList = cookies();
  if (!isDev) {
    await createClient(cookiesList).from("web-vitals").insert(vitals);
    const key = `web-vitals-${vitals.app_id}`;
    await kv.del(key);
  }
};

const getWebVitalsRecords = async (
  appId: string,
  noCache?: boolean
): Promise<PostgrestResponse<Vitals>> => {
  const disabledCache = noCache === true ? noCache : false;
  const cookiesList = cookies();
  const key = `web-vitals-${appId}`;
  const cached = await kv.get<PostgrestResponse<Vitals>>(key);
  if (cached && !disabledCache) return cached;
  const vitals = await createClient(cookiesList)
    .from("web-vitals")
    .select()
    .eq("app_id", appId)
    .gt("created_at", dayjs().subtract(7, "days").toISOString());
  if (vitals && !disabledCache && !cached)
    kv.set(key, vitals, { nx: true, ex: EXPIRE_TIME });
  return vitals;
};

export { getWebVitalsRecords, pushWebVitals };
