import { Locales } from "@/dictionaries/tools"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import { cookies } from "next/headers"
import { LuLogIn, LuLogOut, LuUser, LuUserPlus } from "react-icons/lu"
import { createClient } from "yz13/supabase/server"

type UserProps = {
  lang?: Locales
}
const User = async ({ lang = "en" }: UserProps) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const metadata = user?.user_metadata
  const avatar = metadata?.avatar_url
  const name: string = metadata?.name ?? "Username"
  const email = user?.email
  if (user) {
    return (
      <div className="w-full h-full p-2 flex flex-col gap-3">
        <div className="flex items-center gap-2 h-10 justify-center">
          <span className="text-lg text-foreground font-medium">YZ13 ID</span>
        </div>
        <Separator />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-start gap-2">
            <Button variant="outline" className="w-1/2">
              <LuUserPlus size={16} />
            </Button>
            <Button variant="outline" className="w-1/2">
              <LuLogIn size={16} />
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full h-full p-2 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Avatar className="size-10 rounded-full border-2 border-foreground">
          <AvatarImage src={avatar} />
          <AvatarFallback className="uppercase">{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-base font-medium text-foreground">{name}</span>
          <span className="text-xs">{email}</span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-start gap-2">
          <Button variant="outline" className="w-1/2">
            <LuUser size={16} />
          </Button>
          <Button variant="outline" className="w-1/2">
            <LuLogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
export { User }
