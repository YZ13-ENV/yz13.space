import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { ThreadItem, ThreadTree } from "./types";

const getThreads = async (): Promise<PostgrestSingleResponse<ThreadTree[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase.from("threads").select();
};

const getThread = async (
  thread_id: number
): Promise<PostgrestSingleResponse<ThreadTree>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase.from("threads").select().eq("thread_id", thread_id).single();
};

const getSubThread = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<ThreadItem | null>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase
    .from("sub_threads")
    .select()
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .single();
};

export { getSubThread, getThread, getThreads };
