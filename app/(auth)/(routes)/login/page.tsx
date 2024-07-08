import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import Image from "next/image"
import { Logged } from "./logged"
import { UnLogged } from "./unlogged"

type Props = {
  searchParams: {
    lang?: string
    continue?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const continueLink = searchParams.continue
  return (
    <div className="max-w-3xl w-full mx-auto h-screen">
      <div className="w-full absolute top-0 left-0 flex justify-center p-6">
        <Image
          src="/yz-light.png"
          width={36} height={36} alt="logo"
        />
      </div>
      <div className="flex relative flex-col items-center h-full justify-center w-full">
        {
          isLogged
            ? <Logged user={user} />
            : <UnLogged continue={continueLink} />
        }
      </div>
    </div>
  )
}
export default page