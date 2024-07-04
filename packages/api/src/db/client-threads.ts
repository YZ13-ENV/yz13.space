import {
  PostgrestSingleResponse,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/client";
import { SubThread } from "./types";

const getLikesClient = async (
  thread_id: number,
  sub_thread_id: number
): Promise<PostgrestSingleResponse<{ likes: SubThread["likes"] } | null>> => {
  const supabase = createClient();
  const result = await supabase
    .from("sub_threads")
    .select("likes")
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .single();
  return result;
};

const likeSubThread = async (
  thread_id: number,
  sub_thread_id: number,
  uid: string
): Promise<PostgrestSingleResponse<SubThread | null>> => {
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
): Promise<PostgrestSingleResponse<{ views: SubThread["views"] } | null>> => {
  const supabase = createClient();
  const result = await supabase
    .from("sub_threads")
    .select("views")
    .eq("thread_id", thread_id)
    .eq("sub_thread_id", sub_thread_id)
    .single();
  return result;
};

const viewSubThread = async (
  thread_id: number,
  sub_thread_id: number,
  uid: string
): Promise<PostgrestSingleResponse<SubThread | null>> => {
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

const onSubThreads = (
  channel: string,
  thread_id: number,
  onPayload: (payload: RealtimePostgresChangesPayload<SubThread>) => void
) => {
  const supabase = createClient();
  const channels = supabase
    .channel(channel)
    .on<SubThread>(
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

const onSubThread = (
  channel: string,
  thread_id: number,
  sub_thread_id: number,
  onPayload: (payload: RealtimePostgresChangesPayload<SubThread>) => void
) => {
  const supabase = createClient();
  const channels = supabase
    .channel(channel)
    .on<SubThread>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "sub_threads",
        filter: `thread_id=eq.${thread_id}`,
      },
      async (payload) => {
        const type = payload.eventType;
        const new_update = payload.new;
        if (!!new_update && type === "UPDATE") {
          const sub_thread = new_update as SubThread;
          if (sub_thread.sub_thread_id === sub_thread_id) {
            console.log(type);
            onPayload(payload);
          }
        }
      }
    )
    .subscribe();
};

export {
  getLikesClient,
  getViewsClient,
  likeSubThread,
  onSubThread,
  onSubThreads,
  viewSubThread,
};
