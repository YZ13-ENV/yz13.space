"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"
const LevelWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <motion.div
      className="flex items-center w-fit"
      layoutId="ruler-row"
      transition={{ duration: .750 }}
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // exit={{ opacity: 0 }}
    >{children}</motion.div>
  )
}
export { LevelWrapper }
