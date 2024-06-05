import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { getCache, setCache } from "../cache";
import { ThreadItem, ThreadTree } from "./types";

const getThreads = async (): Promise<PostgrestSingleResponse<ThreadTree[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const key = "threads";
  const cached = await getCache<ThreadTree[]>(key);
  if (cached) {
    return cached;
  } else {
    const result = await supabase.from("threads").select();
    setCache(key, result);
    return result;
  }
};

const getThread = async (
  thread_id: number
): Promise<PostgrestSingleResponse<ThreadTree>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const key = `thread#${thread_id}`;
  const cached = await getCache<ThreadTree>(key);
  if (cached) {
    return cached;
  } else {
    const result = await supabase
      .from("threads")
      .select()
      .eq("thread_id", thread_id)
      .single();
    setCache(key, result);
    return result;
  }
};

const getSubThreads = async (
  thread_id: number
): Promise<PostgrestSingleResponse<ThreadItem[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const key = `thread#${thread_id}/sub_threads`;
  const cached = await getCache<ThreadItem[]>(key);
  if (cached) {
    return cached;
  } else {
    const result = await supabase
      .from("sub_threads")
      .select()
      .eq("thread_id", thread_id);
    setCache(key, result);
    return result;
  }
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

const getLikes = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<{ likes: ThreadItem["likes"] } | null>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase
    .from("sub_threads")
    .select("likes")
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .single();
};

const otherThreads = async (
  thread_id: number
): Promise<PostgrestSingleResponse<ThreadTree[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase.from("threads").select().neq("thread_id", thread_id).limit(5);
};

export {
  getLikes,
  getSubThread,
  getSubThreads,
  getThread,
  getThreads,
  otherThreads,
};
