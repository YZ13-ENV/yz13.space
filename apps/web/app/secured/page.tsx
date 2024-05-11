"use server"
import { getLastSession } from "@/api/session";
import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";

const page = async () => {
  await getLastSession()
  const session = await kv.get<string>("YZ13-ID-SSN");
  const haveSession = !!session
  if (!haveSession) return redirect("/")
  return (
    <div className="w-full h-screen p-12">
      secured, {String(session)}
    </div>
  )
}
export default page