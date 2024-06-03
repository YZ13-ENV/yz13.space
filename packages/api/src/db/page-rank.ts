import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { createClient } from "@yz13/supabase/client";

type PageRankRecord = {
  id: number;
  path: string;
  uid: string;
  liked?: boolean;
  disliked?: boolean;
  created_at: string;
};
type PageRankVote = Omit<PageRankRecord, "id" | "created_at">;

const makeVote = async (
  vote: PageRankVote
): Promise<PostgrestSingleResponse<PageRankRecord | null>> => {
  const supabase = createClient();
  const uid = vote.uid;
  const page = vote.path;
  const voteOnPage = await getUserVote(uid, page);
  const vote_data = voteOnPage.data ? voteOnPage.data[0] : null;
  if (vote_data) {
    return supabase
      .from("page_rank")
      .update({ liked: vote.liked, disliked: vote.disliked })
      .eq("id", vote_data.id)
      .select()
      .single();
  } else {
    return supabase.from("page_rank").insert(vote).select().single();
  }
};
const getUserVote = async (
  uid: string,
  page: string
): Promise<PostgrestSingleResponse<PageRankRecord[]>> => {
  const supabase = createClient();
  return supabase.from("page_rank").select().eq("path", page).eq("uid", uid);
};
const getPageRank = async (
  page: string
): Promise<PostgrestSingleResponse<PageRankRecord[]>> => {
  const supabase = createClient();
  return supabase.from("page_rank").select().eq("path", page);
};

export { getPageRank, getUserVote, makeVote };
export type { PageRankRecord, PageRankVote };
