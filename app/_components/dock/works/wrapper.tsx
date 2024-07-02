"use client"
import { ServerTab, tabs } from "@/app/home/library/const"
import { Carousel, CarouselApi, CarouselContent } from "@repo/ui/carousel"
import { cn } from "@repo/ui/cn"
import { easeInOut, motion } from "framer-motion"
import { ReactNode, useEffect, useState } from "react"

type Props = {
  providedTabs?: ServerTab[]
  children?: ReactNode
}

const Wrapper = ({ children, providedTabs = [] }: Props) => {
  const [selectedTab, setTab] = useState<string>(providedTabs[0]?.value as string)
  const [api, setApi] = useState<CarouselApi>()
  const scrollCarousel = (target: string) => {
    setTab(target)
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
    <div className="w-full h-full divide-y border-yz-neutral-300 bg-yz-neutral-100 !border shadow-sm rounded-xl">
      <div className="flex dock-work-header p-2 shrink-0">
        {
          providedTabs.map(
            tab => {
              const isSelected = selectedTab === tab.value
              return (
                <button
                  onClick={() => scrollCarousel(tab.value)}
                  key={"work-tab-" + tab.value}
                  className={cn(
                    "h-full px-3 rounded-xl flex items-center gap-1.5 text-sm transition-all delay-300 duration-300 relative",
                    isSelected ? "text-foreground scale-100" : "text-secondary scale-90 hover:text-foreground"
                  )}
                >
                  {tab.icon}
                  <span className="text-inherit z-[1] text-sm">{tab.label}</span>
                  {
                    isSelected &&
                    <motion.span
                      transition={{ duration: .3, easings: easeInOut }}
                      layoutId="work-active-tab"
                      className="absolute top-0 left-0 z-0 w-full h-full rounded-full bg-yz-neutral-200"
                    />
                  }

                </button>
              )
            }
          )
        }
      </div>
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="h-full">
          {children}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
export { Wrapper }
