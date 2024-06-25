import { User } from "@supabase/supabase-js"
import Image from "next/image"
import { BiUser } from "react-icons/bi"

type Props = {
  user: User
}
const UserProfile = ({ user }: Props) => {
  const metadata = user.user_metadata
  const hasAvatar = !!metadata.avatar_url
  const avatar_url = metadata.avatar_url
  return (
    <div className="relative flex items-center justify-center rounded-full w-9 aspect-square">
      {
        hasAvatar
          ? <Image src={avatar_url} className="rounded-full" fill alt="user-avatar" />
          : <BiUser size={16} />
      }
    </div>
  )
}
export { UserProfile }
