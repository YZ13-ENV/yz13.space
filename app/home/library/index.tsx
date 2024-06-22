"use client"
import { cn } from "@/packages/ui/lib/utils"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@repo/ui/carousel"
import { useEffect, useState } from "react"
import { Tabs, tabs } from "./tabs"

const Library = () => {
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
    console.log(api.selectedScrollSnap())
    api.on("select", e => {
      const index = api.selectedScrollSnap()
      const updatedTab = tabs[index]
      if (updatedTab) setTab(updatedTab?.value)
    })
  }, [api])
  return (
    <div
      className={cn("relative w-full px-6 transition-all")}
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
        <CarouselContent>
          {
            tabs
              .map((pr_tab, index) =>
                <CarouselItem key={pr_tab.value + `#${index}`}>
                  <div
                    className="grid w-full grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 h-fit"
                  >
                    <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
                      <span className="select-none">{pr_tab.label} - 1</span>
                    </div>
                    <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
                      <span className="select-none">{pr_tab.label} - 2</span>
                    </div>
                    <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
                      <span className="select-none">{pr_tab.label} - 3</span>
                    </div>
                    <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
                      <span className="select-none">{pr_tab.label} - 4</span>
                    </div>
                    <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
                      <span className="select-none">{pr_tab.label} - 5</span>
                    </div>
                    <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
                      <span className="select-none">{pr_tab.label} - 6</span>
                    </div>
                  </div>
                </CarouselItem>
              )
          }
        </CarouselContent>
      </Carousel>
    </div>
  )
}
export { Library }
