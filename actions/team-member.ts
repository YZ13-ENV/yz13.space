import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_cache as cache } from "next/cache";
import { TeamMember } from "./team-members";

const INTERNAL__member = async (
  uid: string
): Promise<PostgrestSingleResponse<TeamMember> | null> => {
  try {
    const response = await fetch(
      `https://www.api.yz13.space/team/member/${uid}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const member = (uid: string) => {
  const getCached = cache(async (uid) => INTERNAL__member(uid), [uid], {
    revalidate: 60 * 60,
    tags: [uid],
  });
  return getCached(uid);
};
