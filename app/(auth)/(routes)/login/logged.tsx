"use client"
import { User } from "@supabase/supabase-js"
import { Button } from "@yz13/mono/components/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "yz13/supabase/client"

type Props = {
  user: User
}
const Logged = ({ user }: Props) => {
  const metadata = user?.user_metadata
  const avatar_url = metadata?.avatar_url
  const name = metadata?.name
  const router = useRouter()
  const signOut = () => {
    const sp = createClient()
    sp.auth.signOut()
    router.refresh()
  }
  return (
    <>
      <div className="flex flex-col w-full max-w-sm gap-3 justify-center items-center px-6 py-12 mx-auto">
        <Image src={avatar_url} className="rounded-full" width={64} height={64} alt="avatar" />
        <span className="text-center font-medium text-lg">{name}</span>
        <Button onClick={signOut}>Not me</Button>
      </div>
    </>
  )
}
export { Logged }
