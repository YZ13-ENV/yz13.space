import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import Image from "next/image"
import Link from "next/link"
import * as bs from "react-icons/bs"

const Header = async () => {
  const contacts = await get<Contact[]>("contacts")
  return (
    <header className="w-full">
      <div className="w-full mt-auto flex flex-row items-center justify-start gap-4">
        <Image src="/brand/yz13-dark.svg" width={36} height={36} alt="brand-logo" />
        <span className="text-2xl text-secondary">\</span>
        {
          contacts &&
          contacts.map(contact => {
            // @ts-ignore
            const icon = (bs[contact.icon as keyof bs] as IconType)({ size: 24 })
            return <Button key={`short-${contact.value_label}`} size="icon" variant="ghost" asChild>
              <Link href={contact.value}>
                {icon}
              </Link>
            </Button>
          }
          )
        }
      </div>
    </header>
  )
}
export { Header }
