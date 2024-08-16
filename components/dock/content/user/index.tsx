import { Locales, getI18n } from "@/locales/server"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { cookies } from "next/headers"
import Link from "next/link"
import { LuLogIn, LuUser, LuUserPlus } from "react-icons/lu"
import { createClient } from "yz13/supabase/server"
import { SignOut } from "./sign-out"

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
  const t = await getI18n()
  if (!user) {
    return (
      <div className="w-full h-full p-2 flex flex-col gap-3">
        <div className="flex items-center gap-2 h-10 justify-center">
          <span className="text-lg text-foreground font-medium">YZ13 ID</span>
        </div>
        <Separator />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-start gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-1/2" asChild>
                  <Link href="/signup">
                    <LuUserPlus size={16} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border">{t("id.sign-up.tooltip")}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-1/2" asChild>
                  <Link href="/login">
                    <LuLogIn size={16} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border">{t("id.login.tooltip")}</TooltipContent>
            </Tooltip>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-1/2" asChild>
                <Link href="https://id.yz13.space">
                  <LuUser size={16} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="border">{t("id.profile.tooltip")}</TooltipContent>
          </Tooltip>
          <SignOut tooltip={t("id.sign-out.tooltip")} />
        </div>
      </div>
    </div>
  )
}
export { User }
