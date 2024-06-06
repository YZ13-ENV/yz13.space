"use server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { isDev } from "../const";
import { Vitals } from "./types";

const pushWebVitals = async (vitals: Vitals) => {
  const cookiesList = cookies();
  if (!isDev) {
    await createClient(cookiesList).from("web-vitals").insert(vitals);
    const key = `web-vitals-${vitals.app_id}`;
  }
};

const getWebVitals = async (
  appId: string
): Promise<PostgrestResponse<Vitals>> => {
  const cookiesList = cookies();
  const vitals = await createClient(cookiesList)
    .from("web-vitals")
    .select()
    .eq("app_id", appId)
    .gt("created_at", dayjs().subtract(7, "days").toISOString());
  return vitals;
};

export { getWebVitals, pushWebVitals };
