import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { isDev } from "../const";
import { FullThread, ThreadItem, ThreadTree } from "./types";

const getThreads = async (): Promise<PostgrestSingleResponse<ThreadTree[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const result = await supabase.from("threads").select();
  return result;
};

const getFullThreads = async (): Promise<FullThread[]> => {
  const url = isDev ? "http://localhost:3000" : "https://www.yz13.space";
  const path = "/api/threads";
  try {
    const response = await fetch(url + path, { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getFullThread = async (id: number): Promise<FullThread | null> => {
  const url = isDev ? "http://localhost:3000" : "https://www.yz13.space";
  const path = `/api/thread/${id}`;
  try {
    const response = await fetch(url + path, { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getThread = async (
  thread_id: number
): Promise<PostgrestSingleResponse<ThreadTree>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const result = await supabase
    .from("threads")
    .select()
    .eq("thread_id", thread_id)
    .single();
  return result;
};

const getSubThreads = async (
  thread_id: number
): Promise<PostgrestSingleResponse<ThreadItem[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const result = await supabase
    .from("sub_threads")
    .select()
    .eq("thread_id", thread_id);
  return result;
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

const otherThreads = async (thread_id: number): Promise<FullThread[]> => {
  const threads = await getFullThreads();
  return threads.filter((thread) => thread.thread_id !== thread_id);
};

export {
  getFullThread,
  getFullThreads,
  getLikes,
  getSubThread,
  getSubThreads,
  getThread,
  getThreads,
  otherThreads,
};
