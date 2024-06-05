import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { expireTime } from "./const";

const getCache = <T>(
  key: string
): Promise<PostgrestSingleResponse<T> | null> => {
  return kv.get<PostgrestSingleResponse<T>>(key);
};
const setCache = <T>(key: string, value: T): Promise<T | "OK" | null> => {
  return kv.set<T>(key, value, { nx: true, ex: expireTime });
};
export { getCache, setCache };
