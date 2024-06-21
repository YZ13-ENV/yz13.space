"use client"
import { cn } from "@/packages/ui/lib/utils"
import { useState } from "react"
import { Tabs } from "./tabs"

const Library = () => {
  const [tab, setTab] = useState<string>("")
  return (
    <div
      className={cn("relative w-full px-6 transition-all")}
    >
      <div className="w-full h-44 flex items-center justify-center">
        <Tabs onTab={setTab} />
      </div>
      <div
        className="grid w-full grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 h-fit"
      >
        <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
          <span>{tab} - 1</span>
        </div>
        <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
          <span>{tab} - 2</span>
        </div>
        <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
          <span>{tab} - 3</span>
        </div>
        <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
          <span>{tab} - 4</span>
        </div>
        <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
          <span>{tab} - 5</span>
        </div>
        <div className="flex items-center aspect-video justify-center rounded-xl border bg-background w-full h-full hover:border-foreground">
          <span>{tab} - 6</span>
        </div>
      </div>
    </div>
  )
}
export { Library }
