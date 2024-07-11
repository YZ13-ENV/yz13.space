import { Dock } from "@/components/dock"
import { Header } from "@/components/header"
import { Logo } from "@/components/logo"
import { metadata as layoutMetadata } from "@/const/metadata"
import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { get } from "@vercel/edge-config"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { Works } from "./works"

export const metadata: Metadata = {
  ...layoutMetadata,
  title: "Works",
  description: "Explore my works, hope yoy like some of them"
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
  const worksDict = await getDict<any>("works", lang)
  const name = worksDict.name
  const features = await get<{ [key: string]: boolean }>("features")
  const feedbacks = features?.feedbacks || false
  return (
    <>
      <Link href="/home">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <Dock lang={searchParamLang as Locales | undefined} />
      <div className="max-w-3xl w-full mx-auto">
        <Header lang={lang} />
        <Suspense fallback={<div className="w-full aspect-video bg-yz-neutral-100 animate-pulse" />}>
          <Works />
        </Suspense>
        <div className="w-full p-6 space-y-6">
          <Contacts lang={lang} />
          <Footer />
        </div>
      </div>
    </>
  )
}
export default page