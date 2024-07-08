import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { Separator } from "@repo/ui/separator"
import { get } from "@vercel/edge-config"
import { Contact } from "@yz13/api/edge/types"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import * as bs from "react-icons/bs"
import { Changelog, ChangelogSkeleton } from "../(threads)/(routes)/threads/changelog"
import { Dock } from "../_components/dock"
import { nav_links } from "../_conts/nav-links"
import { Works } from "../works/works"

const metadata: Metadata = {
  title: "YZ13 - "
}

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const navDict = await getDict("nav", lang) as { labels: { label: string, link: string }[] }
  const local_nav_links = nav_links.map(nav => {
    const target = navDict.labels.find(item => item.link === nav.link)
    if (target) {
      return {
        ...nav,
        link: nav.link + (searchParamLang ? `?lang=${searchParamLang}` : ""),
        label: target.label
      }
    } else return { ...nav, link: nav.link + (searchParamLang ? `?lang=${searchParamLang}` : "") }
  })
  const contacts = await get<Contact[]>("contacts")
  return (
    <>
      <Image
        src="/yz-light.png"
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        width={36} height={36} alt="logo"
      />
      <Dock />
      <div className="max-w-3xl w-full mx-auto p-6">
        <div className="w-full rounded-3xl bg-transparent h-fit flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/2 w-full h-fit space-y-3">
            <div className="w-full flex justify-between">
              <span>About</span>
              <div className="flex items-center gap-2">
                {/* <span>1</span> */}
                {/* <span>2</span> */}
              </div>
            </div>
            <div className="w-full aspect-video rounded-xl bg-background border" />
            <div className="w-full flex flex-col gap-1.5 py-3">
              <h1 className="text-4xl font-medium">Vladimir/@YZ13</h1>
              <div className="w-full flex mt-1 flex-wrap gap-2 items-start">
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
              </div>
              <div className="w-full mt-3">
                <p className="text-secondary">
                  Hello, im a frontend developer. I love create beautiful sites, so check out my works.
                </p>
              </div>
            </div>
            <Separator />
            <span className="inline-block">Works</span>
            <Suspense fallback={<div className="w-full aspect-video bg-yz-neutral-100 animate-pulse" />}>
              <Works itemClassName="p-0" />
            </Suspense>
          </div>
          <div className="sm:w-1/2 w-full space-y-3 h-fit">
            <span>Changelog</span>
            <Suspense fallback={<ChangelogSkeleton />}>
              <Changelog hideTitle lang={lang} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
export default page