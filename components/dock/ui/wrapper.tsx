"use client"
import { useMutationObserver } from "ahooks"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ElementRef, ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "yz13/cn"
import { useDockTab } from "../store/dock.store"

type Props = {
  children?: ReactNode
}
const DockWrapper = ({ children }: Props) => {
  const pathname = usePathname()
  const ref = useRef<ElementRef<"div">>(null)
  const [width, setWidth] = useState<number>(36)
  const [show, setShow] = useState<boolean>(false)
  const { setTab, tab } = useDockTab()
  const updateDockWidth = () => {
    const div = ref.current
    if (div) {
      const width = div.clientWidth
      setWidth(width)
    }
  }
  useMutationObserver(
    () => updateDockWidth(),
    ref,
    { attributes: true, childList: true },
  );
  useEffect(() => {
    setTab(undefined)
  }, [pathname])
  useEffect(() => {
    if (typeof document !== "undefined") setShow(true)
  }, [typeof document])
  useEffect(() => {
    const div = ref.current
    if (div) updateDockWidth()
  }, [ref, tab])
  return (
    <motion.footer
      layout
      whileHover={{
        scale: 1.1,
      }}
      initial={{
        width: "36px",
        bottom: "-64px"
      }}
      animate={{
        width: "fit-content",
        bottom: "24px"
      }}
      // @ts-expect-error
      style={{ "--dock-width": `${width}px` }}
      transition={{
        type: "spring",
        bounce: 0.4,
        ease: "linear",
        damping: 13,
        stiffness: 150,
        // duration: 4,
      }}
      ref={ref}
      id="dock"
      className={cn(
        "dock-wrapper bg-background flex flex-col max-w-fit items-center justify-center border shadow-2xl",
        "rounded-3xl"
      )}
    >
      {
        show &&
        children
      }
    </motion.footer>
  )
}
export { DockWrapper }
