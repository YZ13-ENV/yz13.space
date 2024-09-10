import json from "@/package.json"
import { Popover, PopoverContent, PopoverTrigger } from "@yz13/mono/components/popover";
import { LogoHeader } from "../logo";
import { Button } from "@yz13/mono/components/button";
import { LanguagesIcon, PackageIcon, SearchIcon, SettingsIcon, UserIcon, WifiIcon } from "lucide-react";
import { UserDropdown } from "../user-dropdown";
import { authorizedUser } from "@/actions/user";
import { LanguageSwitcher } from "../language.switcher";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { cn } from "yz13/cn";
import Link from "next/link";

const Header = async () => {
  const user = await authorizedUser()
  const lang = getCurrentLocale()
  const t = await getI18n()
  return (
    <header className="w-full h-fit flex items-center p-2 justify-between">
      <Link href="/canvas/home" className="flex items-center gap-2">
        <LogoHeader className="size-6" />
        <span className="text-base font-pixel">YZ13</span>
      </Link>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-6 py-0 max-w-xs w-fit" variant="ghost" size="sm">
              <span className="text-xs line-clamp-1">1.0.0 - Redesign, again</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              "rounded-2xl bg-yz-neutral-300/50 backdrop-blur-sm p-2 border-yz-neutral-50 h-fit space-y-2",
              "max-h-[50dvh] overflow-y-auto"
            )}
          >
            <div className="rounded-xl w-full h-fit p-3 bg-yz-neutral-50 flex flex-col">
              <span className="text-lg font-medium">1.0.0 - Redesign, again</span>
              <span className="text-sm text-secondary">There is some of updates</span>
            </div>
          </PopoverContent>
        </Popover>
        <Button disabled className="size-6 p-0" variant="ghost" size="icon">
          <WifiIcon size={14} className="shrink-0" />
        </Button>
        <Button disabled className="size-6 p-0" variant="ghost" size="icon">
          <SearchIcon size={14} className="shrink-0" />
        </Button>
        {
          user
            ?
            <UserDropdown user={user} asChild>
              <Button className="size-6 p-0" variant="ghost" size="icon">
                <UserIcon size={14} className="shrink-0" />
              </Button>
            </UserDropdown>
            :
            <Button className="size-6 p-0" variant="ghost" size="icon">
              <UserIcon size={14} className="shrink-0" />
            </Button>
        }
        <Popover>
          <PopoverTrigger asChild>
            <Button className="size-6 p-0" variant="ghost" size="icon">
              <SettingsIcon size={14} className="shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 rounded-xl p-3 space-y-3">
            <div className="flex items-center gap-2">
              <LanguagesIcon size={16} />
              <span className="text-sm">{t("settings.language.title")}</span>
              <LanguageSwitcher lang={lang} className="ml-auto" />
            </div>
            <div className="flex items-center gap-2">
              <PackageIcon size={16} />
              <span className="text-sm">{t("settings.version.title")}</span>
              <span className="text-secondary ml-auto px-2 text-sm">{json.version}</span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>

  )
}
export { Header }
