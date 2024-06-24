import { Button } from "@/packages/ui/src/components/button"
import { User } from "@supabase/supabase-js"
import Image from "next/image"

type Props = {
  user: User
}
const Logged = ({ user }: Props) => {
  const metadata = user?.user_metadata
  const avatar_url = metadata?.avatar_url
  const name = metadata?.name
  return (
    <>
      <div className="flex flex-col w-full max-w-sm gap-3 justify-center items-center px-6 py-12 mx-auto">
        <Image src={avatar_url} className="rounded-full" width={64} height={64} alt="avatar" />
        <span className="text-center font-medium text-lg">{name}</span>
        <Button>Is not me</Button>
      </div>
    </>
  )
}
export { Logged }
