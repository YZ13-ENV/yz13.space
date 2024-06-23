import { cn } from "@/packages/ui/lib/utils"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import Link from "next/link"

type Props = {
  className?: string
}
const Contacts = async ({ className = "" }: Props) => {
  const contacts = await get<Contact[]>("contacts")
  return (
    <section className={cn("space-y-3", className)}>
      <h2 className="text-sm text-secondary uppercase">contact</h2>
      <ul className="divide-y">
        {
          contacts &&
          contacts.map(contact =>
            <li key={`bottom-${contact.value}`}>
              <Link href={contact.value} className="flex h-9 items-center justify-between">
                <span className="text-sm">{contact.label}</span>
                <span className="text-sm">{contact.value_label}</span>
              </Link>
            </li>
          )
        }
      </ul>
    </section>
  )
}

const ContactsSkeleton = () => {
  return (
    <section className="p-6">
      <h2 className="w-36 rounded-md h-5 mb-2 bg-yz-neutral-200 animate-pulse" />
      <ul className="space-y-1">
        <li className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
        <li className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
        <li className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
      </ul>
    </section>
  )
}

export { Contacts, ContactsSkeleton }
