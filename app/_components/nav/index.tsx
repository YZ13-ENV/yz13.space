"use server"
import { nav_links } from "@/app/_conts/nav-links"
import { Locales, getDict } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { cookies } from "next/headers"
import { NavList } from "./nav-list"

type NavProps = {
  className?: string
}

const Nav = async ({ className = "" }: NavProps) => {
  const cks = cookies()
  const locale = (cks.get("locale")?.value || "").slice(0, 2) as Locales
  const navDict = await getDict("nav", locale) as { labels: { label: string, link: string }[] }
  const localTabs = nav_links.map(nav => {
    const target = navDict.labels.find(item => item.link === nav.link)
    if (target) {
      return {
        ...nav,
        label: target.label
      }
    } else return nav
  })
    .map(nav => ({ ...nav, icon: nav.icon && nav.icon({ size: 14 }) }))
  return (
    <nav className={cn(
      "w-full flex flex-wrap gap-2 items-start",
      className
    )}>
      <NavList list={localTabs} />
    </nav>
  )
}
export { Nav }
