import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const user = async (uid: string): Promise<User | null> => {
  try {
    const base = "https://api.yz13.space";
    const path = `/user/${uid}`;
    const url = new URL(path, base);
    const response = await fetch(url.toString(), { method: "GET" });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const authorizedUser = async (): Promise<User | null> => {
  const cks = cookies();
  const sp = createClient(cks);
  const {
    data: { user },
  } = await sp.auth.getUser();
  return user;
};
