import { Dock } from "@/components/dock";
import { ExperienceList } from "@/components/experience";
import { ExperienceListSkeleton } from "@/components/experience/ui/skeleton";
import { Logo } from "@/components/logo";
import { metadata as layoutMetadata } from "@/const/metadata";
import { Locales, getDict, getLocale } from "@/dictionaries/tools";
import { showStatus } from "@/feature-flags/status.feature";
import { shotTechStack } from "@/feature-flags/tech-stack.feature";
import { Separator } from "@repo/ui/separator";
import { Metadata } from "next";
import { Suspense } from "react";
import { Changelog, ChangelogSkeleton, LocalizedTitle } from "../(threads)/(routes)/threads/changelog";
import { Footer } from "../(threads)/_components/footer";
import { Works, WorksSkeleton } from "../works/works";
import { Contacts, ContactsSkeleton } from "./contacts";
import { Description } from "./description";
import { Status } from "./status";
import { TechStack } from "./tech-stack";

export const metadata: Metadata = {
  ...layoutMetadata,
  title: "Home"
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
  const section = "home"
  const dict = (await getDict<any>("home", lang))[section]
  const title = (dict.title || "")
  const description: string = (dict.description || "")
  const position = (dict.position || "")
  const descriptionList = description.split(" ")
  const status = await showStatus()
  const techStack = await shotTechStack()
  const techStackDict = await getDict<any>("tech-stack", lang)
  const techStackTitle = techStackDict["name"]
  return (
    <>
      <Logo
        width={36} height={36}
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
      />
      <Suspense fallback={<></>}>
        <Dock lang={searchParamLang as Locales | undefined} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="w-full rounded-3xl bg-transparent h-fit flex flex-col gap-6">
          {/* <Suspense fallback={<BannerSkeleton />}> */}
          {/* <Banner /> */}
          {/* </Suspense> */}
          <div className="w-full h-fot relative">
            <section className="w-full flex flex-col gap-1.5 py-3">
              <h1 className="text-4xl uppercase font-medium">{title}</h1>
              <p className="text-4xl py-4 uppercase font-medium">{position}</p>
              <div className="w-full">
                <Description description={descriptionList} />
              </div>
            </section>
          </div>
          {
            status &&
            <Suspense fallback={<></>}>
              <Status lang={lang} title={LocalizedTitle} />
            </Suspense>
          }
          <Suspense fallback={<ContactsSkeleton />}>
            <Contacts lang={lang} title={LocalizedTitle} />
          </Suspense>
          {
            techStack
              ?
              <>
                <Separator />
                <TechStack title={techStackTitle} />
                <Separator />
              </>
              : <Separator />
          }
          <Suspense fallback={<ExperienceListSkeleton />}>
            <ExperienceList lang={lang} title={LocalizedTitle} />
          </Suspense>
          <Separator />
          <section>
            <Suspense fallback={<ChangelogSkeleton />}>
              <Changelog lang={lang} title={LocalizedTitle} />
            </Suspense>
          </section>
          <Separator />
          <Suspense fallback={<WorksSkeleton />}>
            <Works itemClassName="p-0" lang={lang} title={LocalizedTitle} />
          </Suspense>
        </div>
        <div className="mt-12">
          <Footer />
        </div>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page