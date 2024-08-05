"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "yz13/cn"
import { useAbc } from "./abc-store"

type AbcProps = {
  defaultValue?: string
}

const Abc = ({ defaultValue }: AbcProps) => {
  const abc = useAbc(state => state.abc)
  const [hovered, setHovered] = useState<string | null>(null)
  const router = useRouter()
  return (
    <motion.aside
      layout
      className="w-8 h-screen fixed bottom-0 right-0 flex flex-col gap-0 items-center justify-center"
      transition={{
        type: "spring",
        bounce: 0.4,
        ease: "linear",
        damping: 13,
        stiffness: 50,
      }}
    >
      {
        abc.map((letter, index) => {
          const currentIndex = hovered ? abc.findIndex(item => item === hovered) : -1
          const isNextOrPrevious = currentIndex > -1 ? (index + 1 === currentIndex) || (index - 1 === currentIndex) : false
          const isAround = currentIndex > -1 ? (index + 2 === currentIndex) || (index - 2 === currentIndex) : false
          const isHovered = letter === hovered
          return <motion.button key={letter}
            onClick={() => router.push(`?lt=${letter}`)}
            onTapStart={() => setHovered(letter)}
            onTapCancel={() => setHovered(null)}
            onHoverStart={() => setHovered(letter)}
            onHoverEnd={() => setHovered(null)}
            className={cn(
              "w-6 h-8 flex text-secondary items-center select-none justify-center uppercase transition-all",
              isAround ? "scale-125 my-1.5 mr-1.5 text-foreground/60" : "",
              isNextOrPrevious ? "scale-150 my-3 mr-3 text-foreground/60" : "",
              isHovered ? "scale-[2] my-3 mr-6 text-foreground" : "",
            )}
            transition={{
              type: "spring",
              bounce: 0.4,
              ease: "linear",
              damping: 13,
              stiffness: 50,
            }}
          >
            {letter}
          </motion.button>
        })
      }
    </motion.aside>
  )
}
export { Abc }
