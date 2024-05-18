"use client"
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { MdBarChart, MdOutlineViewKanban } from "react-icons/md"

type Props = {
  id: string
}
const ProjectTabs = ({ id }: Props) => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const router = useRouter()
  return (
    <Tabs
      className="mt-6"
      onValueChange={router.push}
      value={tab ? `?tab=${tab}` : "?tab=speed-insights"}
    >
      <TabsList>
        <TabsTrigger className="relative gap-2" value="?tab=speed-insights">
          <MdBarChart className="text-inherit" size={16} />
          <span className="text-inherit">Speed insights</span>
          {
            tab === "speed-insights" &&
            <motion.span layoutId="project-tab" className="w-full h-[2px] bg-foreground absolute -bottom-1 left-0" />
          }
        </TabsTrigger>
        <TabsTrigger className="relative gap-2" value="?tab=kanban">
          <MdOutlineViewKanban className="text-inherit" size={16} />
          <span className="text-inherit">Kanban</span>
          {
            tab === "kanban" &&
            <motion.span layoutId="project-tab" className="w-full h-[2px] bg-foreground absolute -bottom-1 left-0" />
          }
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
export { ProjectTabs }
