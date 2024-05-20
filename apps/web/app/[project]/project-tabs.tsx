"use client"
import { cn } from "@repo/ui/cn"
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { tabs } from "./tabs"

type Props = {
  className?: string
}


const ProjectTabs = ({ className }: Props) => {
  const searchParams = useSearchParams()
  const selected_tab = searchParams.get("tab")
  const router = useRouter()
  const value = selected_tab ? `?tab=${selected_tab}` : "?tab=speed-insights"
  return (
    <Tabs
      className={className}
      onValueChange={router.push}
      value={selected_tab ? `?tab=${selected_tab}` : "?tab=speed-insights"}
    >
      <TabsList className="h-full">
        {
          tabs.map(tab =>
            <TabsTrigger key={tab.value} className="relative h-full gap-2" value={tab.value}>
              {tab.icon({ size: 16, className: "text-inherit" })}
              <span className="text-inherit">{tab.label}</span>
              {
                tab.value === value &&
                <motion.span layoutId="project-tab" className="w-full h-[2px] bg-foreground absolute -bottom-1 left-0" />
              }
            </TabsTrigger>
          )
        }
      </TabsList>
    </Tabs>
  )
}

const ProjectTabsV2 = () => {
  const searchParams = useSearchParams()
  const selected_tab = searchParams.get("tab")
  const value = (tab: string) => `?tab=${tab}`
  return (
    <>
      {
        tabs.map(tab =>
          <Link
            href={value(tab.value)}
            key={tab.value}
            className={cn(
              "px-2 py-1 rounded-lg text-sm inline-flex gap-2 items-center transition-colors",
              (selected_tab ? value(selected_tab) === value(tab.value) : false)
                ? "bg-foreground text-background"
                : "bg-accents-1 text-foreground/70"
            )}
          >
            {tab.icon({ size: 14 })}{tab.label}
          </Link>
        )
      }
    </>
  )
}

export { ProjectTabs, ProjectTabsV2 }
