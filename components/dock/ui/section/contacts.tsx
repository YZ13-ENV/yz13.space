import { Separator } from "@repo/ui/separator"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import Link from "next/link"
import * as bs from "react-icons/bs"
import { Trigger } from "../trigger"

const Contacts = async () => {
  const contacts = await get<Contact[]>("contacts")
  return (
    <>
      <Separator orientation="vertical" className="h-1/2" />
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
      <Separator orientation="vertical" className="h-1/2" />
    </>
  )
}
export { Contacts }
