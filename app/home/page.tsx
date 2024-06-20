import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { cookies } from "next/headers"
import Image from "next/image"
import { LuGlobe, LuPackage } from "react-icons/lu"
import { Logo } from "../_components/logo"

const page = () => {
  const cookiesList = cookies()
  const locale = (cookiesList.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
  const X = ({ className }: { className?: string }) => {
    return (
      <div className={cn("absolute", className)}>
        <div className="flex justify-center w-6 h-6 items-center relative">
          <hr className="absolute border-yz-neutral-500 w-6" />
          <hr className="absolute border-yz-neutral-500 w-6 rotate-90" />
        </div>
      </div>
    )
  }
  return (
    <>
      <header className="w-full h-16">
        <div className="max-w-7xl px-6 w-full h-full justify-between flex items-center mx-auto">
          <div>
            <Logo size={42} lang={localeCode} />
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost">Contact</Button>
            <div className="w-9 aspect-square rounded-full bg-yz-neutral-200" />
          </div>
        </div>
      </header>
      <div className="max-w-3xl h-fit mx-auto w-full z-10 pt-20 space-y-12">
        <div className="w-full relative aspect-[1/.5] flex items-center flex-col gap-6 justify-center mb-20">
          <Image src="/test-logo.svg" className="aspect-video" width={112} height={112} alt="logo" />
          <div className="flex gap-2">
            <h1 className="text-6xl text-center font-bold">YZ13</h1>
            <div className="flex flex-col">
              <p className="text-secondary font-medium text-lg">Web</p>
              <p className="text-secondary font-medium text-lg">Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-3 absolute bottom-4">
            <Button variant="outline">Book a call</Button>
            <Button variant="default">Explore works</Button>
          </div>
        </div>
        <div className="w-full px-6 relative border">
          <X className="-top-[12.5px] -left-[12.5px]" />
          <X className="-top-[12.5px] -right-[12.5px]" />
          <X className="-bottom-[12.5px] -left-[12.5px]" />
          <X className="-bottom-[12.5px] -right-[12.5px]" />
          <div className="w-full aspect-[1/.5] flex items-center justify-center">
            <div className="h-fit p-1.5 w-fit flex items-center justify-center rounded-full border">
              <span className="px-4 py-2 h-10 rounded-full bg-foreground inline-flex items-center gap-1 text-background">
                <LuGlobe size={14} />
                Websites
              </span>
              <span className="px-4 py-2 h-10 inline-flex items-center gap-1 rounded-full">
                <LuPackage size={14} />
                Packages
              </span>
            </div>
          </div>
          <div className="w-full h-96 grid grid-cols-3 py-6 grid-rows-2">
            <div className="w-full h-full border-r border-b"></div>
            <div className="w-full h-full border-r border-b"></div>
            <div className="w-full h-full border-b"></div>
            <div className="w-full h-full border-r"></div>
            <div className="w-full h-full border-r"></div>
            <div className="w-full h-full"></div>
          </div>
        </div>

        <div className="w-full flex h-fit py-12">
          <div className="w-1/3 p-2">
            <h2 className="text-2xl font-semibold">Choose templates</h2>
            <p className="text-base text-secondary">Cool templates</p>
          </div>
          <div className="w-2/3 grid grid-cols-2 grid-rows-3">
            <div className="p-2 w-full aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="p-2 w-full aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="p-2 w-full aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="p-2 w-full aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="p-2 w-full aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
            <div className="p-2 w-full aspect-video">
              <div className="w-full h-full border rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 h-fit py-12">
          <p className="text-2xl font-semibold text-secondary inline-flex gap-1">
            <b className="text-foreground">Ready to work?</b>
            Book a call and we can talk
          </p>
          <Button className="w-fit">Book a call</Button>
        </div>

        <footer className="w-full py-12 h-44"></footer>
      </div>
    </>
  )
}
export default page