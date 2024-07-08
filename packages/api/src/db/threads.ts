import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { FullThread, SubThread, Thread } from "./types";

const getThreads = async (): Promise<PostgrestSingleResponse<Thread[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const result = await supabase.from("threads").select();
  return result;
};

const getFullThreads = async (
  lang?: string
): Promise<PostgrestResponse<FullThread>> => {
  const url = "https://www.api.yz13.space";
  const path = "/threads";
  const fetchURL = new URL(path, url);
  if (lang) fetchURL.searchParams.set("lang", lang);
  try {
    const response = await fetch(fetchURL.toString(), { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else
      return {
        error: null,
        data: [],
        count: null,
        status: 200,
        statusText: "",
      };
  } catch (e) {
    console.log(e);
    return {
      error: null,
      data: [],
      count: null,
      status: 200,
      statusText: "",
    };
  }
};

const getFullThread = async (
  id: number
): Promise<PostgrestSingleResponse<FullThread | null>> => {
  const url = "https://www.api.yz13.space";
  const path = `/thread/${id}`;
  try {
    const response = await fetch(url + path, { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else
      return {
        error: null,
        data: null,
        count: null,
        status: 200,
        statusText: "",
      };
  } catch (e) {
    console.log(e);
    return {
      error: null,
      data: null,
      count: null,
      status: 200,
      statusText: "",
    };
  }
};

const getThread = async (
  thread_id: number
): Promise<PostgrestSingleResponse<Thread>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase.from("threads").select().eq("thread_id", thread_id).single();
};

const getSubThreads = async (
  thread_id: number
): Promise<PostgrestSingleResponse<SubThread[]>> => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  return supabase.from("sub_threads").select().eq("thread_id", thread_id);
};

const getSubThread = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<SubThread | null>> => {
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
): Promise<PostgrestSingleResponse<{ likes: SubThread["likes"] } | null>> => {
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
  const data = threads.data || [];
  return data.filter((thread) => thread.thread_id !== thread_id);
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
