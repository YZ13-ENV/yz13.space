import { get } from "@vercel/edge-config"
import { Separator } from "@yz13/mono/components/separator"
import Link from "next/link"
import * as bs from "react-icons/bs"
import { Trigger } from "../trigger"

export type Contact = {
  icon: string
  label: string
  value_label: string
  value: string
}

const Contacts = async () => {
  const contacts = await get<Contact[]>("contacts")
  return (
    <>
      <Separator orientation="vertical" className="h-6" />
      {
        contacts &&
        contacts.map(contact =>
          <Trigger key={`dock#${contact.value}`} asChild value={contact.label}>
            <Link href={contact.value}>
              {contact.icon && bs[contact.icon as keyof typeof bs]({ size: 16 })}
            </Link>
          </Trigger>
        )
      }
      <Separator orientation="vertical" className="h-6" />
    </>
  )
}
export { Contacts }
