import { nav_links } from "@/app/_conts/nav-links"
import { Locales, getDict } from "@/dictionaries/tools"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { Button } from "@/packages/ui/src/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/packages/ui/src/components/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@repo/ui/command"
import { cookies } from "next/headers"
import Link from "next/link"
import { LuLogIn, LuLogOut, LuMenu, LuUser, LuUserPlus } from "react-icons/lu"
import { SimpleTooltip } from "../simple-tooltip"

const Menu = async ({ className = "" }: { className?: string }) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const locale = (cks.get("locale")?.value || "").slice(0, 2) as Locales
  const navDict = await getDict("nav", locale) as { labels: { label: string, link: string }[] }
  const local_nav_links = nav_links.map(nav => {
    const target = navDict.labels.find(item => item.link === nav.link)
    if (target) {
      return {
        ...nav,
        label: target.label
      }
    } else return nav
  })
  return (
    <Popover>
      <SimpleTooltip text="Меню" sideOffset={10}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost"><LuMenu size={18} /></Button>
        </PopoverTrigger>
      </SimpleTooltip>
      <PopoverContent
        sideOffset={24}
        className="rounded-xl p-0 border-yz-neutral-300 bg-yz-neutral-100 !border shadow-sm"
      >
        <Command className="">
          <CommandInput disabled placeholder="Type a command or search..." />
          <CommandItem className="gap-1">
            <span className="px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center bg-background">
              12:30
            </span>
            <span className="px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center bg-background">
              28 June 2024
            </span>
          </CommandItem>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {
                local_nav_links.map(nav =>
                  <CommandItem
                    key={`command-${nav.link}`}
                    className="gap-2 cursor-pointer hover:bg-yz-neutral-50 rounded-lg"
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
                <CommandGroup heading="Profile">
                  <CommandItem className="hover:bg-yz-neutral-50 rounded-lg cursor-pointer">
                    <LuUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </CommandItem>
                  <CommandItem className="hover:bg-yz-neutral-50 rounded-lg cursor-pointer">
                    <LuLogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </CommandItem>
                </CommandGroup>
                :
                <CommandGroup heading="Profile">
                  <CommandItem className="hover:bg-yz-neutral-50 rounded-lg cursor-pointer" asChild>
                    <Link href="/login">
                      <LuLogIn className="mr-2 h-4 w-4" />
                      <span>Log in</span>
                    </Link>
                  </CommandItem>
                  <CommandItem className="hover:bg-yz-neutral-50 rounded-lg cursor-pointer" asChild>
                    <Link href="/signup">
                      <LuUserPlus className="mr-2 h-4 w-4" />
                      <span>Sign up for free</span>
                    </Link>
                  </CommandItem>
                </CommandGroup>
            }
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export { Menu }
