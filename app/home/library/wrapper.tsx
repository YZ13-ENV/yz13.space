"use client"
import { cn } from "@/packages/ui/lib/utils"
import { Carousel, CarouselApi, CarouselContent } from "@/packages/ui/src/components/carousel"
import { ReactNode, useEffect, useState } from "react"
import { tabs } from "./const"
import { Tabs } from "./tabs"

type Props = {
  children?: ReactNode
}
const LibraryWrapper = ({ children }: Props) => {
  const [tab, setTab] = useState<string>(tabs[0]?.value as string)
  const [api, setApi] = useState<CarouselApi>()
  const scrollCarousel = (target: string) => {
    if (api) {
      const targetIndex = tabs.findIndex(item => item.value === target)
      if (targetIndex > -1) api.scrollTo(targetIndex, false)
    }
  }
  useEffect(() => {
    if (!api) { return }
    api.on("select", e => {
      const index = api.selectedScrollSnap()
      const updatedTab = tabs[index]
      if (updatedTab) setTab(updatedTab?.value)
    })
  }, [api])
  return (
    <>
      <div
        className={cn("relative w-full px-6 transition-all max-w-7xl mx-auto")}
      >
        <div className="w-full h-44 flex items-center justify-center">
          <Tabs onTab={newTab => {
            setTab(newTab)
            scrollCarousel(newTab)
          }}
            selectedTab={tab}
          />
        </div>
        <Carousel
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {children}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}
export { LibraryWrapper }
