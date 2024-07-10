import { nav_links } from "@/app/_conts/nav-links"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@repo/ui/command"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import { cookies } from "next/headers"
import Link from "next/link"
import { LuLogIn, LuUserPlus } from "react-icons/lu"
import { SignOut } from "./signout"
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
        link: nav.link + (provided_lang ? `?lang=${provided_lang}` : ""),
        label: target.label
      }
    } else return { ...nav, link: nav.link + (provided_lang ? `?lang=${provided_lang}` : "") }
  })
  const dockDict = await getDict<any>("dock", lang)
  const menu = dockDict.menu
  const menuName = menu.name
  const menuNavName = menu.nav
  const menuProfileName = menu.profile
  const menuSearch = menu.search
  const auth_button = await getDict<{ signout: string, profile: string, login: string, signup: string }>("auth-buttons", lang)
  return (
    <div
      className="rounded-xl p-0 border-yz-neutral-300 bg-background !border shadow-sm"
    >
      <Command className="">
        <CommandInput disabled placeholder={menuSearch} />
        <TimeAndDate lang={lang} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={menuNavName}>
            {
              local_nav_links.map(nav =>
                <CommandItem
                  key={`command-${nav.link}`}
                  className="gap-2 cursor-pointer hover:bg-yz-neutral-100 rounded-lg"
                  asChild
                >
                  <Link href={nav.link}>
                    {nav.icon && nav.icon({ size: 16 })}
                    <span>{nav.label}</span>
                  </Link>
                </CommandItem>
              )
            }
          </CommandGroup>
          <CommandSeparator />
          {
            user
              ?
              <CommandGroup heading={menuProfileName}>
                <SignOut>{auth_button.signout}</SignOut>
              </CommandGroup>
              :
              <CommandGroup heading={menuProfileName}>
                <CommandItem className="hover:bg-yz-neutral-100 rounded-lg cursor-pointer" asChild>
                  <Link href="/login">
                    <LuLogIn className="mr-2 h-4 w-4" />
                    <span>{auth_button.login}</span>
                  </Link>
                </CommandItem>
                <CommandItem className="hover:bg-yz-neutral-100 rounded-lg cursor-pointer" asChild>
                  <Link href="/signup">
                    <LuUserPlus className="mr-2 h-4 w-4" />
                    <span>{auth_button.signup}</span>
                  </Link>
                </CommandItem>
              </CommandGroup>
          }
        </CommandList>
      </Command>
    </div>
  )
}
export { Menu }
