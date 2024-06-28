"use client"
import { useMutationObserver } from "ahooks"
import { motion } from "framer-motion"
import { ElementRef, ReactNode, useEffect, useRef, useState } from "react"
type Props = {
  children?: ReactNode
}
const DockWrapper = ({ children }: Props) => {
  const ref = useRef<ElementRef<"div">>(null)
  const [width, setWidth] = useState<number>(36)
  const [show, setShow] = useState<boolean>(false)
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
    { attributes: true, characterData: true },
  );
  useEffect(() => {
    if (typeof document !== "undefined") setShow(true)
  }, [typeof document])
  useEffect(() => {
    const div = ref.current
    if (div) updateDockWidth()
  }, [ref])
  return (
    <motion.div
      initial={{ width: "36px" }}
      animate={{ width: "fit-content" }}
      // @ts-expect-error
      style={{ "--dock-width": `${width}px` }}
      ref={ref}
      id="dock"
      className="dock-wrapper">
      {
        show &&
        children
      }
    </motion.div>
  )
}
export { DockWrapper }
