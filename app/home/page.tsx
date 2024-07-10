import { Dock } from "@/components/dock"
import { ExperienceList } from "@/components/experience"
import { ExperienceListSkeleton } from "@/components/experience/ui/skeleton"
import { Logo } from "@/components/logo"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { Separator } from "@repo/ui/separator"
import { get } from "@vercel/edge-config"
import { Metadata } from "next"
import { Suspense } from "react"
import { Changelog, ChangelogSkeleton } from "../(threads)/(routes)/threads/changelog"
import { Works } from "../works/works"
import { Banner, BannerSkeleton } from "./banner"
import { Contacts, ContactsSkeleton } from "./contacts"

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
  const dictionaries = await get<{ [key: string]: any }>("dictionaries")
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
            <Suspense fallback={<BannerSkeleton />}>
              <Banner />
            </Suspense>
            <section className="w-full flex flex-col gap-1.5 py-3">
              <h1 className="text-4xl font-medium">{title}</h1>
              <div className="w-full flex mt-1 flex-wrap gap-2 items-start">
                <Suspense fallback={<ContactsSkeleton />}>
                  <Contacts />
                </Suspense>
              </div>
              <div className="w-full mt-3">
                <p className="text-secondary">{description}</p>
              </div>
            </section>
            <Suspense fallback={<ExperienceListSkeleton />}>
              <ExperienceList lang={lang} />
            </Suspense>
            <Separator />
            <Suspense fallback={
              <div className="w-full space-y-4">
                <div className="w-full aspect-video bg-yz-neutral-300 rounded-xl animate-pulse" />
                <div className="w-full h-9 rounded-xl bg-yz-neutral-300 animate-pulse" />
              </div>
            }>
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