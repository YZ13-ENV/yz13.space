"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const getTech = async (id: string) => {
  const cookie = cookies();
  const client = createClient(cookie);
  const stack = client.from("stack");
  const selected = await stack.select().filter("id", "eq", id);
  return selected;
};
export { getTech };
