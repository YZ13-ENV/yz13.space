import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import Image from "next/image"
import { BiUser } from "react-icons/bi"
import { SimpleTooltip } from "../simple-tooltip"

const User = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const metadata = user?.user_metadata
  const name = metadata?.name
  const hasAvatar = !!metadata?.avatar_url
  const avatar_url = metadata?.avatar_url
  return (
    <SimpleTooltip text={isLogged ? name : "Anon"} sideOffset={10}>
      <div
        className="rounded-full border relative w-9 aspect-square bg-background flex justify-center items-center"
      >
        {
          hasAvatar
            ? <Image src={avatar_url} className="rounded-full" fill alt="user-avatar" />
            : <BiUser size={16} />
        }
      </div>
    </SimpleTooltip>
  )
}
export { User }
