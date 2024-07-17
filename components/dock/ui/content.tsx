"use client"
import { cn } from "@repo/ui/cn"
import { useDebounceEffect } from "ahooks"
import { AnimatePresence, cubicBezier, motion } from "framer-motion"
import { ReactNode, useState } from "react"
import { useDockTab } from "../store/dock.store"

type ContentProps = {
  content: { [key: string]: ReactNode }
}

const DockContent = ({ content }: ContentProps) => {
  const tab = useDockTab(state => state.tab)
  const isInContent = tab ? tab in content : false
  const [completed, setCompleted] = useState<boolean>(false)
  useDebounceEffect(() => {
    setCompleted(!isInContent)
  }, [isInContent], { wait: 600 })
  return (
    <AnimatePresence>
      {
        isInContent &&
        <motion.div
          onAnimationComplete={() => setCompleted(true)}
          initial={{ height: 0 }}
          animate={{ height: "fit-content" }}
          exit={{ height: 0 }}
          transition={{
            easings: cubicBezier(.67, 0, .37, 1),
            duration: .350
          }}
          className={cn("w-full", completed ? "overflow-auto" : "overflow-hidden")}
        >
          {content[tab as keyof typeof content]}
        </motion.div>
      }
    </AnimatePresence>
  )
}
export { DockContent }
