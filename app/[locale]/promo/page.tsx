import { LogoHeader } from "@/components/header/logo"
import { Button } from "@yz13/mono/components/button"
import { ExternalLinkIcon } from "lucide-react"
import Image from "next/image"
import { cn } from "yz13/cn"


const page = () => {
  return (
    <>
      <div
        className={cn(
          "w-full max-w-7xl mx-auto h-fit",
          "flex sm:!flex-row flex-col-reverse justify-between",
          "md:!px-20 px-10 md:!mt-36 mt-24 md:!gap-20 gap-10"
        )}
      >
        <div className="md:!w-1/2 w-full aspect-[9/16] overflow-hidden border rounded-3xl relative">
          <Image
            src="/mobile-yz13-space.png"
            className="object-cover object-top"
            fill
            alt="mobile-yz13-space"
          />
        </div>
        <div className="md:!w-1/2 w-full flex flex-row gap-3">
          <LogoHeader className="lg:!size-16 md:!size-12 size-10 shrink-0" />
          <div className="w-full flex flex-col gap-6">
            <div className="lg:!h-16 md:!h-12 h-10 flex items-center">
              <h1 className="lg:!text-6xl md:!text-5xl text-4xl font-pixel">YZ13</h1>
            </div>
            <p className="lg:!text-3xl md:!text-2xl text-xl font-pixel text-foreground/60">
              Воплотим ваши идеи в код и задеплоим.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="gap-2">Visit <ExternalLinkIcon size={16} /></Button>
            </div>
          </div>
        </div>
      </div>
      <footer className="max-w-7xl px-20 h-12 mx-auto flex items-center justify-between">
        <span className="text-xs text-secondary">YZ13</span>
        <span className="text-xs text-secondary">2024</span>
      </footer>
    </>
  )
}
export default page
