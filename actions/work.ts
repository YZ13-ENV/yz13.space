import { Work } from "@/app/works/abc/abc-store";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

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
