import { Locales, getDict, getLocale } from "@/dictionaries/tools"
import { get } from "@vercel/edge-config"
import Image from "next/image"
import { Suspense } from "react"
import { Contacts } from "../(threads)/_components/contacts"
import { Footer } from "../(threads)/_components/footer"
import { Dock } from "../_components/dock"
import { Header } from "../_components/header"
import { LeftSide } from "../_components/split-view/left"
import { RightSide } from "../_components/split-view/right"
import { Works } from "./works"

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
      <Image
        src="/yz-light.png"
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        width={36} height={36} alt="logo"
      />
      <Dock lang={searchParamLang as Locales | undefined} />
      <div className="max-w-3xl w-full mx-auto">
        <LeftSide>
          <div className="p-6 space-y-6">
            <div className="w-full">
              <h1 className="text-7xl font-bold">{name}</h1>
            </div>
            {
              feedbacks &&
              <div className="w-full h-64 rounded-xl border p-6">
                <div style={{ height: "calc(100% - 36px)" }} className="w-full h-full">
                  <span className="text-4xl font-semibold text-foreground">...</span>
                </div>
                <div className="w-full h-9 flex justify-end">
                  <div className="w-9 aspect-square rounded-full bg-yz-neutral-100" />
                </div>
              </div>
            }
          </div>
        </LeftSide>
        <RightSide className="divide-y">
          <Header lang={lang} />
          <Suspense fallback={<div className="w-full aspect-video bg-yz-neutral-100 animate-pulse" />}>
            <Works />
          </Suspense>
          <div className="w-full p-6 space-y-6">
            <Contacts lang={lang} />
            <Footer />
          </div>
        </RightSide>
      </div>
    </>
  )
}
export default page