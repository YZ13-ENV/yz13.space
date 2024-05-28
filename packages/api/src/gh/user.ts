"use server";
import { kv } from "@vercel/kv";
import { expireTime } from "../const";
import { User } from "./types";

const getUser = async (): Promise<User | null> => {
  try {
    const key = `YZ13-ENV`;
    const cached = await kv.get<User | null>(key);
    if (cached) return cached;
    const url = "https://api.github.com/users/yz13-env";
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      if (json && !cached) kv.set(key, json, { nx: true, ex: expireTime });
      return json;
    }
    return null;
  } catch (e) {
    process.env.NODE_ENV === "development" && console.log(e);
    return null;
  }
};
export { getUser };
