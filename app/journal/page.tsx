import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
import { getLocale, Locales } from "@/dictionaries/tools"
import Link from "next/link"
import { Suspense } from "react"
import { PiDotDuotone } from "react-icons/pi"
import { getJournal } from "./get-journal"

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const journal = getJournal(lang)
  console.log(journal)
  // return (
  // <div className="w-full h-screen flex items-center justify-center">
  {/* <Logo */ }
  // width={256} height={256}
  // className="opacity-10"
  // />
  {/* </div> */ }
  // )
  return (
    <>
      <Logo
        width={36} height={36}
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
      />
      <Suspense fallback={<></>}>
        <Dock lang={searchParamLang as Locales | undefined} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-medium">Journal <span className="uppercase text-secondary">{lang}</span></h1>
        <ul className="space-y-3">
          {
            journal.map(record => {
              const id = record.replace(".mdx", "")
              return (
                <li key={record} className="h-32 relative w-full flex items-start gap-3">
                  <Link href={`/journal/${id}`} className="absolute top-0 left-0 w-full h-full" />
                  <div className="h-full aspect-video border rounded-xl bg-yz-neutral-200" />
                  <div className="flex flex-col gap-0.5 py-2">
                    <span className="font-medium text-2xl text-foreground">
                      Beautiful grid component
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-foreground/75">YZ13</span>
                      <PiDotDuotone size={16} />
                      <span className="text-sm text-foreground/75">A day ago</span>
                    </div>
                    <span className="text-base text-foreground/80">
                      I develop a beautiful and reusable grid component
                    </span>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page