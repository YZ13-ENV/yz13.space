"use server"
import { nav_links } from "@/app/_conts/nav-links"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { NavList } from "./nav-list"

type NavProps = {
  className?: string
  lang?: Locales
}

const Nav = async ({ className = "", lang: provided_lang }: NavProps) => {
  const locale = getLocale()
  const lang = provided_lang ? provided_lang : locale
  const navDict = await getDict("nav", lang) as { labels: { label: string, link: string }[] }
  const localTabs = nav_links.map(nav => {
    const target = navDict.labels.find(item => item.link === nav.link)
    if (target) {
      return {
        ...nav,
        link: nav.link + (provided_lang ? `?lang=${lang}` : ""),
        label: target.label
      }
    } else return { ...nav, link: nav.link + (provided_lang ? `?lang=${lang}` : "") }
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
