"use server";

import { createClient } from "@/utils/supabase/client";

const getTech = async (id: string) => {
  const client = createClient();
  const stack = client.from("stack");
  const selected = await stack.select().filter("id", "eq", id);
  return selected;
};
export { getTech };
