import { Dock } from "@/components/dock"
import { DynamicImage } from "@/components/dynamic-image"
import { Locales, getLocale } from "@/dictionaries/tools"
import { Page, dynamicMetadata } from "@/metadata"
import { Metadata } from "next"
import { Suspense } from "react"
import { LocalizedTitle } from "../../components/changelog"
import { Works, WorksSkeleton } from "./works"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "works"
  const metadata = dynamicMetadata(lang, page)
  return metadata
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
  return (
    <>
      <div className="h-12 w-28 xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0">
        <DynamicImage
          image={{
            dark: "https://yzstatic.yz13.space/logo/yz-dark-full.svg",
            light: "https://yzstatic.yz13.space/logo/yz-light-full.svg"
          }}
          alt="logo"
        />
      </div>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6">
        <Suspense fallback={<WorksSkeleton />}>
          <Works itemClassName="p-0" lang={lang} title={LocalizedTitle} />
        </Suspense>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page