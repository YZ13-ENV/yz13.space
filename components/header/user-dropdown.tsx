import { getI18n, Locales } from "@/locales/server"
import json from "@/package.json"
import type { User as UserType } from "@supabase/supabase-js"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@yz13/mono/components/dropdown-menu"
import { Languages, Package, User } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"
import { LanguageSwitcher } from "./language.switcher"
import { SignOutButton } from "./sign-out"

type DropdownProps = {
  lang?: Locales
  user: UserType
  children?: React.ReactNode
  className?: string
}
const UserDropdown = async ({ className = "", children, user, lang = "en" }: DropdownProps) => {
  const t = await getI18n()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("rounded-full", className)}>
        {children}
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
        <DropdownMenuSeparator className="my-1" />
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
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem className="text-center gap-2" asChild>
          <SignOutButton>
            {t("id.sign-out.tooltip")}
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export { UserDropdown }
