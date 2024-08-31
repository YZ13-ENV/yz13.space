import { authorizedUser } from "@/actions/user"
import { getI18n, Locales } from "@/locales/server"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"
import { Button } from "@yz13/mono/components/button"
import { User2 } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"
import { UserDropdown } from "./user-dropdown"

type Props = {
  size?: number
  className?: string
  lang?: Locales
}
const UserHeader = async ({ lang = "en", size = 24, className = "" }: Props) => {
  const user = await authorizedUser()
  const metadata = user?.user_metadata
  const avatar_url = metadata?.avatar_url
  const t = await getI18n()
  if (!user) return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="outline" asChild>
        <Link href="/login">{t("id.login.tooltip")}</Link>
      </Button>
      {/* <Button variant="default" asChild>
        <Link href="/signup">{t("id.sign-up.tooltip")}</Link>
      </Button> */}
    </div>
  )
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <UserDropdown user={user} lang={lang}>
        <Avatar
          style={{ width: size, height: size }}
          className="shrink-0 relative aspect-square flex justify-center items-center border-2 border-foreground"
        >
          <AvatarImage className="w-full h-full" src={avatar_url} />
          <AvatarFallback className="w-full h-full">
            <User2 size={20} />
          </AvatarFallback>
        </Avatar>
      </UserDropdown>
    </div>
  )
}
export { UserHeader }
