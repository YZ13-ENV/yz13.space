"use server"

import { user } from "@/actions/user"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"

type UserAvatarProps = {
  uid: string
  size?: number
}

const UserAvatar = async ({ uid, size = 24 }: UserAvatarProps) => {
  const usr = await user(uid)
  const metadata = usr?.user_metadata
  const avatar_url = metadata?.avatar_url
  const name = metadata?.name ?? "username"
  const shortName = name.slice(0, 2)
  return (
    <Avatar style={{ width: size, height: size }} className="border rounded-full">
      <AvatarImage src={avatar_url} />
      <AvatarFallback className="uppercase">{shortName}</AvatarFallback>
    </Avatar>
  )
}
export { UserAvatar }
