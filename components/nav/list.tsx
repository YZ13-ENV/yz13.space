"use client"
import { useI18n } from "@/locales/client"
import { Button } from "@yz13/mono/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { FolderCodeIcon, HomeIcon, StickerIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavList = () => {
  const pathname = usePathname()
  const t = useI18n()
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal"
            variant={pathname === "/home" ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/home">
              <HomeIcon size={20} />
              <span className="lg:!inline md:!inline hidden">{t("nav.home")}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="border lg:!hidden inline"
          side="right" sideOffset={12}
          align="start"
        >
          {t("nav.home")}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal"
            variant={pathname === "/works" ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/works">
              <FolderCodeIcon size={20} />
              <span className="lg:!inline md:!inline hidden">{t("nav.works")}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="border lg:!hidden inline"
          side="right" sideOffset={12}
          align="start"
        >
          {t("nav.works")}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal"
            variant={pathname === "/journal" ? "secondary" : "ghost"}
            asChild
          >
            <Link href="/journal">
              <StickerIcon size={20} />
              <span className="lg:!inline md:!inline hidden">{t("nav.journal")}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="border lg:!hidden inline"
          side="right" sideOffset={12}
          align="start"
        >
          {t("nav.journal")}
        </TooltipContent>
      </Tooltip>
    </>
  )
}
export { NavList }
