import { getDictionary } from "@/dictionaries/tools"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { cookies } from "next/headers"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Header } from "./header"
import { Library } from "./library"
import { Templates } from "./templates"

const page = async () => {
  const cookiesList = cookies()
  const locale = (cookiesList.get("locale")?.value || "").slice(0, 2)
  const dict: any = await getDictionary(locale)
  const homeDict = dict?.home
  const hero = homeDict.hero
  const ready = homeDict.ready
  const footer = homeDict.footer
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen">
        <div className="relative w-full h-full">
          <video src="/bg-animation.webm" className="object-cover opacity-30 z-[1] w-full h-full grayscale" autoPlay muted loop playsInline />
          <div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background backdrop-blur-3xl" />
        </div>
      </div>
      <Header />
      <div className={cn(
        "relative w-full mx-auto h-[80dvh]",
        "flex flex-col justify-center items-center gap-12 px-6"
      )}>
        <div className="absolute flex justify-center w-full top-6">
          <Link
            href="https://json.yz13.space"
            className="inline-flex items-center gap-2 px-2.5 py-1 text-sm border border-yz-neutral-200 rounded-md bg-yz-neutral-100"
          >
            JSON Store is out
            <BiRightArrowAlt size={16} />
          </Link>
        </div>
        <h1 className="font-extrabold max-w-5xl text-center text-6xl lg:text-8xl">{hero.title}</h1>
        <p className="text-lg text-secondary">{hero.description}</p>
        <div className="flex items-center gap-3">
          <Button variant="outline">{hero["action-secondary"]}</Button>
          <Button variant="default">{hero["action-primary"]}</Button>
        </div>
      </div>
      <div className="z-10 w-full pt-20 mx-auto space-y-12">
        <Library />
        <Templates />

        <div className="flex max-w-4xl mx-auto flex-col w-full gap-4 px-6 py-12 h-fit">
          <p className="text-2xl inline-flex flex-col font-semibold text-secondary">
            <b className="text-foreground shrink-0">{ready.title}</b>
            {ready.description}
          </p>
          <Button className="w-fit">{ready.action}</Button>
        </div>
        <footer className="w-full max-w-4xl mx-auto px-6 py-12 h-fit">
          <span className="text-secondary">
            {footer.description}
          </span>
        </footer>
      </div>
    </>
  )
}
export default page