"use client"
import { useCurrentLocale, useI18n } from "@/locales/client"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { BookUserIcon, FolderCodeIcon, HomeIcon, NotebookTabsIcon, SettingsIcon, SparklesIcon, StickerIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import json from "@/package.json"
import { cn } from "yz13/cn"

const NavList = () => {
  const pathname = usePathname()
  const lang = useCurrentLocale()
  const t = useI18n()
  return (
    <>
      <NavItem selected={pathname === "/home"} path="/home" label={t("nav.home")}><HomeIcon size={20} /></NavItem>
      <NavItem selected={pathname === "/works"} path="/works" label={t("nav.works")}><FolderCodeIcon size={20} /></NavItem>
      <NavItem selected={pathname === "/journal"} path="/journal" label={t("nav.journal")}><StickerIcon size={20} /></NavItem>
      <NavItem selected={pathname === "/inspiration"} path="/inspiration" label={t("nav.inspiration")}><SparklesIcon size={20} /></NavItem>
      <Separator />
      <NavItem selected={pathname === "/team"} path="/team" label={t("nav.team")}><BookUserIcon size={20} /></NavItem>
      <NavItem selected={pathname === "/changelog"} path="/changelog" label={t("nav.changelog")}><NotebookTabsIcon size={20} /></NavItem>
      <NavItem selected={pathname === "/settings"} path="/settings" label={t("nav.settings")}><SettingsIcon size={20} /></NavItem>
      <Separator />
      <div className="flex md:!flex-row flex-col md:!gap-0 gap-2">
        <span className="text-xs text-secondary md:!ml-2.5 ml-auto md:!mr-0 mr-auto">{json.version}</span>
        <span className="text-xs text-secondary md:!ml-2.5 ml-auto md:!mr-0 mr-auto uppercase">{lang}</span>
      </div>
    </>
  )
}


const NavItem = ({
  children,
  path,
  label,
  selected = false
}: {
  selected?: boolean,
  children?: React.ReactNode
  path: string,
  label: string
}) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            "md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal",
            selected ? "text-foreground" : "text-secondary hover:text-foreground"
          )}
          variant={selected ? "secondary" : "ghost"}
          asChild
        >
          <Link href={path}>
            {children}
            <span className="lg:!inline md:!inline hidden text-inherit">{label}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className="border lg:!hidden inline !z-10 bg-yz-neutral-50"
        side="right" sideOffset={12}
        align="start"
      >
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export { NavList }
