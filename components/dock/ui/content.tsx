"use client"
import { useClickAway } from "ahooks"
import { AnimatePresence, m } from "framer-motion"
import { ReactNode, useRef } from "react"
import { cn } from "yz13/cn"
import { useDockTab } from "../store/dock.store"
import { section_config } from "./section/menu/config"

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
        <m.div
          ref={ref}
          initial={{ opacity: 0, height: 0 }}
          animate={{ height: section_config.height, width: section_config.width, opacity: 1 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            type: "spring",
            bounce: 0.4,
            ease: "linear",
            damping: 13,
            stiffness: 50,
          }}
          className={cn(
            "relative overflow-hidden flex flex-col justify-center items-center",
          )}
        >
          {content[tab as keyof typeof content]}
        </m.div>
      }
    </AnimatePresence>
  )
}
export { DockContent }
