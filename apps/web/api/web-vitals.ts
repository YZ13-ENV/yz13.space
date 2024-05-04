"use server";
import { isDev } from "@/const/app";
import { createClient } from "@/utils/supabase/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export type Vitals = {
  id: string;
  app_id: string;
  delta: number;
  name: string;
  navigation_type: string;
  rating: string;
  value: number;
  created_at: string;
};

const pushWebVitals = async (vitals: Vitals) => {
  const cookiesList = cookies();
  if (!isDev) await createClient(cookiesList).from("web-vitals").insert(vitals);
};

const getWebVitalsRecords = async (
  appId: string
): Promise<PostgrestResponse<Vitals>> => {
  const cookiesList = cookies();
  return await createClient(cookiesList)
    .from("web-vitals")
    .select()
    .eq("app_id", appId);
};

export { getWebVitalsRecords, pushWebVitals };
