import { getLocale } from "@/dictionaries/tools"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import { user } from "@yz13/api/gh"
import Image from "next/image"
import Link from "next/link"
import * as bs from "react-icons/bs"

const YZ13Info = async () => {
  const gh_user = await user.getUser()
  const skills = await get<string[]>("skills")
  const contacts = await get<Contact[]>("contacts")
  const locale = getLocale()
  return (
    <div className="xl:max-w-sm max-w-full w-full space-y-5">
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
  )
}

const YZ13InfoSkeleton = () => {
  return (
    <div className="xl:max-w-sm max-w-full w-full space-y-5">
      <div className="w-16 aspect-square rounded-full animate-pulse bg-accents-1 relative" />
      <div className="flex flex-col gap-1">
        <h1 className="h-6 w-36 rounded-md bg-yz-neutral-200 animate-pulse" />
        <p className="w-16 h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="w-16 h-5 rounded-md mb-1 bg-yz-neutral-200 animate-pulse" />
        <p className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
        <p className="w-1/2 h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="w-16 h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
        <ul className="space-y-1">
          <li className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
          <li className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
          <li className="w-full h-5 rounded-md bg-yz-neutral-200 animate-pulse" />
        </ul>
      </div>
    </div>
  )
}

export { YZ13Info, YZ13InfoSkeleton }
