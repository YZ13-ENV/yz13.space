import { authorizedUser } from "@/actions/user"
import { getI18n, Locales } from "@/locales/server"
import json from "@/package.json"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"
import { Button } from "@yz13/mono/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/mono/components/dropdown-menu"
import { Separator } from "@yz13/mono/components/separator"
import { Languages, Package, User, User2 } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"
import { LanguageSwitcher } from "./language.switcher"
import { SignOutButton } from "./sign-out"

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
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar
            style={{ width: size, height: size }}
            className="shrink-0 relative aspect-square flex justify-center items-center border-2 border-foreground"
          >
            <AvatarImage className="w-full h-full" src={avatar_url} />
            <AvatarFallback className="w-full h-full">
              <User2 size={20} />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-xl bg-yz-neutral-100"
          align="end"
          alignOffset={0}
          side="bottom"
          sideOffset={12}
        >
          <DropdownMenuItem className="gap-2" asChild>
            <Link href="https://id.yz13.space">
              <User size={16} />
              {t("id.profile.tooltip")}
            </Link>
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem className="gap-2">
            <Languages size={16} />
            {t("settings.language.title")}
            <LanguageSwitcher lang={lang} className="ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Package size={16} />
            {t("settings.version.title")}
            <span className="text-secondary ml-auto px-2 text-sm">{json.version}</span>
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem className="text-center gap-2" asChild>
            <SignOutButton>
              {t("id.sign-out.tooltip")}
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export { UserHeader }
