import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/client";
import { ThreadItem } from "./types";

const getLikesClient = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<{ likes: ThreadItem["likes"] } | null>> => {
  const supabase = createClient();
  return supabase
    .from("sub_threads")
    .select("likes")
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .single();
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
  return supabase
    .from("sub_threads")
    .select("views")
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .single();
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
  return supabase
    .from("sub_threads")
    .update({ views: result })
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .select()
    .single();
};

export { getLikesClient, getViewsClient, likeSubThread, viewSubThread };
