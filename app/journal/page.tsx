import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import Link from "next/link"
import { Suspense } from "react"
import { JournalSection, JournalSkeleton } from "./journal"

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
  return (
    <>
      <Link href="/home">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-medium inline-flex items-center gap-2">
          {name}
          <span className="uppercase text-xl text-secondary">{lang}</span>
        </h1>
        <Suspense fallback={<JournalSkeleton />}>
          <JournalSection locale={lang} />
        </Suspense>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page