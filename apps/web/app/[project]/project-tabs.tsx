"use client"
import { cn } from "@repo/ui/cn"
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { tabs } from "./tabs"

type Props = {
  id: string
  className?: string
}


const ProjectTabs = ({ id, className }: Props) => {
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

const ProjectTabsV2 = ({ id }: Props) => {
  const pathname = usePathname()
  const selected_tab = pathname
  const value = (tab: string) => "/" + id + tab
  return (
    <>
      {
        tabs.map(tab =>
          <Link
            href={value(tab.value)}
            key={tab.value}
            className={cn(
              "px-2 py-1 rounded-lg text-sm inline-flex gap-2 items-center transition-colors",
              selected_tab === value(tab.value)
                ? "bg-foreground text-background"
                : "bg-accents-1/80 hover:bg-accents-2/70 text-foreground/70"
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
