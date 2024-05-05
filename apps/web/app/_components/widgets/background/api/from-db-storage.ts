import { randomNumber } from "@/helpers/random-number";
import { createClient } from "@/utils/supabase/server";
import { get } from "@vercel/edge-config";
import { cookies } from "next/headers";

const fromStorage = async (): Promise<string> => {
  const cookiesList = cookies();
  const supabase = createClient(cookiesList);
  const background_mode = await get("background_mode");
  const isLocalMode = background_mode === "local";
  const folder = "background";
  const { data, error } = await supabase.storage.from("media").list(folder);
  const list = data || [];
  const random_index = Math.round(randomNumber(0, list.length - 2));
  const random_video = list[random_index]?.name;
  const path = [folder, random_video].join("/");
  const url = supabase.storage.from("media").getPublicUrl(path);
  const local_video = "/background/fallback-background.mp4";
  const background = isLocalMode ? local_video : url.data.publicUrl;
  return background;
};
export { fromStorage };
