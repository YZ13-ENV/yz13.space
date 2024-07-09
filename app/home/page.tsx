import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
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
  const dictionaries = await get<{ [key: string]: any }>("dictionaries")
  const bannerURL = await get<string | undefined>("home-banner-url")
  const section = "home"
  const dict = dictionaries ? dictionaries[lang][section] : (await getDict<any>("home", lang))[section]
  const title = (dict.title || "")
  const description = (dict.description || "")
  return (
    <>
      <Logo
        width={36} height={36}
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
      />
      {/* <Overlay> */}
      {/* <Menu /> */}
      {/* </Overlay> */}
      <Dock />
      <div className="max-w-3xl w-full mx-auto p-6">
        <div className="w-full rounded-3xl bg-transparent h-fit flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/2 w-full h-fit space-y-3">
            <div className="w-full aspect-video rounded-xl relative bg-background border">
              {
                bannerURL &&
                <Image src={bannerURL} className="rounded-xl" fill alt="home-banner" />
              }
            </div>
            <section className="w-full flex flex-col gap-1.5 py-3">
              <h1 className="text-4xl font-medium">{title}</h1>
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
                <p className="text-secondary">{description}</p>
              </div>
            </section>
            <Separator />
            <Suspense fallback={<div className="w-full aspect-video bg-yz-neutral-100 animate-pulse" />}>
              <Works itemClassName="p-0" />
            </Suspense>
          </div>
          <div className="sm:w-1/2 w-full space-y-3 h-fit">
            <section>
              <Suspense fallback={<ChangelogSkeleton />}>
                <Changelog lang={lang} />
              </Suspense>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
export default page