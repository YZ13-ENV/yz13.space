"use server";

import { createClient } from "@/packages/supabase/src/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Database } from "@yz13/supabase/database";
import { cookies } from "next/headers";

export type SubThread = Database["public"]["Tables"]["sub_threads"]["Row"];

export const publishThread = async (
  sub_thread: Partial<SubThread>,
  thread_id?: number
): Promise<PostgrestSingleResponse<SubThread | null>> => {
  const publishIntoExistedThread = !!thread_id;
  const cks = cookies();
  const sp = createClient(cks);
  const lang = sub_thread.lang || [];
  if (publishIntoExistedThread) {
    const sub_thread_with_new_id: Partial<SubThread> = {
      ...sub_thread,
      thread_id: thread_id,
    };
    const result = await sp
      .from("sub_threads")
      .insert(sub_thread_with_new_id)
      .limit(1)
      .single();
    return result;
  } else {
    const newThread = await sp
      .from("threads")
      .insert({ lang: lang })
      .select()
      .limit(1)
      .single();
    const thread = newThread.data;
    if (thread) {
      const new_thread_id = thread.thread_id;
      const sub_thread_with_new_id: Partial<SubThread> = {
        ...sub_thread,
        thread_id: new_thread_id,
      };
      const result = await sp
        .from("sub_threads")
        .insert(sub_thread_with_new_id)
        .limit(1)
        .single();
      return result;
    } else
      return {
        error: null,
        count: null,
        status: 200,
        data: null,
        statusText: "",
      };
  }
};
