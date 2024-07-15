import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
import { getLocale, Locales } from "@/dictionaries/tools"
import Link from "next/link"
import { Suspense } from "react"

type Props = {
  params: {
    path: string[]
  }
  searchParams: {
    lang?: string
  }
}

const page = ({ params, searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const path = params.path
  return (
    <>
      <Link href="/journal">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <Suspense fallback={<></>}>
        <Dock lang={searchParamLang as Locales | undefined} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-medium">{path.join("/")} <span className="uppercase text-secondary">{lang}</span></h1>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page