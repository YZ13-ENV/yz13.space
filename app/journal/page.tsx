import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
import { getLocale, Locales } from "@/dictionaries/tools"
import { Suspense } from "react"
import { Footer } from "../_components/footer"

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
      <Logo
        width={36} height={36}
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
      />
      <Suspense fallback={<></>}>
        <Dock lang={searchParamLang as Locales | undefined} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="grid grid-cols-2 auto-rows-auto gap-3">
          <div className="w-full h-32 rounded-2xl bg-yz-neutral-300"></div>
          <div className="w-full h-32 rounded-2xl bg-yz-neutral-300"></div>
          <div className="w-full h-32 rounded-2xl bg-yz-neutral-300"></div>
          <div className="w-full h-32 rounded-2xl bg-yz-neutral-300"></div>
          <div className="w-full h-32 rounded-2xl bg-yz-neutral-300"></div>
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