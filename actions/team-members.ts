import { PostgrestResponse } from "@supabase/supabase-js";
import { unstable_cache as cache } from "next/cache";
import { Tables } from "yz13/supabase/database";

export type TeamMember = Tables<"team_members">;

const INTERNAL__members =
  async (): Promise<PostgrestResponse<TeamMember> | null> => {
    try {
      const response = await fetch(`https://www.api.yz13.space/team/members`, {
        method: "GET",
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const members = () => {
  const tag = "team-members";
  const getCached = cache(async () => INTERNAL__members(), [tag], {
    revalidate: 60 * 60,
    tags: [tag],
  });
  return getCached();
};
