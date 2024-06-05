import {
  PostgrestSingleResponse,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { kv } from "@vercel/kv";
import { createClient } from "@yz13/supabase/client";
import { getCache, setCache } from "../cache";
import { ThreadItem } from "./types";

const getLikesClient = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<{ likes: ThreadItem["likes"] } | null>> => {
  const supabase = createClient();
  const key = `thread#${thread_id}/${sub_thread_id}/likes`;
  const cached = await getCache<{ likes: ThreadItem["likes"] } | null>(key);
  if (cached) {
    return cached;
  } else {
    const result = await supabase
      .from("sub_threads")
      .select("likes")
      .eq("thread_id", thread_id)
      .eq("sub_thread_id", sub_thread_id)
      .single();
    setCache(key, result);
    return result;
  }
};

const likeSubThread = async (
  thread_id: number,
  sub_thread_id: number,
  uid: string
): Promise<PostgrestSingleResponse<ThreadItem | null>> => {
  const supabase = createClient();
  const likes_res = await getLikesClient(thread_id, sub_thread_id);
  const likes = likes_res.data ? likes_res.data?.likes : [];
  const isLiked = likes.includes(uid);
  const result = isLiked
    ? likes.filter((like_uid) => like_uid !== uid)
    : [...likes, uid];
  kv.del(`thread#${thread_id}/${sub_thread_id}/likes`);
  return supabase
    .from("sub_threads")
    .update({ likes: result })
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .select()
    .single();
};

const getViewsClient = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<{ views: ThreadItem["views"] } | null>> => {
  const supabase = createClient();
  const key = `thread#${thread_id}/${sub_thread_id}/views`;
  const cached = await getCache<{ views: ThreadItem["views"] } | null>(key);
  if (cached) {
    return cached;
  } else {
    const result = await supabase
      .from("sub_threads")
      .select("views")
      .eq("thread_id", thread_id)
      .eq("sub_thread_id", sub_thread_id)
      .single();
    setCache(key, result);
    return result;
  }
};

const viewSubThread = async (
  thread_id: number,
  sub_thread_id: number,
  uid: string
): Promise<PostgrestSingleResponse<ThreadItem | null>> => {
  const supabase = createClient();
  const views_res = await getViewsClient(thread_id, sub_thread_id);
  const views = views_res.data ? views_res.data?.views : [];
  const isViewed = views.includes(uid);
  const result = isViewed
    ? views.filter((view_uid) => view_uid !== uid)
    : [...views, uid];
  kv.del(`thread#${thread_id}/${sub_thread_id}/views`);
  return supabase
    .from("sub_threads")
    .update({ views: result })
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .select()
    .single();
};

const onSubThreads = (
  channel: string,
  thread_id: number,
  onPayload: (payload: RealtimePostgresChangesPayload<ThreadItem>) => void
) => {
  const supabase = createClient();
  const channels = supabase
    .channel(channel)
    .on<ThreadItem>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "sub_threads",
        filter: `thread_id=eq.${thread_id}`,
      },
      (payload) => {
        onPayload(payload);
      }
    )
    .subscribe();
};

export {
  getLikesClient,
  getViewsClient,
  likeSubThread,
  onSubThreads,
  viewSubThread,
};
