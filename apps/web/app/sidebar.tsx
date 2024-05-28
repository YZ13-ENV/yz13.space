import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import { user } from "@yz13/api/gh"
import Image from "next/image"
import Link from "next/link"
import * as bs from "react-icons/bs"

const Sidebar = async () => {
  const gh_user = await user.getUser()
  const skills = await get<string[]>("skills")
  const contacts = await get<Contact[]>("contacts")
  return (
    <aside className="lg:w-96 md:w-72 w-16 shrink-0 md:p-6 p-3 flex flex-col md:items-start items-center gap-6 h-full">
      <div className="md:w-16 w-9 md:h-16 h-9 rounded-full bg-accents-1 relative">
        {
          gh_user &&
          <Image src={gh_user.avatar_url} className="rounded-full" fill alt="user-photo" />
        }
      </div>
      <div className="md:flex hidden flex-col">
        <h1 className="text-xl font-semibold">{gh_user?.name}</h1>
        <p className="text-sm text-secondary">Frontend developer</p>
      </div>
      <div className="md:flex hidden flex-col">
        <span className="uppercase text-sm text-secondary">about</span>
        <p>{gh_user?.bio}</p>
      </div>
      <div className="md:flex hidden flex-col">
        <span className="uppercase text-sm text-secondary">contact</span>
        <ul>
          {
            contacts &&
            contacts.map(contact => {
              // @ts-ignore
              const icon = (bs[contact.icon as keyof bs] as IconType)({ size: 16 })
              return <li key={`with-icon-${contact.value_label}`}>
                <Link href={contact.value} className="flex h-8 items-center justify-start hover:bg-accents-1 rounded-xl hover:px-3 duration-500 transition-all gap-2">
                  {icon}
                  <span className="text-sm">{contact.label}</span>
                </Link>
              </li>
            }
            )
          }
        </ul>
      </div>
      <div className="md:flex hidden flex-col gap-2">
        <span className="uppercase text-sm text-secondary">skills</span>
        <div className="flex flex-row flex-wrap gap-1 w-full">
          {
            skills?.map(skill =>
              <span key={skill} className="px-2 py-1 text-xs rounded-full border">{skill}</span>
            )
          }
        </div>
      </div>
      <div className="w-full mt-auto flex md:flex-row flex-col items-center gap-4">
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
    </aside>
  )
}
export { Sidebar }
