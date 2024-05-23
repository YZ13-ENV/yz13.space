"use server";
import { ListBlobResult, ListBlobResultBlob, list } from "@vercel/blob";
import { get } from "@vercel/edge-config";
import { randomNumber } from "@yz13/api/helpers/random-number";

const fromBlob = async () => {
  const background_mode = await get<string>("background_mode");
  const isLocalMode = background_mode === "local";
  const blobs: ListBlobResult = isLocalMode
    ? { blobs: [], hasMore: false }
    : await list({ prefix: "backgrounds" });
  const videos: ListBlobResultBlob[] = blobs.blobs;
  const random_index = Math.round(randomNumber(0, videos.length - 2));
  const random_video = videos[random_index];
  const local_video = "/background/fallback-background.mp4";
  const background = isLocalMode ? local_video : random_video?.downloadUrl;
  return background || local_video;
};
export { fromBlob };
