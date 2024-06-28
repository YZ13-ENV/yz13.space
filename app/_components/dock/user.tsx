import { createClient } from "@/packages/supabase/src/supabase/server"
import { cn } from "@/packages/ui/lib/utils"
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
  if (!user) return null
  return (
    <SimpleTooltip text={isLogged ? name : "Anon"} sideOffset={10}>
      <div className="w-9 aspect-square flex justify-center items-center">
        <div
          className={cn(
            "rounded-full border relative w-6 aspect-square bg-background flex justify-center items-center",
            "outline outline-1 outline-foreground"
          )}
        >
          {
            hasAvatar
              ? <Image src={avatar_url} className="rounded-full" fill alt="user-avatar" />
              : <BiUser size={16} />
          }
        </div>
      </div>
    </SimpleTooltip>
  )
}
export { User }
