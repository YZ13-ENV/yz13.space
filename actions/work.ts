import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "yz13/supabase/database";

export type Work = Tables<"works">;

export const work = async (
  id: string | null
): Promise<PostgrestSingleResponse<Work> | null> => {
  try {
    const response = await fetch(`https://www.api.yz13.space/works/${id}`, {
      method: "GET",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
