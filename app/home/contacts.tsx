import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import Link from "next/link"
import * as bs from "react-icons/bs"

const Contacts = async () => {
  const contacts = await get<Contact[]>("contacts")
  return (
    <>
      {
        contacts &&
        contacts.map(contact => {
          // @ts-ignore
          const icon = (bs[contact.icon as keyof bs] as IconType)({ size: 14 })
          return (
            <Link key={`with-icon-${contact.value_label}`}
              href={contact.value}
              className="flex w-fit px-2 py-1 rounded-full border bg-background items-center justify-start gap-2"
            >
              {icon}
              <span className="text-xs">{contact.label}</span>
            </Link>
          )
        }
        )
      }
    </>
  )
}
const ContactsSkeleton = () => {
  return <div className="w-full h-[26px] bg-yz-neutral-200 animate-pulse" />
}
export { Contacts, ContactsSkeleton }
