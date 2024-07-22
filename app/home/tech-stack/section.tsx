"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { BackendTechStack } from "./backend"
import { stack as backendStack } from "./backend/backend-stack"
import { FrontendTechStack } from "./frontend"
import { stack as frontendStack } from "./frontend/frontend-stack"
import { StackName, StackSwitcher } from "./stack-switcher"

const StackSection = ({ title }: { title?: string }) => {
  const [section, setSection] = useState<StackName>("frontend")
  return (
    <>
      <StackSwitcher onValue={setSection} value={section} />
      <div className="w-full relative overflow-hidden">
        <AnimatePresence>
          {
            section === "frontend" &&
            <motion.div
              layout
              initial={{
                position: "absolute",
                opacity: 0,
                y: "-100%"
              }}
              animate={{
                position: "relative",
                opacity: 1,
                y: "0%"
              }}
              exit={{
                position: "absolute",
                opacity: 0,
                y: "100%"
              }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.4,
                ease: "linear",
                damping: 13,
                stiffness: 150,
              }}
            >
              <FrontendTechStack title={title} stackName="frontend" stack={frontendStack} />
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {
            section === "backend" &&
            <motion.div
              layout
              initial={{
                position: "absolute",
                opacity: 0,
                y: "100%"
              }}
              animate={{
                position: "relative",
                opacity: 1,
                y: "0%"
              }}
              exit={{
                position: "absolute",
                opacity: 0,
                y: "-100%"
              }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.4,
                ease: "linear",
                damping: 13,
                stiffness: 150,
              }}
            >
              <BackendTechStack title={title} stackName="backend" stack={backendStack} />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  )
}
export { StackSection }
