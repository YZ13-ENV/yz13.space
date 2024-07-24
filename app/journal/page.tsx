import { Dock } from "@/components/dock"
import { DynamicImage } from "@/components/dynamic-image"
import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { showPixelLogo } from "@/feature-flags/pixelated-logo.feature"
import { dynamicMetadata, Page } from "@/metadata"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { JournalSection, JournalSkeleton } from "./journal"


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "journal"
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
  const dict = await getDict<any>("journal", lang)
  const name = dict.name
  const pixelLogo = await showPixelLogo()
  return (
    <>
      <Link href="/home">
        <div className="size-12 xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0">
          <DynamicImage
            image={{
              dark: pixelLogo ? "https://yzstatic.yz13.space/logo/yz-dark-pixel-2.svg" : "https://yzstatic.yz13.space/logo/yz-dark.svg",
              light: pixelLogo ? "https://yzstatic.yz13.space/logo/yz-light-pixel-2.svg" : "https://yzstatic.yz13.space/logo/yz-light.svg"
            }}
            alt="logo"
          />
        </div>
      </Link>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-medium">{name}</h1>
        <Suspense fallback={<JournalSkeleton />}>
          <JournalSection locale={lang} />
        </Suspense>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page