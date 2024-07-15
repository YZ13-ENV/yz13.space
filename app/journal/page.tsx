import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
import { getLocale, Locales } from "@/dictionaries/tools"
import { cn } from "@repo/ui/cn"
import { Suspense } from "react"

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
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
        <ul>
          <li className="h-9 w-full">
            <div className="h-full flex gap-2 items-center group cursor-pointer">
              <span className="xl:text-base w-full text-sm text-secondary text-left float-left space-x-2 shrink-0">
                <span className="inline">13 Aug</span>
                <span
                  className={cn(
                    "xl:text-base text-start text-sm group-hover:text-foreground transition-colors"
                  )}
                >
                  New title
                </span>
              </span>
            </div>
          </li>
        </ul>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page