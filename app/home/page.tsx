import { getDictionary } from "@/dictionaries/tools"
import { Button } from "@/packages/ui/src/components/button"
import { cookies } from "next/headers"
import { Header } from "../_components/header"
import { Library } from "./library"

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
      {/* <div className="absolute top-0 left-0 w-full h-screen">
        <div className="relative w-full h-full">
          <video src="/bg-animation.webm" className="object-cover opacity-30 z-[1] w-full h-full grayscale" autoPlay muted loop playsInline />
          <div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background backdrop-blur-3xl" />
        </div>
      </div> */}
      <Header />
      <div className="relative w-full max-w-5xl mx-auto mt-20">
        {/* <Connector className="absolute -left-[100%] top-0 w-full" /> */}
        {/* <Connector className="absolute rotate-180 -right-[100%] top-0 w-full" /> */}
        <div className="relative flex flex-col items-center justify-center w-full gap-2 border aspect-video">
          <div className="absolute top-0 left-0 w-full h-16 border-b"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 border-t"></div>
          <div className="absolute top-0 left-0 w-16 h-full border-r"></div>
          <div className="absolute top-0 right-0 w-16 h-full border-l"></div>
          <h1 className="text-5xl text-center font-bold">{hero.title}</h1>
          <p className="text-xl text-center text-secondary">{hero.description}</p>
        </div>
      </div>
      {/* <div className={cn(
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
        <h1 className="max-w-5xl text-6xl font-extrabold text-center lg:text-8xl">{hero.title}</h1>
        <p className="text-lg text-secondary">{hero.description}</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" disabled>
            {hero["action-secondary"]}
          </Button>
          <Button variant="default" asChild>
            <Link href="/works">
              {hero["action-primary"]}
            </Link>
          </Button>
        </div>
      </div> */}
      <div className="z-10 w-full mx-auto divide-y">
        <div className="w-full max-w-5xl mx-auto border-x">
          <Library />
        </div>
        {/* <Templates /> */}
        <div className="w-full max-w-5xl mx-auto border-x">
          <div className="w-full flex flex-col gap-3 p-6">
            <p className="inline-flex flex-col text-2xl font-semibold text-secondary">
              <b className="text-foreground shrink-0">{ready.title}</b>
              {ready.description}
            </p>
            <Button disabled className="w-fit">{ready.action}</Button>
          </div>
        </div>
        <div className="w-full max-w-5xl mx-auto border-x">
          <footer className="w-full p-6 mx-auto h-fit">
            <span className="text-secondary">
              {footer.description}
            </span>
          </footer>
        </div>
      </div>
    </>
  )
}
export default page