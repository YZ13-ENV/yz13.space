import { Logo } from "@/components/logo"
import { getDict, getLocale } from "@/dictionaries/tools"
import { Button } from "@yz13/mono/components/button"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"

const not_found = async () => {
  const lang = getLocale()
  const dict = await getDict<any>("journal", lang)
  const not_found = dict["not-found"]
  const title = not_found.title
  const action = not_found.action
  return (
    <>
      <Link href="/journal">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <div className="w-full flex-col gap-6 flex items-center justify-center h-screen">
        <Logo
          width={256} height={256}
          className="opacity-10"
        />
        <h1 className="font-semibold text-3xl opacity-10">{title}</h1>
        <Button className="gap-2" asChild variant="secondary">
          <Link href="/journal">
            <BiLeftArrowAlt size={16} /> {action}
          </Link>
        </Button>
      </div>
    </>
  )
}
export default not_found