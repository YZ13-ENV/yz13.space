import { Logo } from "@/app/_components/logo"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { Separator } from "@/packages/ui/src/components/separator"
import { cookies } from "next/headers"
import Image from "next/image"
import { GithubButton } from "./github-button"

const page = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const LoggedUser = () => {
    const metadata = user?.user_metadata
    const avatar_url = metadata?.avatar_url
    const name = metadata?.name
    return (
      <div className="flex flex-col w-full max-w-sm gap-3 justify-center items-center px-6 py-12 mx-auto">
        <Image src={avatar_url} className="rounded-full" width={42} height={42} alt="avatar" />
        <span className="text-center font-medium">{name}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Logo size={96} />
      <h1 className="text-4xl font-bold">Login in to YZ13</h1>
      {
        isLogged
          ? <LoggedUser />
          :
          <div className="flex flex-col w-full max-w-sm gap-3 px-6 py-12 mx-auto">
            <GithubButton />
            <Separator />
            <button
              className="flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl"
            >
              Sign in with Email
            </button>
          </div>
      }
    </div>
  )
}
export default page