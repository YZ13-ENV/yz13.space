import { Event } from "@/app/_components/entities/events/store/events-store";
import cache from "@/cache.json";
import { get } from "@vercel/edge-config";
import { kv } from "@vercel/kv";
const EXPIRE_TIME = cache.DEFAULT_EXPIRE_TIMESTAMP;

export const getEvents = async () => {
  const key = "events-all";
  const cached = await kv.get<Event[]>(key);
  if (cached) return cached;
  const events = await get<Event[]>("events");
  if (events && !cached) kv.set(key, events, { nx: true, ex: EXPIRE_TIME });
  return events as Event[];
};
