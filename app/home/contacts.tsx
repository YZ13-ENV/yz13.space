import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { cn } from "@repo/ui/cn"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import Link from "next/link"
import * as bs from "react-icons/bs"

type ListProps = {
  lang?: Locales
  hideTitle?: boolean
  title?: ({ name }: { name: string }) => JSX.Element
}

const Contacts = async ({ lang: providedLang = "en", title: providedTitle, hideTitle = false }: ListProps) => {
  const contacts = await get<Contact[]>("contacts")
  const locale = getLocale()
  const lang = providedLang ? providedLang : locale
  const changelogDict = await getDict<any>("contacts", lang)
  const name = changelogDict.name
  const title = providedTitle
  return (
    <div className="flex flex-col gap-2">
      {
        !hideTitle && title && title({ name })
      }
      <div className="w-full flex gap-3 items-center overflow-x-auto no-scrollbar">
        {
          contacts &&
          contacts.map(contact => {
            // @ts-ignore
            const icon = (bs[contact.icon as keyof bs] as IconType)({ size: 14 })
            return (
              <Link key={`with-icon-${contact.value_label}`}
                href={contact.value}
                className={cn(
                  "flex w-fit items-center justify-start h-9 gap-2 text-base",
                  "text-foreground/75 hover:text-foreground transition-colors"
                )}
              >
                {contact.label}
              </Link>
            )
          }
          )
        }
      </div>
    </div>
  )
}
const ContactsSkeleton = () => {
  return <div className="w-full h-[26px] bg-yz-neutral-200 animate-pulse" />
}
export { Contacts, ContactsSkeleton }
