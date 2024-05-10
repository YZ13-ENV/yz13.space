"use server";
import { getLastSession } from "@/api/session";
import { kv } from "@vercel/kv";

export const page = async () => {
  const session = getLastSession();
  const session2 = await kv.get<string>("YZ13-ID-SSN");
  return (
    <div className="w-full h-screen p-12">
      secured, {String(session)}, {String(session2)}
    </div>
  );
};
