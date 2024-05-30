import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import Link from "next/link"

const Contacts = async () => {
  const contacts = await get<Contact[]>("contacts")
  return (
    <section className="space-y-3 py-6">
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
export { Contacts }
