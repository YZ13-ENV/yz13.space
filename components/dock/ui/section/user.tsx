import { Avatar, AvatarImage, AvatarFallback } from "@yz13/mono/components/avatar"
import { createClient } from "yz13/supabase/server"
import { cn } from "@/packages/ui/lib/utils"
import { cookies } from "next/headers"
import { BiUser } from "react-icons/bi"
type UserProps = {
  size?: number
}

const User = async ({ size = 36 }: UserProps) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const metadata = user?.user_metadata
  const name = metadata?.name
  const hasAvatar = !!metadata?.avatar_url
  const avatar_url = metadata?.avatar_url
  return (
    <Avatar style={{ width: size, height: size }} className="shrink-0 relative aspect-square flex justify-center items-center">
      <AvatarImage className="w-full h-full" src={avatar_url} />
      <AvatarFallback className="w-full h-full">
        <BiUser size={16} />
      </AvatarFallback>
    </Avatar>
  )
}
export { User }
