"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "yz13/cn"

const Abc = () => {
  const alphabet = ["#", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]
  const [hovered, setHovered] = useState<string | null>(null)
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
        alphabet.map((letter, index) => {
          const currentIndex = hovered ? alphabet.findIndex(item => item === hovered) : -1
          const isNextOrPrevious = currentIndex > -1 ? (index + 1 === currentIndex) || (index - 1 === currentIndex) : false
          const isAround = currentIndex > -1 ? (index + 2 === currentIndex) || (index - 2 === currentIndex) : false
          const isHovered = letter === hovered
          return <motion.button key={letter}
            onTapStart={() => setHovered(letter)}
            onTapCancel={() => setHovered(null)}
            onHoverStart={() => setHovered(letter)}
            onHoverEnd={() => setHovered(null)}
            className={cn(
              "w-6 h-8 flex items-center select-none justify-center uppercase transition-all",
              isAround ? "scale-125 my-1.5 mr-1.5" : "",
              isNextOrPrevious ? "scale-150 my-3 mr-3" : "",
              isHovered ? "scale-[2] my-3 mr-6" : "",
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
