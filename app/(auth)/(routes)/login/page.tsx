import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import { Logged } from "./logged"
import { UnLogged } from "./unlogged"

const page = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {
        isLogged
          ? <Logged user={user} />
          : <UnLogged />
      }
    </div>
  )
}
export default page