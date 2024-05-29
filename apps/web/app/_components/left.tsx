import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import { user } from "@yz13/api/gh"
import Image from "next/image"
import Link from "next/link"
import * as bs from "react-icons/bs"

const LeftSide = async () => {
  const gh_user = await user.getUser()
  const skills = await get<string[]>("skills")
  const contacts = await get<Contact[]>("contacts")
  return (
    <div className="lg:w-1/2 w-full shrink-0 md:py-6 py-3 px-6 flex flex-col items-center gap-6 lg:sticky relative top-0 lg:h-screen h-fit">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="max-w-sm w-full space-y-5">
          <div className="w-16 aspect-square rounded-full bg-accents-1 relative">
            {
              gh_user &&
              <Image src={gh_user.avatar_url} className="rounded-full" fill alt="user-photo" />
            }
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{gh_user?.name}</h1>
            <p className="text-sm text-secondary">Frontend developer</p>
          </div>
          <div className="flex flex-col">
            <span className="uppercase text-sm text-secondary">about</span>
            <p className="text-sm">{gh_user?.bio}</p>
          </div>
          <div className="flex flex-col">
            <span className="uppercase text-sm text-secondary">contact</span>
            <ul>
              {
                contacts &&
                contacts.map(contact => {
                  // @ts-ignore
                  const icon = (bs[contact.icon as keyof bs] as IconType)({ size: 16 })
                  return <li key={`with-icon-${contact.value_label}`}>
                    <Link href={contact.value} className="flex h-9 items-center justify-start hover:bg-accents-1 rounded-xl hover:px-3 duration-500 transition-all gap-2">
                      {icon}
                      <span className="text-sm">{contact.label}</span>
                    </Link>
                  </li>
                }
                )
              }
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <span className="uppercase text-sm text-secondary">skills</span>
            <div className="flex flex-row flex-wrap gap-1 w-full">
              {
                skills?.map(skill =>
                  <span key={skill} className="px-2 py-1 text-xs rounded-full border">{skill}</span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { LeftSide }
