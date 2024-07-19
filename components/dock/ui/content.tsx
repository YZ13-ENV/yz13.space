"use client"
import { cn } from "@repo/ui/cn"
import { useClickAway } from "ahooks"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useRef } from "react"
import { useDockTab } from "../store/dock.store"

type ContentProps = {
  content: { [key: string]: ReactNode }
}

const DockContent = ({ content }: ContentProps) => {
  const { tab, setTab } = useDockTab()
  const isInContent = tab ? tab in content : false
  const ref = useRef(null)
  useClickAway(() => {
    setTab(undefined)
  }, ref)
  return (
    <AnimatePresence>
      {
        isInContent &&
        <motion.div
          ref={ref}
          initial={{ y: 4, height: 0, width: 238 }}
          animate={{ y: 0, height: 300, width: 238 }}
          exit={{ y: 4, height: 0, width: 238 }}
          transition={{
            type: "spring",
            bounce: 0.4,
            ease: "linear",
            damping: 13,
            stiffness: 50,
          }}
          className={cn(
            "w-full relative overflow-hidden",
          )}
        >
          {content[tab as keyof typeof content]}
        </motion.div>
      }
    </AnimatePresence>
  )
}
export { DockContent }
