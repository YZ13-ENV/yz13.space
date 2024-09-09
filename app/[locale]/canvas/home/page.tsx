import { Popover, PopoverContent, PopoverTrigger } from "@yz13/mono/components/popover"
import json from "@/package.json"
import { Skeleton } from "@yz13/mono/components/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import { DotIcon, FolderIcon, LanguagesIcon, Package, PackageIcon, SearchIcon, SettingsIcon, UserIcon, WifiIcon } from "lucide-react";
import { Button } from "@yz13/mono/components/button";
import { TeamInfo } from "@/app/[locale]/home/team-info/team-info";
import { UserActivity } from "@/app/[locale]/home/activity/activity-widget";
import { LogoHeader } from "@/components/header/logo";
import { Separator } from "@yz13/mono/components/separator";
import { JournalLastFive } from "@/app/[locale]/journal/journal-last-five";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { LanguageSwitcher } from "@/components/header/language.switcher";
import { UserDropdown } from "@/components/header/user-dropdown";
import { authorizedUser } from "@/actions/user";
import { cn } from "yz13/cn";

export const metadata: Metadata = {
  title: "YZ13 - developer that you looking for",
};

const page = async () => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  const user = await authorizedUser()
  return (
    <div className="max-w-4xl w-full mx-auto space-y-0">
      <div className="w-full h-fit flex items-center p-2 justify-between">
        <div className="flex items-center gap-2">
          <LogoHeader className="size-6" />
          <span className="text-base font-pixel">YZ13</span>
        </div>
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
          <Button className="size-6 p-0" variant="ghost" size="icon">
            <WifiIcon size={14} className="shrink-0" />
          </Button>
          <Button className="size-6 p-0" variant="ghost" size="icon">
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
      </div>
      <div className="w-full grid lg:!grid-cols-4 grid-cols-1 auto-rows-auto gap-2 px-2 bg-yz">
        <div className="col-span-2 row-span-2 w-full flex h-full flex-col gap-2">
          <div className="w-full flex gap-4 shrink-0 flex-row p-4 rounded-2xl border h-36 bg-yz-neutral-50">
            <div className="w-fit shrink-0 flex h-full flex-col">
              <span>Works</span>
              <span className="text-2xl font-medium">24</span>
            </div>
            <div className="w-full h-full">
              <ul className="divide-y h-full">
                <li className="h-1/3">
                  <div className="w-full flex items-center h-full gap-2">
                    <FolderIcon size={16} />
                    <span className="text-sm text-foreground">repo/user</span>
                    <span className="text-sm text-secondary">last commmit</span>
                  </div>
                </li>
                <li className="h-1/3">
                  <div className="w-full flex items-center h-full gap-2">
                    <FolderIcon size={16} />
                    <span className="text-sm text-foreground">repo/user</span>
                    <span className="text-sm text-secondary">last commmit</span>
                  </div>
                </li>
                <li className="h-1/3">
                  <div className="w-full flex items-center h-full gap-2">
                    <FolderIcon size={16} />
                    <span className="text-sm text-foreground">repo/user</span>
                    <span className="text-sm text-secondary">last commmit</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex gap-4 flex-col p-4 col-span-2 rounded-2xl border h-full bg-yz-neutral-50">
            <Suspense fallback={
              <ul className="h-fit w-full space-y-3">
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
              </ul>
            }>
              <JournalLastFive lang={lang} />
            </Suspense>
          </div>
        </div>
        <div className="w-full h-fit p-4 col-span-2 flex flex-col gap-2 row-span-2 rounded-2xl border bg-yz-neutral-50">
          <Suspense fallback={<Skeleton className="rounded-xl w-full h-40" />}>
            <TeamInfo />
          </Suspense>
          <Separator />
          <Suspense fallback={<Skeleton className="rounded-xl w-full h-36" />}>
            <UserActivity uid="d5f98156-1776-42da-8f20-686d6a1ae2a8" lang={lang} />
          </Suspense>
        </div>
      </div>
      <footer className="w-full p-2 flex items-center justify-between">
        <span className="text-xs text-secondary">YZ13 - 2024</span>
        <span className="text-xs text-secondary">{json.version}</span>
      </footer>
    </div>
  );
};
export default page;
