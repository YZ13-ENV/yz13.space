import { nav_links } from "@/const/nav-links"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@yz13/mono/components/command"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import { cookies } from "next/headers"
import Link from "next/link"
import { cn } from "yz13/cn"
import { createClient } from "yz13/supabase/server"
import { TimeAndDate } from "./time-and-date"

const Menu = async ({ className = "", lang: provided_lang }: { className?: string, lang?: Locales }) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const locale = getLocale()
  const lang = provided_lang ? provided_lang : locale
  const navDict = await getDict("nav", lang) as { group: { [key: string]: string }, labels: { label: string, link: string }[] }
  const local_nav_links = nav_links.map(nav => {
    const target = navDict.labels.find(item => item.link === nav.link)
    if (target) {
      return {
        ...nav,
        link: nav.link,
        label: target.label
      }
    } else return { ...nav, link: nav.link }
  })
  const dockDict = await getDict<any>("dock", lang)
  const menu = dockDict.menu
  const menuNavName = menu.nav
  const menuSearch = menu.search
  return (
    <Command className={cn("w-full", className)}>
      <CommandInput placeholder={menuSearch} />
      <TimeAndDate lang={lang} />
      <CommandList className="overflow-hidden">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="uppercase text-secondary" heading={menuNavName}>
          {
            local_nav_links.map(nav =>
              <CommandItem
                key={`command-${nav.link}`}
                className="gap-2 cursor-pointer capitalize transition-colors rounded-lg text-foreground/60 hover:text-foreground"
                asChild
              >
                <Link href={nav.link}>
                  {nav.icon && nav.icon({ size: 16, className: "text-inherit" })}
                  <span className="text-inherit">{nav.label}</span>
                </Link>
              </CommandItem>
            )
          }
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
export { Menu }
