import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { Separator } from "@/packages/ui/src/components/separator"
import { cookies } from "next/headers"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Logo } from "../_components/logo"
import { NavMenu } from "./nav-menu"
import { Tabs } from "./tabs"

const page = () => {
  const cookiesList = cookies()
  const locale = (cookiesList.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
  const X = ({ className }: { className?: string }) => {
    return (
      <div className={cn("absolute z-[1]", className)}>
        <div className="relative flex items-center justify-center w-6 h-6">
          <hr className="absolute w-6 border-yz-neutral-600" />
          <hr className="absolute w-6 rotate-90 border-yz-neutral-600" />
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen">
        <div className="relative w-full h-full">
          <video src="/bg-animation.webm" className="object-cover opacity-30 z-[1] w-full h-full grayscale" autoPlay muted loop playsInline />
          <div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background backdrop-blur-3xl" />
        </div>
      </div>
      <header className="w-full h-16">
        <div className="z-10 flex items-center justify-between w-full h-full max-w-full px-6 mx-auto">
          <div className="flex items-center gap-6">
            <Logo size={42} lang={localeCode} withTitle />
            <NavMenu />
          </div>
          <div className="z-10 flex items-center gap-3">
            <Button size="sm" variant="outline">Contact</Button>
            <Separator orientation="vertical" className="h-8" />
            <Button size="sm" variant="outline">Login</Button>
            <Button size="sm" variant="default">Sign up for free</Button>
            {/* <div className="rounded-full w-9 aspect-square bg-yz-neutral-200" /> */}
          </div>
        </div>
      </header>
      <div className="relative w-full mx-auto h-fit">
        <div className="relative flex flex-col items-center w-full h-full gap-12 py-36">
          <div className="absolute flex justify-center w-full top-6">
            <Link
              href="https://json.yz13.space"
              className="inline-flex items-center gap-2 px-2.5 py-1 text-sm rounded-md bg-yz-neutral-100"
            >
              JSON Store is out
              <BiRightArrowAlt size={16} />
            </Link>
          </div>
          <h1 className="font-extrabold text-center text-8xl">Help you get what you want</h1>
          <p className="text-lg text-secondary">Components, pages, websites</p>
          <div className="flex items-center gap-3">
            <Button variant="outline">Book a call</Button>
            <Button variant="default">Explore works</Button>
          </div>
        </div>
      </div>
      <div className="z-10 w-full max-w-3xl pt-20 mx-auto space-y-12">
        <div className="relative w-full px-6">
          <div className="w-full aspect-[1/.5] flex items-center justify-center">
            <Tabs />
          </div>
          <div className="grid w-full grid-cols-2 grid-rows-3 border lg:grid-cols-3 lg:grid-rows-2 h-96 rounded-xl">
            <div className="flex items-center justify-center w-full h-full">1</div>
            <div className="flex items-center justify-center w-full h-full">2</div>
            <div className="flex items-center justify-center w-full h-full">3</div>
            <div className="flex items-center justify-center w-full h-full">4</div>
            <div className="flex items-center justify-center w-full h-full">5</div>
            <div className="flex items-center justify-center w-full h-full">6</div>
          </div>
        </div>

        <div className="flex flex-col w-full px-6 py-12 md:flex-row h-fit">
          <div className="w-full p-2 md:w-1/3">
            <h2 className="text-2xl font-semibold">Choose templates</h2>
            <p className="text-base text-secondary">
              I prepare a few templates, we can start work with them or start from scratch
            </p>
          </div>
          <div className="grid w-full grid-cols-1 grid-rows-6 md:grid-cols-2 md:grid-rows-3 md:w-2/3">
            <div className="w-full p-2 aspect-video">
              <div className="flex flex-col items-center justify-center w-full h-full border rounded-lg">
                <span>Commercial</span>
              </div>
            </div>
            <div className="w-full p-2 aspect-video">
              <div className="flex flex-col items-center justify-center w-full h-full border rounded-lg">
                <span>Blog</span>
              </div>
            </div>
            <div className="w-full p-2 aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="w-full p-2 aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="w-full p-2 aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="w-full p-2 aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 px-6 py-12 h-fit">
          <p className="inline-flex gap-1 text-2xl font-semibold text-secondary">
            <b className="text-foreground shrink-0">Ready to work?</b>
            Book a call and we can talk
          </p>
          <Button className="w-fit">Book a call</Button>
        </div>

        <footer className="w-full px-6 py-12 h-fit">
          <span className="text-secondary">
            Build by <u>YZ13</u>, the source code is available on <u>Github</u>
          </span>
        </footer>
      </div>
    </>
  )
}
export default page