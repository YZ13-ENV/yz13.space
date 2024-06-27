import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const page = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const metadata = user?.user_metadata
  const type = metadata ? metadata?.type : "user"
  const isAdmin = type === "admin"
  if (isLogged) redirect("/home")
  if (!isLogged)
    return redirect("/threads")
}
export default page